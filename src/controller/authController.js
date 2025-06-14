const bcrypt = require("bcrypt");
const { findUserByEmailOrTel } = require("../models/userModel");

const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: "Identifier and password required" });
  }

  try {
    const user = await findUserByEmailOrTel(identifier);
    if (!user) return res.status(404).json({ error: "User not found" });

    console.log("Password from req:", password);
    console.log("Password from db:", user.user_password);
    const isMatch = await bcrypt.compare(password, user.user_password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { loginUser };
