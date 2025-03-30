const { Schema, model } = require("../connection");
const mySchema = new Schema({
  title: String,
  description: { type: String },
  genre: { type: String, required: true },
  artist: { type: String, default: "Unknown" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("user", mySchema);
