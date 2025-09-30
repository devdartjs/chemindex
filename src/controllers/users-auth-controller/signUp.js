import User from "../../models/user-model.js";
import { handleErrors } from "../../middlewares/mid-functions/error-handler.js";
import createToken from "../../middlewares/mid-functions/creat-token.js";

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const sanitizedEmail = String(email).trim().toLowerCase();
    const sanitizedPassword = String(password).trim();

    if (sanitizedPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const user = await User.create({
      email: sanitizedEmail,
      password: sanitizedPassword,
    });

    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ user });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ errors: { email: "This email is already registered" } });
    }

    const errors = handleErrors(err);
    return res.status(400).json({ errors });
  }
};
