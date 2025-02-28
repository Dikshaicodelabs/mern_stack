const User = require("../models/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Login = async (req, res) => {
    console.log(req.cookies);
    
    const { email, password } = req.body;
    console.log("req.body", req.body);
    
  try {
    const user = await User.findOne({ email });

    console.log(user, 'userrrrrrrrrr')
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    console.log('lsdsf')
    const passwordMatch = await bcrypt.compare(password, user.password);
  

    if (!passwordMatch) {
      console.log('not matcheddd ')
      return res.status(401).json({ error: "Authentication failed" });
    }
   
    console.log('rtrhrjhk')
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    console.log(token, "ffffff");
    
    
    return res.status(200).json({data:user, token});
  } catch (error) {
    console.log(error)
   return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = Login;
