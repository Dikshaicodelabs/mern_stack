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
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Middleware
app.use(express.json());
app.use(cors());
connectDb();
app.post("/user",Login)
app.get("/all-users", authMiddleware, getAllUsers)
app.get('/get-user/:id',getUser)
app.delete('/delete/:id',deleteUser)
app.patch('/update-user/:id',updateUser)

const fs = require('fs');
const path = './public/images';

if (!fs.existsSync(path)) {
  fs.mkdirSync(path, { recursive: true });
}
// Register route to create a new user
// app.post("/register", async (req, resp) => {
//   console.log(' register block')
//   try {

//     const existingUser = await User.findOne({ email: req.body.email });
//     if (existingUser) {
//       return resp.status(400).send("User already registered");
//     }

    
//     const user = new User(req.body);
//     let result = await user.save();
//     result = result.toObject();
    
//     // Remove password (if included) before sending the response
//     delete result.password;
//     console.log(result)


//     resp
//       .status(201)
//       .send({ message: "User registered successfully", user: result });
//   } catch (e) {
//     console.error('register errorrr',e);
//     resp.status(500).send("Something Went Wrong");
//   }
// });



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



app.post('/insert', upload.single('image'), async (req, res) => {
  console.log(req.body,"inside body")
  try {
    const { name, email, password } = req.body;

    // Check if password is provided
    if (!password) {
      return res.status(400).send('Password is required.');
    }
  console.log(password, "password");
  console.log(saltRounds,"saltRounds");
    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const imageUrl = `/images/${req.file.filename}`;

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,  // Save the hashed password
      image: req.file ? imageUrl : null,  // Save image filename if uploaded
    });

   const resp = await newUser.save();
   
   res.status(200).send({message:"User created"});
   
  } catch (error) {
    console.error(error, 'routeer post ');
    res.status(500).send("Server error during user creation.");
  }
});

app.use('/images', express.static('public/images'));


  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
