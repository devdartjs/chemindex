export const getUserRegisterPage = async (req, res) => {
  return res.status(200).render("register", {
    nonce: res.locals.nonce,
    user: res.locals.user,
  });
};
