import sanitizeHtml from "sanitize-html";

export const sanitizeUsersInput = (req, res, next) => {
  const fieldsToSanitize = ["email", "password"];
  const sanitizedFields = [];

  try {
    for (const field of fieldsToSanitize) {
      if (req.body[field] && typeof req.body[field] === "string") {
        const original = req.body[field];
        const sanitized = sanitizeHtml(original, {
          allowedTags: [],
          allowedAttributes: {},
        }).trim();

        req.body[field] = sanitized;

        if (original === sanitized) {
          console.log(
            `[sanitizeUsersInput] ✅ Field '${field}' was already clean.`
          );
        } else {
          console.log(
            `[sanitizeUsersInput] 🔧 Field '${field}' was sanitized.`
          );
        }

        sanitizedFields.push(field);
      }
    }

    if (sanitizedFields.length === 0) {
      console.log("[sanitizeUsersInput] ⚠️ No user fields were sanitized.");
    }

    return next();
  } catch (error) {
    console.error("Error sanitizing user fields:", error);
    return res.status(500).json({
      error: "Failed to sanitize user fields",
      details: error.message,
    });
  }
};
