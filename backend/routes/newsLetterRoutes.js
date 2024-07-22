const express = require('express');
const { registerUser, deleteUser, editUser, getUser } = require('../controllers/newsLetterController');
const upload = require('../middlewares/upload');
const router = express.Router();

router.get('/users', getUser);
router.post('/register', registerUser);
router.put('/users/:id', editUser);
router.delete('/users/:id', deleteUser);

// Handling file uploads
router.post("/upload", upload.single('file'), async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const uploadedFilePath = req.file.path;
    console.log("The uploaded file path is : " , uploadedFilePath);
    res.status(200).json({ message: "File uploaded successfully!", path: uploadedFilePath });
    console.log("Uploaded file");
});

module.exports = router;
