import sanitizeHtml from 'sanitize-html';

export const sanitizeUsersInput = (req, res, next) => {
  const fieldsToSanitize = ['email', 'password'];

  const sanitizedFields = [];

  for (let field of fieldsToSanitize) {
    if (req.body[field]) {
      const original = req.body[field];
      const sanitized = sanitizeHtml(original, {
        allowedTags: [],
        allowedAttributes: {},
      }).trim();

      req.body[field] = sanitized;

      if (original !== sanitized) {
        console.log(
          `[sanitizeUserstInput] 🔧 Field '${field}' already sanitized.`
        );
      } else {
        console.log(`[sanitizeUsersInput] ✅ Field '${field}' already clean.`);
      }

      sanitizedFields.push(field);
    }
  }

  if (sanitizedFields.length === 0) {
    console.log('[sanitizeUsersInput] ⚠️ No product field was found.');
  }

  next();
};
