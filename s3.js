const AWS = require('aws-sdk')
const config = require('./config')

const s3 = new AWS.S3({
  endpoint: 'http://s3.byteark.com',
  signatureVersion: 'v2',
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey
})

function makeUploadRequestForPath(uploadedFilePath, options) {
  options = options || {
    contentAcl: 'public-read',
    contentType: 'text/plain',
    uploadUrlAge: 3600
  }

  return s3.getSignedUrl('putObject', {
    Bucket: config.bucketName,
    Key: uploadedFilePath,
    ACL: options.contentAcl,
    ContentType: options.contentType,
    Expires: options.uploadUrlAge
  })
}

module.exports = {
  makeUploadRequestForPath: makeUploadRequestForPath
}
