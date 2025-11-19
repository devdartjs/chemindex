export const getUserUpdatePage = async (req, res) => {
  return res.status(200).render("search-update", {
    nonce: res.locals.nonce,
    user: res.locals.user,
  });
};
