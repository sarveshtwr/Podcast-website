const express = require("express");
const UserRouter = require("./routers/userRouter");
const ArtistRouter = require("./routers/artistRouter");
const podcastRouter = require("./routers/podcastRouter");
const cors = require("cors");

const app = express();
const port = 5000;

//middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.use("/user", UserRouter);
app.use("/artist", ArtistRouter);
app.use("/podcast", podcastRouter);

//endpoint or route
app.get("/", (req, res) => {
  res.send("response from express");
});
app.get("/add", (req, res) => {
  res.send("response from add");
});
app.get("/getall", (req, res) => {
  res.send("response from getall");
});
app.listen(port, () => {
  console.log("Server Started");
});
