const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");

router.post("/submit", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res
      .status(200)
      .json({ message: "Contact form submitted successfully", data: contact });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting contact form", error: error.message });
  }
});

router.get("/getall", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching contacts", error: error.message });
  }
});

module.exports = router;
