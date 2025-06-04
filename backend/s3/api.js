const { s3 } = require('../s3/config');
const path = require('path');

async function uploadImage(image) {
    return new Promise(async (resolve, reject) => {
        const randomThreeDigit = Math.floor(Math.random() * 900) + 100;
        const nameWithoutExt = path.parse(image.originalname).name;
        const ext = path.extname(image.originalname).slice(1);

        const fileName = `${nameWithoutExt}_${randomThreeDigit}_${Date.now().toString()}.${ext}`;

        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: image.buffer,
            ContentType: image.mimetype
        }

        const request = s3.putObject(params);

        request.on('httpHeaders', (statusCode, headers) => {

            resolve({
                url: `https://ipfs.filebase.io/ipfs/${headers['x-amz-meta-cid']}`,
                fileName: fileName
            })
        });

        request.on('httpError', (error, response) => {
            reject(error)
        });

        request.send((err, data) => {
            if (err) reject(err);
        });
    })
}

async function deleteImage(path) {
    const deleteParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: path,
    };

    await s3.deleteObject(deleteParams).promise();
}

module.exports = {
    uploadImage,
    deleteImage,
}