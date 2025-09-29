export const getIndexPage = async (req, res) => {
  return res.status(200).render("home", {
    nonce: res.locals.nonce,
    user: res.locals.user,
  });
};

export const getUserSystemPage = async (req, res) => {
  return res.status(200).render("user-system", {
    nonce: res.locals.nonce,
    user: res.locals.user,
  });
};

export const getDashboardReagents = async (req, res) => {
  return res.status(200).render("dashboard-reagents", {
    nonce: res.locals.nonce,
    user: res.locals.user,
  });
};

export const getUserRegisterPage = async (req, res) => {
  return res.status(200).render("register", {
    nonce: res.locals.nonce,
    user: res.locals.user,
  });
};

export const getUserUpdatePage = async (req, res) => {
  return res.status(200).render("search-update", {
    nonce: res.locals.nonce,
    user: res.locals.user,
  });
};

export const getSingUpPage = (req, res) => {
  return res.status(200).render("sign-up", {
    nonce: res.locals.nonce,
    user: res.locals.user,
  });
};

export const getLoginPage = (req, res) => {
  return res.status(200).render("login", {
    nonce: res.locals.nonce,
    user: res.locals.user,
  });
};
