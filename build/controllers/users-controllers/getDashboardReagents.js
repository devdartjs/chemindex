export const getDashboardReagents = async (req, res) => {
  return res.status(200).render("dashboard-reagents", {
    nonce: res.locals.nonce,
    user: res.locals.user
  });
};