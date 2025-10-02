export const getIndexPage = async (req, res) => {
  return res.status(200).render("home", {
    nonce: res.locals.nonce,
    user: res.locals.user,
  });
};
