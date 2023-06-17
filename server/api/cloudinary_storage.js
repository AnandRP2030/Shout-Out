const tweetUploadRouter = require('express').Router();
const {parser} = require('../middlewares/cloudinary.config');

tweetUploadRouter.post('/',  parser.single('image '), (req, res) => {
  console.log('worked')
  console.log(req)
  try {
    return res.json("image");
    const image = req.file.path;
    console.log('workde')

  }catch(err) {
    res.status(401).send({err})
  }
})

module.exports = {tweetUploadRouter};