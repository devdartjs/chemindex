import jwt from 'jsonwebtoken';

export const redirectIfLoggedIn = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded && decoded.id) {
      return res.redirect('/');
    }
  } catch (err) {
    return next();
  }
};
