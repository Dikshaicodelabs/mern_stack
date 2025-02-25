const express = require("express");
const cors = require("cors");
const User = require("./models/userModel");
const Login= require('./controllers/login')
const connectDb = require("./db");
const authMiddleware = require("./middlewares/authMiddleware");
const getAllUsers = require("./controllers/users");
const deleteUser = require("./controllers/deleteUser");
const updateUser = require("./controllers/updateUser");
const getUser = require("./controllers/getUser");
const app = express();
const PORT = 1100; // Make sure to use the same port number
const multer = require("multer");
const router = express.Router()
// Middleware
app.use(express.json());
app.use(cors());
connectDb();
// Test route to check if backend is working
app.post("/user",Login)
app.get("/all-users", authMiddleware, getAllUsers)
// app.get('/all-users',getAllUsers)
app.get('/get-user/:id',getUser)
app.delete('/delete/:id',deleteUser)
app.patch('/update-user/:id',updateUser)
// Register route to create a new user
app.post("/register", async (req, resp) => {
  try {

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return resp.status(400).send("User already registered");
    }

    
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    
    // Remove password (if included) before sending the response
    delete result.password;
    console.log(result)


    resp
      .status(201)
      .send({ message: "User registered successfully", user: result });
  } catch (e) {
    console.error(e);
    resp.status(500).send("Something Went Wrong");
  }
});

// image storage


const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb( null, './public/images');
  },
  filename: function(req, file, cb){
    cb( null, Date.now() + file.originalname);
  },
})
// image upload 
const upload = multer({
  storage: storage,
  limits:{
    fieldSize:1024 * 1024 * 3,
  },
})
//router 
router.post('/insert',upload.single('image'), (req, res) => {
  var newItem = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    // director: req.body.director,
    // year: req.body.year,
    image: req.file.filename
  })
  newItem.save((err, doc) => {
    if (!err) {
      res.redirect('insert');
      console.log(req.file.filename);
    }
    else {
      console.log(err);
    }
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
