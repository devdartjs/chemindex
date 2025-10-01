import User from "../../../models/user-model.js";

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ status: "user" });

    if (allUsers.length === 0 || !allUsers) {
      return res.status(400).json({ message: "There is no users here" });
    }

    res.status(200).json({ totalUsers: allUsers.length, allUsers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getUsers;
