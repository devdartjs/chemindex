import User from "../../../models/user-model.js";

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, password } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, status: "user" },
      { $set: { email, password } },
      { new: true, runValidators: true }
    );

    if (!updatedUser || updatedUser.status !== "user") {
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
