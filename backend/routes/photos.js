const { Router } = require("express");
const router = Router();
const { uploadMiddleware } = require('../middlewares/multer')

router.get('/', (req, res) => {
    res.send('Hello get!')
});

router.get('/:id', (req, res) => {
    res.send('Hello get by id!')
});

router.post('/', uploadMiddleware, (req, res) => {
    console.log(req.files)
    res.send('Hello post!')
});

router.delete('/:id', (req, res) => {
    res.send('Hello delete!')
});

module.exports = router;