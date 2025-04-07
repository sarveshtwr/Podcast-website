const { Schema, model } = require("../connection");
const mySchema = new Schema({
  title: String,
  description: { type: String },
  genre: { type: String, required: true },
  artist: { type: String },
  thumbnail: String,
  fileurl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("podcast", mySchema);
