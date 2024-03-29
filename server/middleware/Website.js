const multer = require('multer');
const fs = require('fs');
const path = require('path');


const createDirectory = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};


const destinationDirectory = 'uploads/website-gallery/';


createDirectory(destinationDirectory);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destinationDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'), false);
    }
};

const websiteGallery = () => multer({ 
    storage: storage,
    fileFilter: fileFilter,
}).array('gallery', 5); 

module.exports = websiteGallery;
