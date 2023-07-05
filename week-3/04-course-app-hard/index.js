const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(bodyParser.json());

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses : [{type : mongoose.Schema.Types.ObjectId, ref:'course'}]
})

const User = mongoose.model('user', userSchema);
const Course = mongoose.model('course', courseSchema);
const Admin = mongoose.model('admin', adminSchema);

mongoose.connect("mongodb://localhost:27017/coursera", {
  useNewUrlParser: true, useUnifiedTopology: true
});


let ADMINS = [];
let USERS = [];
let COURSES = [];
const secretKey = 'Naruto';
const userSecretKey = 'Eren';
let courseId = 1;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Authentication Failed" });
    }
    req.headers.username = decoded.username;
    next();
  })
}

const verifyUserToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, userSecretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Authentication Failed" });
    }
    req.headers.username = decoded.username;
    next();
  });
};

// Admin routes
app.post('/admin/signup', async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).send("Admin already exists");
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = jwt.sign({username,password}, secretKey);
    res.send({ message: "Admin created successfully" ,token : token});
  }
});

app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username,password });
  if (admin) {
    const token = jwt.sign({ username, password }, secretKey);
    res.send({ message: "Logged in successfully",token : token });
  } else {
    res.status(401).send({ message: 'Authentication Failed' });
  }
});

app.post('/admin/courses',verifyToken, async (req, res) => {
  // logic to create a course
  const course = new Course(req.body);
  await course.save();
  res.send({ message: "Course created successfully", courseId: course.id });
});

app.put('/admin/courses/:courseId',verifyToken,async (req, res) => {
  // logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body);
  if (course) {
    res.send({ message: "course updated " });
  } else {
    res.status(404).send({ message: 'course not found' });
  }
});

app.get('/admin/courses',verifyToken, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.json({ courses});
});

// User routes
app.post('/users/signup',async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
   if (user) {
     res.status(403).send("user already exists");
   } else {
     const newUser = new User({ username, password ,purchasedCourses:[]});
     await newUser.save();
     const token = jwt.sign({username,password}, userSecretKey);
     res.send({ message: "User created successfully", token: token });
   }
});

app.post('/users/login', async (req, res) => {
  // logic to log in user
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
   if (user) {
     const token = jwt.sign(
       { username, password },
       userSecretKey
     );
     res.send({ message: "Logged in successfully", token: token });
   } else {
     res.status(401).send({ message: "Authentication Failed" });
   }
});

app.get("/users/courses", verifyUserToken, async (req, res) => {
  // logic to list all courses
  const publishedList = await Course.find({ published: true });
  res.send({ courses: publishedList });
});

app.post("/users/courses/:courseId", verifyUserToken, async (req, res) => {
  // logic to purchase a course
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.headers.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.send({ message: "Course purchased successfully" });
    } else {
      res.status(403).send({ message: "user not found" });
    }
  } else {
    res.status(404).send({ message: "course not found" });
  }
});

app.get("/users/purchasedCourses", verifyUserToken, async (req, res) => {
  // logic to view purchased courses
  const username = req.headers.username;
  const user = await User.findOne({ username }).populate("purchasedCourses");
  if (user) {
    res.send({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(404).send({ message: "user not found" });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
