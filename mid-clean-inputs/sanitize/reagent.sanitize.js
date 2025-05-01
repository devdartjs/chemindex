import sanitizeHtml from 'sanitize-html';

export const sanitizeReagentInput = (req, res, next) => {
    const fieldsToSanitize = [
        'casNumber', 'reagentName', 'description', 'classe',
        'brand', 'classification', 'local', 'volume', 'weight',
        'molecularFormula', 'molecularWeight_g_per_mol', 'furtherInformations'
    ];

    const sanitizedFields = [];

    try {
        // Campos simples
        fieldsToSanitize.forEach(field => {
            if (req.body[field]) {
                const original = req.body[field];
                const sanitized = sanitizeHtml(original, {
                    allowedTags: [],
                    allowedAttributes: {}
                }).trim();

                req.body[field] = sanitized;
                sanitizedFields.push(field);
            }
        });

        // Campos do tipo array simples
        if (Array.isArray(req.body.information)) {
            req.body.information = req.body.information.map(info =>
                sanitizeHtml(info, { allowedTags: [], allowedAttributes: {} }).trim()
            );
            sanitizedFields.push('information');
        }

        // Campos compostos (array de objetos)
        if (Array.isArray(req.body.composition)) {
            req.body.composition = req.body.composition.map(item => ({
                substance: item.substance
                    ? sanitizeHtml(item.substance, { allowedTags: [], allowedAttributes: {} }).trim()
                    : '',
                concentration: item.concentration
                    ? sanitizeHtml(item.concentration, { allowedTags: [], allowedAttributes: {} }).trim()
                    : ''
            }));
            sanitizedFields.push('composition');
        }

        if (sanitizedFields.length === 0) {
            console.log('[sanitizeReagentInput] ⚠️ Nenhum campo foi sanitizado.');
        } else {
            console.log('[sanitizeReagentInput] ✅ Campos sanitizados:', sanitizedFields);
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Failed to sanitize reagent fields' });
    }
};
