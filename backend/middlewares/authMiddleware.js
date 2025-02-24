const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    console.log(req.cookies);
    
  // Get the token from the Authorization header
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, "your-secret-key");
    // Attach the decoded user info to the request object
    req.user = decoded;
    // console.log("deocded", req.user)
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = authMiddleware;
