import User from "../../../models/user-model.js";

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string"
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: sanitizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userAdmin = await User.create({
      email: sanitizedEmail,
      password: password,
    });

    if (!userAdmin) {
      throw new Error("Error while creating new user");
    }

    res.status(200).json({ userAdmin });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default createUser;
