const Image = require("../models/ImageModel");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  secure: true,
});

exports.uploadImageToCloudinary = async (req, res) => {
  try {
    const imageFile = req.file; // getting file upload from multer
    const imagePath = imageFile.path;

    // Upload an image to Cloudinary
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "image-search-and-management-system",
    });

    res.status(201).send({ message: "Image uploaded successfully", ...result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.SaveImage = async (req, res) => {
  try {
    const {
      title = "",
      description = "",
      keywords = "",
      height,
      width,
      imageUrl,
      size,
    } = req.body;

    // Create a new image record in the database
    const image = await Image.create({
      title,
      description,
      keywords: keywords.split(",").map((keyword) => keyword.trim()),
      height,
      width,
      imageUrl,
      size: size.toFixed(2),
    });

    res.status(201).send({ message: "Image saved successfully", image });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.searchImages = async (req, res) => {
  try {
    const {
      searchText = "",
      sort = { uploadedAt: -1 },
      limit = 10,
      offset = 0,
    } = req.body;

    const pipeline = [
      { $match: {} },
      {
        $match: {
          $or: [
            { title: { $regex: new RegExp(searchText, "i") } },
            { description: { $regex: new RegExp(searchText, "i") } },
          ],
        },
      },
    ];

    pipeline.push({
      $facet: {
        data: [{ $sort: sort }, { $skip: offset }, { $limit: limit }],
        count: [
          { $count: "totalCount" }, // Count the total documents
        ],
      },
    });

    const images = await Image.aggregate(pipeline);

    return res.status(200).send({
      data: images[0].data || [],
      totalCount: images[0]?.count[0]?.totalCount || 0,
      message: "Successfully fetched images",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.searchImageById = async (req, res) => {
  try {
    const image = await Image.findById({ _id: req.params.id });
    return res
      .status(200)
      .send({ image, message: "Successfully fetched image by id" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
