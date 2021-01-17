const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new aws.S3();
const {s3SecretAccessKey, s3AccessKeyId, s3PublicBucket} = require('../config/key');

aws.config.update({
  secretAccessKey: s3SecretAccessKey,
  accessKeyId: s3AccessKeyId,
  region: 'us-east-1'
});

const getContentType = (req, file, cb) => {
  console.log(file);
  cb(null, file.mimetype);
}

var uploadFilePublic = multer({
  storage: multerS3({
    s3: s3,
    bucket: s3PublicBucket,
    acl: 'public-read',
    contentType: getContentType,
    contentDisposition: 'attachment',
    key: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

module.exports = {uploadFilePublic};
