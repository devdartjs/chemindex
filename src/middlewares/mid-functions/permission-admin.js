const isAdmin = (req, res, next) => {
  try {
    if (!res.locals.user && res.locals.user.status !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default isAdmin;
