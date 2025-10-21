import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const generateToken = (user) => {
  // You can include more info in payload if you like
  return jwt.sign(
    {
      id: user._id,
      email: user.email, // optional
      time: Date.now(),  // optional: ensures new token even for same user
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
export const signup = async (req, res) => {
  console.log("Body received:", req.body);
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });


    // // ✅ Hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password });
    console.log("User created:", user); // optional: log for debugging
    console.log("Creating token for:", user._id, user.email);
    // ✅ Send 201 status for successful creation
    const token = generateToken(user);
    console.log("New token for", user.email, "=>", token);

    console.log("Token payload:", { id: user._id, email: user.email });
console.log("Token generated:", token);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token,
      //token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user);

      res.json({
        _id: user._id,
        email: user.email,
        token,
        //token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  // req.user is set by protect middleware
  res.json(req.user);
};