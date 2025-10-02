export const getUserSystemPage = async (req, res) => {
  return res.status(200).render("user-system", {
    nonce: res.locals.nonce,
    user: res.locals.user
  });
};