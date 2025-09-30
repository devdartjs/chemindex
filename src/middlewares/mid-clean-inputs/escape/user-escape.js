import escape from 'escape-html';

export const escapeFields = ['email', 'password'];

export const escapeUserInput = (req, res, next) => {
  try {
    escapeFields.forEach(field => {
      if (req.body[field]) {
        req.body[field] = escape(req.body[field]);
      }
    });

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to escape product fields' });
  }
};
