const multer = require('multer');

let upload = multer({
    dest: 'uploads/',
    limits: 1024 * 1024 * 50,
    fileFilter: function (req, file, next) {
        if (file.mimetype) {
            next(null, true)
        } else {
            next('File type not supported!', false)
        }
    }
})

const uploadMiddleware = upload.fields([{ name: 'file', maxCount: 1 }])

module.exports = {
    uploadMiddleware,
}