import User from "../../models/user-model.js";
import { handleErrors } from "../../middlewares/mid-functions/error-handler.js";
import createToken from "../../middlewares/mid-functions/creat-token.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if (user) {
      const token = createToken(user._id);

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1 * 1000 * 60 * 60 * 24,
      });

      return res.status(200).json({ user, token, nonce: res.locals.nonce });
    }

    throw new Error("incorrect password");
  } catch (err) {
    const errors = handleErrors(err);

    if (err.message === "incorrect email") {
      return res.status(400).json({ errors: { email: errors.email } });
    } else if (err.message === "incorrect password") {
      return res.status(400).json({ errors: { password: errors.password } });
    }
  }
};
