export const getAdminPage = async (req, res) => {
  res.status(200).json({
    message: "Render Admin Page",
    user: res.locals.user._id,
    status: res.locals.user.status,
    nonce: res.locals.nonce,
  });
};
