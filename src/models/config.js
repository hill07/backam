import mongoose from "mongoose";

const configSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    isProUser: {
      type: Boolean,
      default: true
    },
    cr: {
      type: Number,
      default: 0
    },
    version: {
      type: String
    }
  }
);

const Config = mongoose.model("Config", configSchema);
export default Config;
