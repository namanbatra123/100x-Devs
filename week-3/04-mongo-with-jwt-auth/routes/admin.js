const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index.js");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).send({ msg: "All fields are required" });
  }
  const existingUser = await Admin.findOne({ name: name });
  if (existingUser) {
    return res.json({ msg: "User already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({
      name: name,
      password: hashedPassword,
    });
    return res.status(200).send({ msg: "Admin created successfully" });
  } catch (e) {
    console.log(e);
    return res.json({ msg: "Trouble creating admin" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { name, password } = req.body;
  if (!name || !password) {
    return res.json({ msg: "All Fields are required" });
  }

  try {
    const existingUser = await Admin.findOne({ name: name });
    if (!existingUser) {
      return res.json({ msg: "Admin not found" });
    }

    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (!isMatched) {
      return res.status(411).send({ msg: "Wrong credential!" });
    }

    const token = jwt.sign(
      {
        _id: existingUser._id,
        name: existingUser.name,
      },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).send({ token: token });
  } catch (e) {
    console.log(e);
    return res.json({ msg: "Some error occured" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, image, price } = req.body;
  if (!title || !description || !image || !price) {
    return res.json({ msg: "All fields required" });
  }
  try {
    const admin = await Admin.findById(req._id);
    if (!admin) {
      res.status(404).send({ msg: "Admin not found" });
    }
    const newCourse = await Course.create({
      title: title,
      description: description,
      image: image,
      price: price,
    });
    admin.courses.push(newCourse);
    await admin.save();
    return res.status(201).send({ msg: "Course created successfully" });
  } catch (e) {
    return res.status(500).send({ msg: "Error creating course" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const admin = await Admin.findById(req._id).populate("courses");
    return res.status(200).send({ courses: admin.courses });
  } catch (e) {
    console.log(e);
    res.json({ msg: "Error fetching courses" });
  }
});

module.exports = router;
