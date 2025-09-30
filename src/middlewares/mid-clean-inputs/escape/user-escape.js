import escape from "escape-html";

export const escapeFields = ["email", "password"];

export const escapeUserInput = (req, res, next) => {
  try {
    for (const field of escapeFields) {
      if (req.body[field] && typeof req.body[field] === "string") {
        req.body[field] = escape(req.body[field]);
      }
    }

    return next();
  } catch (error) {
    console.error("Error escaping user fields:", error);
    return res.status(500).json({
      error: "Failed to escape user fields",
      details: error.message,
    });
  }
};
