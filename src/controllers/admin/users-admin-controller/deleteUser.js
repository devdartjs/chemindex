import mongoose from "mongoose";
import User from "../../../models/user-model.js";

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const deletedUser = await User.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(userId),
      status: "user",
    });

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "User not found or already deleted" });
    }

    res.status(200).json({ message: "The user has been deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default deleteUser;
