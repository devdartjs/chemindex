export const getSingUpPage = (req, res) => {
  return res.status(200).render("sign-up", {
    nonce: res.locals.nonce,
    user: res.locals.user,
  });
};
