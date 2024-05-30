const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("\x1b[32m%s\x1b[0m", 'Database connection successful'); // Message en vert
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", 'Database connection error', error); // Message en rouge
    process.exit(1);
  }
};

module.exports = connectDB;
