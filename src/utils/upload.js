const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const filename = `${uuid.v4()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
