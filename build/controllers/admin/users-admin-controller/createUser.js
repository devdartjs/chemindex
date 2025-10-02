import User from "../../../models/user-model.js";
import bcrypt from "bcryptjs";
const createUser = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return res.status(400).json({
        message: "Invalid input data"
      });
    }
    const sanitizedEmail = email.trim().toLowerCase();
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long"
      });
    }
    const existingUser = await User.findOne({
      email: sanitizedEmail
    }).lean();
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userAdmin = await User.create({
      email: sanitizedEmail,
      password: hashedPassword
    });
    if (!userAdmin) {
      throw new Error("Error while creating new user");
    }
    const {
      ...userWithoutPassword
    } = userAdmin.toObject();
    return res.status(201).json({
      user: userWithoutPassword
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};
export default createUser;