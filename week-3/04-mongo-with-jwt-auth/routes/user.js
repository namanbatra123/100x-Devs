const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { name, password } = req.body;
  if (!name || !password) {
    return res.json({ msg: "All fields are required" });
  }

  const existingUser = await User.findOne({ name: name });
  if (!existingUser) {
    res.status(403).send({ msg: "User already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: name,
      password: hashedPassword,
    });
  } catch (e) {
    console.log(e);
    return res.json({ msg: "Trouble creating user" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { name, password } = req.body;
  if (!name || !password) {
    return res.json({ msg: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ name: name });
    if (!existingUser) {
      return res.json({ msg: "User not found" });
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

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const allcourses = await Course.find();
    return res.status(200).send({ courses: allcourses });
  } catch (e) {
    return res.status(500).json({ message: "Error fetching courses" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  if (!courseId) {
    return res.status(400).json({ message: "Course ID not found" });
  }
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    } else {
      const user = req.user
      if(!user){
        return res.status(401).send({ message: "Unauthorized" });
      }
      if (user.myCourses.includes(courseId)) {
        return res.json({ msg: "Course already purchased" });
      } else {
        user.myCourses.push(courseId);
        await user.save();
        return res
          .status(200)
          .send({ message: "Course purchased successfully" });
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error purchasing course", error: e.message });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    const user = await req.user.populate("myCourses");
    return res.status(200).json({ purchasedCourses: user.myCourses });
  } catch (e) {
    // console.log(e)
    return res.status(500).send({ message: "Error fetching purchased courses" });
  }
});

module.exports = router;
