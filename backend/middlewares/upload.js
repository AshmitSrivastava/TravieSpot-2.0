//MIDDLEWARE for uploading files
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../backend/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + ' - ' + file.originalname);
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can only upload image files!"), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

module.exports = upload;


