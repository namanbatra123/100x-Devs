const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index.js");

const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(400).json({ message: "Incorrect credentials" });
  }
  try {
    await Admin.create({
      name: req.body.name,
      password: req.body.password,
    });
    return res.json({ message: "Admin created successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Error creating admin" });
  }
});

router.post("/courses", adminMiddleware, async(req, res) => {
  // Implement course creation logic
  const { title, description, price, image } = req.body;
  if (!title || !description || !price || !image) {
    res.status(400).json({ message: "All fields are required" });
  }
  try{
    const admin = req.admin;
    const newCourse = await Course.create({
      title: title,
      description: description,
      price: price,
      image: image,
    });

    admin.courses.push(newCourse);
    admin.save();
    res.status(200).json({ message: "Course created successfully" });

  }catch(e){
    return res.status(500).json({ message: "Error creating course" });
  }
});

router.get("/courses", adminMiddleware, async(req, res) => {
  // Implement fetching all courses logic
  try{
    const admin = await Admin.findById(req.admin._id).populate('courses');
    return res.status(200).json({courses: admin.courses});
  }catch(e){
    return res.status(500).json({ message: "Error fetching courses" });
  }
});

module.exports = router;
