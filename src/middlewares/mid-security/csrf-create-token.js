import csrf from "csurf";

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});

export default csrfProtection;
