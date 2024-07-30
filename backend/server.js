//imports
const express = require("express");
const body_parser = require("body-parser");
const cors = require('cors');
const port = 3000;
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const newsLetterRoutes = require('./routes/newsLetterRoutes');
const cartRoutes = require('./routes/cartRoutes');
require('dotenv').config({ path: "../frontend/.env" });
const cookieParser = require('cookie-parser');
const dbConfig = require('./dbConfig');

const app = express();
//middleware wala folder
const upload = require('./middlewares/upload');

//Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})); 
app.use(cookieParser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use('./uploads', express.static('uploads'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {secure : false} //true while deployingggggg
}));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/newsletter', newsLetterRoutes);
app.use('/api/cart', cartRoutes);


//Startintgnignt
app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
