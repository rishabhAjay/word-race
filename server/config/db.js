import mongoose from "mongoose";
import config from "config";
import { mongoURL } from "../constants.js";
const connection = mongoURL;

//remember to use async await with try-catch block
const connectDB = async () => {
  try {
    await mongoose.connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoDB connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
