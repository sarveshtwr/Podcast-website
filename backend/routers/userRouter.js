const express = require("express");
const Model = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/add", (req, res) => {
  console.log(req.body);
  new Model(req.body)
    .save()
    .then((result) => {
      a;
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/getall", (req, res) => {
  Model.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// url parameter
router.get("/getbycity/:city", (req, res) => {
  Model.find({ city: req.params.city })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/getbyemail/:email", (req, res) => {
  Model.find({ email: req.params.email })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/getbyid/:id", (req, res) => {
  Model.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.delete("/delete/:id", (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.put("/update/:id", (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//getall
//getbyid
//delete
//update

router.post("/authenticate", (req, res) => {
  console.log(req.body);
  Model.findOne(req.body)
    .then((result) => {
      if (result) {
        const { _id, fname, lname, email } = result;
        const payload = { _id, fname, lname, email };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "2 days" },
          (err, token) => {
            if (err) {
              console.log(err);
              res.status(500).json({ message: "error creating token" });
            } else {
              res.status(200).json({ token, fname, lname, email });
            }
          }
        );
      } else res.status(401).json({ message: "Login Failed" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/register", async (req, res) => {
  try {
    const newUser = new Model(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Registration failed", error });
  }
});

onSubmit: (values) => {
  console.log("Submitting values:", values); // Debugging log
  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, values)
    .then((result) => {
      toast.success("Signup Successful");
      router.push("/login");
    })
    .catch((err) => {
      console.error("Error during signup:", err); // Debugging log
      toast.error("Signup Failed");
    });
},
  (module.exports = router);
