const mssql = require('mssql');
const dbConfig = require('../dbConfig');

const addToCart = async (req, res) => {
    try {
        console.log("Added to Cart wala req.body : ", req.body);
        console.log(req.user);
        const { id , productId, quantity, price } = req.body;
        const userId = req.user ? req.user.id : null; //after auth
        if (userId) {
            const pool = await mssql.connect(dbConfig);
            await pool.request()
                .input('id', mssql.Int, id)
                .input('userId', mssql.Int, userId)
                .input('productId', mssql.Int, productId)
                .input('quantity', mssql.Int, quantity)
                .input('price', mssql.Decimal, price)
                .query("INSERT INTO dbo.carts (userId, productId, quantity, price) VALUES (@userId, @productId, @quantity, @price)");


        }
        else {
            if (!req.session.cart) {
                console.log("inside addTocart ka unauth user: ");
                req.session.cart = [];
            }
            req.session.cart.push({ id,  productId, quantity, price });
        }
        res.status(200).json({ message: 'Item added to cart' });
    } catch (err) {
        console.error('Error adding to cart:', err);
        res.status(500).json({ message: 'Error adding to cart' });
    }
};

const getCart = async (req, res) => {
    try {
        if (req.user) {
            console.log("Inside GetCart");
            const { id , price, productId, quantity } = req.body;
            console.log("req.body getCart : ", req.body);
            const userId = req.user.id;
            const pool = await mssql.connect(dbConfig);
            const cartItems = await pool.request()
                .input('userId', mssql.Int, userId)
                .query("SELECT * FROM dbo.carts WHERE userId = @userId");
            console.log("CartItems : ", cartItems.recordset);

            res.status(200).json(cartItems.recordset);
        }
        else {
            console.log("Inside getCart for unauth user");
            res.status(200).json(req.session.cart || []);
        }
    } catch (err) {
        console.error('Error getting cart:', err);
        res.status(500).json({ message: 'Error getting cart' });
    }
};




const removeFromCart = async (req, res) => {
    try {
        const { cartId } = req.params;

        const pool = await mssql.connect(dbConfig);

        await pool.request()
            .input('cartId', mssql.Int, cartId)
            .query("DELETE FROM dbo.carts WHERE id = @cartId");

        res.status(200).json({ message: 'Item removed from cart' });
    } catch (err) {
        console.error('Error removing from cart:', err);
        res.status(500).json({ message: 'Error removing from cart' });
    }
};

const syncCart = async (req, res) => {
    try {
        console.log("SyncCart req.user:", req.user);
        const userItems = req.body.cart;
        console.log("userItems:", userItems);

        if (req.user) {
            const userId = req.user.id;
            const pool = await mssql.connect(dbConfig);
            await pool.request()
                .input('userId', mssql.Int, userId)
                .query('DELETE FROM dbo.carts WHERE userId = @userId');

            for (let item of userItems) {
                await pool.request()
                    .input('userId', mssql.Int, userId)
                    .input('productId', mssql.Int, item.id)
                    .input('quantity', mssql.Int, item.quantity)
                    .input('price', mssql.Decimal, item.price)
                    .query("INSERT INTO dbo.carts (userId, productId, quantity, price) VALUES (@userId, @productId, @quantity, @price)");
            }
            res.status(200).json({ message: 'Cart synced' });
        } else if (req.user == null){
            if (!req.session.cart) {
                req.session.cart = [];
            }
            req.session.cart.push(...userItems);
            res.status(200).json({ message: "Cart updated in session" });
        }
    } catch (err) {
        console.error('Error syncing cart:', err);
        res.status(500).json({ message: 'Error syncing cart' });
    }
};



module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    syncCart
};
