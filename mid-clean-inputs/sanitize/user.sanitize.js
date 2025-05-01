    import sanitizeHtml from 'sanitize-html';

    export const sanitizeUsersInput = (req, res, next) => {
        
    const fieldsToSanitize = [
        'email',
    ];

    const sanitizedFields = [];

    for (let field of fieldsToSanitize) {
        if (req.body[field]) {
        const original = req.body[field];
        const sanitized = sanitizeHtml(original, {
            allowedTags: [],
            allowedAttributes: {}
        }).trim();

        req.body[field] = sanitized;

        if (original !== sanitized) {
            console.log(`[sanitizeUserstInput] 🔧 Field '${field}' already sanitized.`);
        } else {
            console.log(`[sanitizeUsersInput] ✅ Field '${field}' already clean.`);
        }

        sanitizedFields.push(field);
        }
    }

    if (sanitizedFields.length === 0) {
        console.log('[sanitizeUsersInput] ⚠️ Nenhum campo de produto foi encontrado no req.body para sanitização.');
    }

    next();
    };
