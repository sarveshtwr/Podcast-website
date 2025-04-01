const { Schema, model } = require("../connection");
const mySchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("artist", mySchema);
