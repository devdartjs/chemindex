export const getLoginPage = (req, res) => {
  return res.status(200).render("login", {
    nonce: res.locals.nonce,
    user: res.locals.user,
  });
};
