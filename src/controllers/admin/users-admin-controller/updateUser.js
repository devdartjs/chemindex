import mongoose from "mongoose";
import User from "../../../models/user-model.js";

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const updateFields = {};
    if (email && typeof email === "string") {
      updateFields.email = email.trim().toLowerCase();
    }
    if (password && typeof password === "string") {
      updateFields.password = password;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId), status: "user" },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found or not a regular user" });
    }

    res.status(200).json({ updatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default updateUser;
