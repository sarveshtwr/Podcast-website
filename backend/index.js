const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/user", require("./routers/userRouter"));
app.use("/artist", require("./routers/artistRouter"));
app.use("/admin", require("./routers/adminRouter"));
app.use("/podcast", require("./routers/podcastRouter"));
app.use("/contact", require("./routers/contactRouter"));

const port = 5000;

app.get("/", (req, res) => {
  res.send("API Response");
});

app.listen(port, () => {
  console.log("Server Started");
});
