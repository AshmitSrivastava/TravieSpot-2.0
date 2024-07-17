//MIDDLEWARE
const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req,file , cb) => {
        cb(null , './uploads');
    },
    filename: (req, file , cb) => {
        cb(null , Date.now() + ' - ' + file.originalname);
    }
});

const imageFileFilter = (req,file,cb) => {
    if (!file.originalname.match(/\.(jpg | png | gif | jpeg)$/), false){
        return cb(new Error("You can only upload images!"));
    }
    
cb(null ,true)
}

const upload = multer ({storage : storage});

module.exports = upload , imageFileFilter;

