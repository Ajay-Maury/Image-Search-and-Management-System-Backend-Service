const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./src/index");

const PORT = process.env.PORT || 3000;
const DATABASE_URI = process.env.DATABASE_URI;

// Define a function to connect to the database
const connect = () => {
  return mongoose.connect(DATABASE_URI);
};

// Start the server after connecting to the database
app.listen(PORT, async () => {
  try {
    await connect();
    console.log("Server is running at port : ", PORT);
  } catch (error) {
    console.log("Error while connection to database :", error);
    process.exit(1); // Exit the application on database connection error
  }
});
