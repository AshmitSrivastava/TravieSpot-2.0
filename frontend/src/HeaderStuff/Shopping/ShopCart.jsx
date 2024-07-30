import React , {useState , useEffect} from 'react';
import { useCart } from 'react-use-cart';
import axios from 'axios';

const ShopCart = () => {
  const { addItem, items, updateItemQuantity, removeItem, emptyCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice , setTotalPrice] = useState(0);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cart' , {withCredentials : true});
      console.log("Fetched Cart items : ", response.data);
      emptyCart(); // Clear
      response.data.forEach( item => {
        if(item.price){
          addItem({
            id : item.id,
            productId : item.productId,
            quantity : item.quantity,
            price : item.price,
          });
        }}); // Populate the cart with items from the backend
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setIsLoading(false);
    }
  };

  const syncCart = async () => {
    try {
      console.log("in synccart within ShopCart ");
      await axios.post('http://localhost:3000/api/cart/sync', { cart: items } , {withCredentials: true});

    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      syncCart();
      calculateTotalPrice();
    }
  }, [items, isLoading]);

  const handleLogout = async () => {
    try{
      await axios.get('http://localhost:3000/api/auth/logout', {}, {withCredentials: true});
      alert('logout successful');
      emptyCart();
    }catch(err){
      console.error("Error in handleLogout : ", err);
    }
  };

  const calculateTotalPrice = () => {
    const total = items.reduce((acc , item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleIncreaseQuantity = (id, quantity) => {
    updateItemQuantity(id , quantity + 1);
  };

  const handleDecreaseQuantity = (id , quantity ) => {
    if (quantity > 1 ){
      updateItemQuantity( id , quantity -1 );
    }
  };

  return (
    <div className="cart-container">
      <button onClick={handleLogout}>Logout</button>
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.src} alt="Product" className="cart-item-image" />
          <div className="cart-item-details">
            <h2>{item.name}</h2>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleIncreaseQuantity(item.id, item.quantity)}>+</button>
            <button onClick={() => handleDecreaseQuantity(item.id, item.quantity)}>-</button>
          </div>
          <button onClick={() => removeItem(item.id)} className="remove-button">
            Remove
          </button>
        </div>
      ))}
      <h3>Total : ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default ShopCart;
