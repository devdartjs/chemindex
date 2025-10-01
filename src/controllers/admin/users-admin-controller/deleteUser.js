import User from "../../../models/user-model.js";

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findOneAndDelete({
      _id: userId,
      status: "user",
    });
    if (!deletedUser) throw new Error("Error while deleting");

    res.status(200).json({ message: "The user has been deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default deleteUser;
