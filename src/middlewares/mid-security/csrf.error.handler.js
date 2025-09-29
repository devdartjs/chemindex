const csrfErrorHandler = (err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  console.error('CSRF token error:', err);
  res.status(403).json({ error: 'invalid CSRF token or inexistent.' });
};

export default csrfErrorHandler;
