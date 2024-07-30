const bcrypt = require('bcryptjs');
const mssql = require('mssql');
const jwt = require('jsonwebtoken');
const dbConfig = require('../dbConfig');
require('dotenv').config({ path: "../../frontend/.env" });

 const login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const pool = await mssql.connect(dbConfig);

        console.log(email, password);
        const checkUser = await pool.request()
            .input('email', mssql.VarChar, email)
            .input('password', mssql.VarChar, password)
            .query("SELECT * FROM dbo.users WHERE email = @email");

        console.log("Checkuser : ", checkUser);

        if (checkUser.recordset.length == 0) {
            return res.status(200).json({ message: "User not found" });
        }

        const user = checkUser.recordset[0];
        console.log(user.password);
        console.log(password);
        const isMatch = async () => {
            const checkPass = await bcrypt.compare(password, user.password);
            console.log(checkPass);
        }
        if (!isMatch) {
            return res.status(401).json({ message: "Password dont match / Invalid cred" });
        }
        console.log("password matched");

        //token
        console.log(process.env.JWT_SECRET);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        req.session.token = token;
        console.log("TOken : ", token);
        console.log("Logged in");
        res.status(200).json({ message: "Logged in successfully", token });
        console.log("Cookie set: ", res.get('Set-Cookie'));
    }

    catch (err) {
        console.error("Error during login : ", err);
        res.status(500).json({ message: "Error occured during login" });
    }
};

const logout = (req, res) => {
    console.log("Within logout");
    console.log(req.cookies);
    console.log(req.session);
    console.log(req.cookies.token);
    if (!req.cookies.token){
        console.log("NO user logged in");
        res.status(200).json({message : "No active user"});
    }
    res.clearCookie('token');
        req.session.destroy(err => {
            if (err) {
                console.error("Error during session destruction", err);
                return res.status(500).json({ message: "Error occured during logout" });
            }
            res.status(200).json({ message: "User logged out Successfully" });
        });
    };

const signup = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password, reconfirm_password, gender, country, state, phone } = req.body;

        if (password !== reconfirm_password) {
            return res.status(400).json({ message: "Passwords dont match" });
        }

        //db
        const pool = await mssql.connect(dbConfig);
        const checkEmail = await pool.request()
            .input('email', mssql.VarChar, email)
            .query("SELECT * FROM dbo.users WHERE email = @email");

        if (checkEmail.recordset.length > 0) {
            return res.status(400).json({ message: "Email exists" });
        }

        //password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.request()
            .input('username', mssql.VarChar, username)
            .input('email', mssql.VarChar, email)
            .input('password', mssql.VarChar, hashedPassword)
            .input('gender', mssql.VarChar, gender)
            .input('country', mssql.VarChar, country)
            .input('state', mssql.VarChar, state)
            .input('phone', mssql.VarChar, phone)
            .query("INSERT INTO dbo.users(username, email, password, gender,country, state, phone) VALUES (@username, @email, @password, @gender, @country, @state, @phone)");
        res.status(200).json({ message: "User created" });
    }

    catch (err) {
        console.error("Error during singup : ", err);
        res.status(500).json({ message: "Error during singup" });
    }
};

module.exports = {
    login,
    signup,
    logout
};