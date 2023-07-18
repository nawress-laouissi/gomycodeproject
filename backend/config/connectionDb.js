const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/projectGMC');
    console.log('database connected');
  } catch (error) {
    console.log('database not connected');
  }
};
module.exports = connectDB;
