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
const multer = require('multer');
const path = require('path');
const express = require('express');
const multer = require('multer');
const path = require('path');


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


//ML PArt


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const uploadImg = multer({ storage: storage });

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle image upload and location input
app.post('/uploadImg', upload.single('image'), (req, res) => {
  const image = req.file;
  const location = req.body.location;

  if (!image || !location) {
      return res.status(400).json({ error: 'Image and location are required.' });
  }

  console.log('Uploaded Image:', image);
  console.log('Location:', location);

  // Process the image and location as needed
  // For example, you might use them to generate a new image or store them in a database

  res.json({ message: 'Image and location received successfully!' });
});


//Startintgnignt
app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});









// POST PAGE GPT
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Set up routes
app.post('/api/posts', upload.single('image'), (req, res) => {
  const { title, body } = req.body;
  const image = req.file.filename;

  // Save to database
  // e.g., INSERT INTO posts (title, body, image) VALUES (?, ?, ?);

  res.status(201).json({ title, body, image });
});

app.get('/api/posts', (req, res) => {
  // Fetch posts from database
  // e.g., SELECT * FROM posts;

  res.json(posts);
});

app.post('/api/posts/:postId/like', (req, res) => {
  const { postId } = req.params;

  // Increment like count in the database
  // e.g., UPDATE posts SET likes = likes + 1 WHERE id = ?;

  res.status(200).send('Post liked');
});

app.post('/api/posts/:postId/comments', (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;

  // Add comment to the database
  // e.g., INSERT INTO comments (post_id, comment) VALUES (?, ?);

  res.status(201).send('Comment added');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
