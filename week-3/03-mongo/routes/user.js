const { Router } = require("express");
const { User } = require("../db/index.js");
const { Course } = require("../db/index.js");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(401).json({ message: "Incorrect credentials" });
  }
  try {
    await User.create({
      name: req.body.name,
      password: req.body.password,
    });
    return res.json({ message: "User created successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Error creating user" });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const allcourses = await Course.find();
    return res.status(200).send({courses: allcourses})
  } catch (e) {
    return res.status(500).json({ message: "Error fetching courses" });
  }
});

router.post("/courses/:courseId", userMiddleware, async(req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  if(!courseId) {
    return res.status(400).json({ message: "Course ID not found" });
  }

  try{
    const course = await Course.findById(courseId);
    if(!course) {
      return res.status(400).json({ message: "Course not found" });
    }


    const user = req.user;
    if(user.myCourses.includes(courseId)) {
      return res.status(200).json({ message: "Course already purchased" });
    }


    user.myCourses.push(courseId);
    await user.save();
    return res.status(200).json({ message: "Course purchased successfully" });
  }catch(e){
    return res.status(500).json({ message: "Error purchasing course" });
  }
});

router.get("/purchasedCourses", userMiddleware, async(req, res) => {
  // Implement fetching purchased courses logic
  try{
    const user = await req.user.populate('myCourses');
    return res.status(200).json({purchasedCourses: user.myCourses});
  }catch(e){
    return res.status(500).json({ message: "Error fetching purchased courses" });
  }
});

module.exports = router;
