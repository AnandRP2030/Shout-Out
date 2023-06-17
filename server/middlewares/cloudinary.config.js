const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const { CLOUDINARY_API_SECRET, CLOUDINARY_NAME, CLOUDINARY_API_KEY } =
  process.env;

  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  })

  // upload image configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "twitter-images",
        format: async () => "png",
        public_id: (req, file) => file.filename,
    } 
})

const parser = multer({storage: storage});
module.exports = {parser};