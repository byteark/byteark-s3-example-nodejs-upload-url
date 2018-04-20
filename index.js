const express = require('express')
const bodyParser = require('body-parser')
const s3 = require('./s3')

const app = express()
app.use(express.json());
app.use(express.static('public'))

app.post('/api/uploads', function (req, res) {
  const contentAcl = 'public-read' // 'public-read' or 'private'

  if (!req.body.fileName || !req.body.contentType) {
    return res.json({
      error: 'fileName and contentType params are required'
    })
  }

  const upload = s3.makeUploadRequestForPath(req.body.fileName, {
    contentType: req.body.contentType,
    contentAcl: contentAcl,
    uploadUrlAge: 3600
  })
  res.json({
    uploadMethod: 'PUT',
    uploadUrl: upload,
    uploadHeaders: {
      'content-type': contentType,
      'x-amz-acl': contentAcl
    }
  })
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})
