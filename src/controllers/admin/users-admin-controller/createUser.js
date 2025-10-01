import User from "../../../models/user-model.js";

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email.trim() });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const userAdmin = await User.create({ email, password });
    if (!userAdmin) throw new Error("Error while creating new user");

    res.status(200).json({ userAdmin });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default createUser;
