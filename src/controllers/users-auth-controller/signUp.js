import User from '../../models/user-model.js';
import { handleErrors } from '../../middlewares/mid-functions/error-handler.js';
import createToken from '../../middlewares/mid-functions/creat-token.js';

export const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });

    const token = createToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1 * 1000 * 60 * 60 * 24,
    });

    res.status(201).json({ user });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ errors: { email: 'That email is already used!' } });
    }

    const errors = handleErrors(err);

    res.status(400).json({ errors });
  }
};
