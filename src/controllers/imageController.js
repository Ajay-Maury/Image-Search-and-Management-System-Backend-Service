const Image = require("../models/ImageModel");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  secure: true,
});

exports.uploadImage = async (req, res) => {
  try {
    const { title = "", description = "", keywords = "" } = req.body;

    const imageFile = req.file; // getting file upload from multer
    const imagePath = imageFile.path;

    // Upload an image to Cloudinary
    const { width, height, secure_url, bytes } =
      await cloudinary.uploader.upload(imagePath, {
        folder: "image-search-and-management-system",
        tags: keywords.split(",").map((keyword) => keyword.trim()),
      });

    // Create a new image record in the database
    const image = new Image({
      title,
      description,
      keywords: keywords.split(",").map((keyword) => keyword.trim()),
      imageUrl: secure_url,
      dimensions: `${width}X${height}`,
      size: (bytes / 1024).toFixed(2), // converting bytes in KB and then storing it
    });

    await image.save();

    res.status(201).send({ message: "Image uploaded successfully",imageUrl: secure_url });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.searchImages = async (req, res) => {
  try {
    const {
      title = "",
      keywords = "",
      sort = { uploadedAt: -1 },
      limit = 10,
      offset = 0,
    } = req.query;

    const pipeline = [
      { $match: {} },
      {
        $match: {
          $or: [
            { title: { $regex: new RegExp(title, "i") } },
            { keywords: { $regex: new RegExp(keywords, "i") } },
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
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send({ error: error.message });
  }
};
