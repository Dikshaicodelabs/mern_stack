const express = require("express");
const cors = require("cors");
const User = require("./models/userModel");
const connectDb = require("./db");
const app = express();
const PORT = 1100; // Make sure to use the same port number

// Middleware
app.use(express.json());
app.use(cors());
connectDb();
// Test route to check if backend is working
app.get("/users", async (req, res) => {
    
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
