export const getUserRegisterPage = async (req, res) => {
  return res.status(200).json({
    nonce: res.locals.nonce,
    user: res.locals.user
  });
};