const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch data" });
  }
};

module.exports = getAllUsers;
                                                                                                                                                                                                                                                                                                                                  