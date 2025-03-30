const mongoose = require("mongoose");

const url =
  "mongodb+srv://sarveshtwr:BittuTiwari@cluster0.0hxqz.mongodb.net/podcastwebsite?retryWrites=true&w=majority&appName=Cluster0";

// Asynchronous Function - return Promise
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("some other statement");
  });

module.exports = mongoose;
