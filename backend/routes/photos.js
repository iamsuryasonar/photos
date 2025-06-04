const { Router } = require("express");
const router = Router();
const { uploadMiddleware } = require('../middlewares/multer')
const { uploadImage } = require("../s3/api");
const Image = require('../models/Image');
const { verify } = require('../middlewares/verifyToken');

router.get('/', verify, async (req, res) => {
    try {
        let images = await Image.find({ user: req.user._id });
        return res.status(200).json({ success: true, message: '', data: images });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

router.get('/:id', (req, res) => {
    res.send('Hello get by id!')
});

router.post('/', verify, uploadMiddleware, async (req, res) => {
    try {

        if (!req?.files['file'][0]) return res.status(400).json({ success: false, message: 'File not found!' });

        let imageTobeUploaded = req?.files['file'][0];
        let uploadedImageInfo;

        await uploadImage(imageTobeUploaded).then((result) => {
            uploadedImageInfo = result;
        }).catch(err => {
            throw err;
        })

        const image = new Image({
            user: req.user._id,
            url: uploadedImageInfo.url,
            fileName: uploadedImageInfo.fileName,
            mimeType: imageTobeUploaded.mimetype,
        })

        let savedImage = await image.save();

        return res.status(200).json({ success: true, message: 'Image uploaded', data: savedImage });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Failed to upload image' });
    }
});

router.delete('/:id', (req, res) => {
    res.send('Hello delete!')
});

module.exports = router;