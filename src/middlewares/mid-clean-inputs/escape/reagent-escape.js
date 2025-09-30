import escape from "escape-html";

const escapeFields = [
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

export const escapeReagentInput = (req, res, next) => {
  try {
    for (const field of escapeFields) {
      if (req.body[field] && typeof req.body[field] === "string") {
        req.body[field] = escape(req.body[field]);
      }
    }

    if (Array.isArray(req.body.information)) {
      req.body.information = req.body.information.map(item =>
        typeof item === "string" ? escape(item) : item
      );
    }

    if (Array.isArray(req.body.composition)) {
      req.body.composition = req.body.composition.map(item => ({
        substance:
          item.substance && typeof item.substance === "string"
            ? escape(item.substance)
            : "",
        concentration:
          item.concentration && typeof item.concentration === "string"
            ? escape(item.concentration)
            : "",
      }));
    }

    return next();
  } catch (error) {
    console.error("Error escaping reagent fields:", error);
    return res.status(500).json({
      error: "Failed to escape reagent fields",
      details: error.message,
    });
  }
};

export default escapeReagentInput;
