const bcrypt = require("bcrypt");
const { createUser } = require("../models/userModel");

const signup = async (req, res) => {
  const { name, email, tel, password } = req.body;

  if (!name || !email || !tel || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      name,
      email,
      tel,
      password: hashedPassword,
    });
    console.log("User created:", user);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signup };
