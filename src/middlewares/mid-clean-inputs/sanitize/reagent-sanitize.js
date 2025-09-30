import sanitizeHtml from "sanitize-html";

export const sanitizeReagentInput = (req, res, next) => {
  const fieldsToSanitize = [
    "casNumber",
    "reagentName",
    "description",
    "classe",
    "brand",
    "classification",
    "local",
    "volume",
    "weight",
    "molecularFormula",
    "molecularWeight_g_per_mol",
    "furtherInformations",
  ];

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
        sanitizedFields.push(field);
      }
    }

    if (sanitizedFields.length === 0) {
      console.log("[sanitizeReagentInput] ⚠️ No fields sanitized.");
    } else {
      console.log(
        "[sanitizeReagentInput] ✅ Sanitized fields:",
        sanitizedFields
      );
    }

    return next();
  } catch (error) {
    console.error("Error sanitizing reagent fields:", error);
    return res.status(500).json({
      error: "Failed to sanitize reagent fields",
      details: error.message,
    });
  }
};

export default sanitizeReagentInput;
