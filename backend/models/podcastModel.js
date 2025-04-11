const { Schema, model, Types } = require("../connection");

const mySchema = new Schema({
  artist: { type: Types.ObjectId, ref: "artist" }, // Reference to the artist model
  title: String,
  description: { type: String },
  genre: { type: [String] }, // Updated to support multiple genres
  thumbnail: String,
  fileurl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("podcast", mySchema);
