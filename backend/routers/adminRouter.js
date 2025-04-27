const express = require("express");
const Model = require("../models/adminModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Initialize default admin if not exists
const initializeAdmin = async () => {
  try {
    const adminExists = await Model.findOne({ username: "sarveshtwr" });
    if (!adminExists) {
      await new Model({
        username: "sarveshtwr",
        password: "sarveshtwr",
      }).save();
      console.log("Default admin account created");
    }
  } catch (err) {
    console.error("Error initializing admin:", err);
  }
};

initializeAdmin();

// Admin Authentication
router.post("/authenticate", async (req, res) => {
  try {
    const admin = await Model.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (admin) {
      const payload = {
        _id: admin._id,
        username: admin.username,
        role: "admin",
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) {
            res.status(500).json({ message: "Error creating token" });
          } else {
            res.status(200).json({ token, message: "Admin login successful" });
          }
        }
      );
    } else {
      res.status(401).json({ message: "Invalid admin credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
