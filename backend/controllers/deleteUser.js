const User = require("../models/userModel");

const deleteUser = async (req, res) => {
  const { id } = req.params;

  console.log(id);

try {
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      // If no user was found, return a 404 response
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Handle any errors during the delete operation
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = deleteUser;
