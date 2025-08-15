import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  const { email, fullName, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    email,
    fullName,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (e) {
    next(e); // triggers express's error handling middleware
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email }); // find if user exists in the db
    if (!user) return next(errorHandler(404, "User not found"));

    const isPasswordValid = bcrypt.compareSync(password, user.password); // comparing password to hashed password in the db
    if (!isPasswordValid) return next(errorHandler(400, "Invalid password"));

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, // can't be accessed by js
        secure: process.env.NODE_ENV === "production", // only over https in prod
        sameSite: "strict", // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successfully!" });
  } catch (e) {
    next(e);
  }
};
