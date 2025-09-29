import sanitizeHtml from 'sanitize-html';

export const sanitizeReagentInput = (req, res, next) => {
  const fieldsToSanitize = [
    'casNumber',
    'reagentName',
    'description',
    'classe',
    'brand',
    'classification',
    'local',
    'volume',
    'weight',
    'molecularFormula',
    'molecularWeight_g_per_mol',
    'furtherInformations',
  ];

  const sanitizedFields = [];

  try {
    fieldsToSanitize.forEach(field => {
      if (req.body[field]) {
        const original = req.body[field];
        const sanitized = sanitizeHtml(original, {
          allowedTags: [],
          allowedAttributes: {},
        }).trim();

        req.body[field] = sanitized;
        sanitizedFields.push(field);
      }
    });

    if (sanitizedFields.length === 0) {
      console.log('[sanitizeReagentInput] ⚠️ No sanitized fields.');
    } else {
      console.log(
        '[sanitizeReagentInput] ✅ Sanitized fields:',
        sanitizedFields
      );
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to sanitize reagent fields' });
  }
};
