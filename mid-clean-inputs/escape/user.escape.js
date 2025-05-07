import escape from 'escape-html';

const escapeFields = [
'email', 'password'
];

export const escapeUserInput = (req, res, next) => {

try {
    escapeFields.forEach(field => {
    if (req.body[field]) {
        req.body[field] = escape(req.body[field]);
    }
    });

    console.log('Escaped Product Fields:', req.body);

    next();
} catch (error) {
    return res.status(500).json({ error: 'Failed to escape product fields' });
}
};
