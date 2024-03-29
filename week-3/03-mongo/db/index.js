const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);


// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    name: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    myCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    price: Number,
    image: String,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}