const multer = require(`multer`);
const path = require(`path`);

const storage = multer.diskStorage({
  destination: `images/`,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + `_` + file.originalname );
  },
});

const uploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg/;
    const extension = path.extname(file.originalname);

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error(`must be a png/jpg image`));
    }
  },
  limits: {
    fileSize: 1000 * 1000 * 5, // 5 mb file will be accepted
  },
});

module.exports = uploader;
