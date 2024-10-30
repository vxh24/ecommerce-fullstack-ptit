require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const uploadToCloudinary = async (filePath, folder) => {
  try {
    const cloudinaryResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: folder,
    });

    return cloudinaryResult;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

module.exports = { uploadToCloudinary };
