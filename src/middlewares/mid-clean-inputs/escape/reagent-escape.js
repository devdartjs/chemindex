import escape from 'escape-html';

const escapeFields = [
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

export const escapeReagentInput = (req, res, next) => {
  try {
    escapeFields.forEach(field => {
      if (req.body[field]) {
        req.body[field] = escape(req.body[field]);
      }
    });

    if (Array.isArray(req.body.information)) {
      req.body.information = req.body.information.map(item => escape(item));
    }

    if (Array.isArray(req.body.composition)) {
      req.body.composition = req.body.composition.map(item => ({
        substance: item.substance ? escape(item.substance) : '',
        concentration: item.concentration ? escape(item.concentration) : '',
      }));
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to escape reagent fields' });
  }
};

export default escapeReagentInput;
