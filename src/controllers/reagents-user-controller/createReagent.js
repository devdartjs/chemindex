import Reagent from '../../models/reagents-model.js';

const createReagent = async (req, res) => {
  try {
    const userId = res.locals.user?._id;
    if (!userId) return res.status(401).json({ message: 'User not allowed.' });

    const reagents = await Reagent.find({ userId, createdBy: userId });
    if (!reagents)
      return res.status(400).json({ message: 'There is no reagents here!' });

    if (reagents.length >= 16) {
      alert(
        'To create more reagents, you need to update your account. Click ok and fill out the form'
      );
      return res.redirect('wainting-list-form');
    }

    const { casNumber, ...fields } = req.body;
    if (!casNumber)
      return res.status(400).json({ message: 'Invalid casNumber' });

    const existingReagent = await Reagent.findOne({
      casNumber: casNumber.trim(),
      createdBy: userId,
    });
    if (existingReagent)
      return res.status(400).json({ message: 'Reagent already exists!' });

    const newReagent = await Reagent.create({
      ...req.body,
      createdBy: userId,
    });

    return res.status(201).json({ reagent: newReagent });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', err: err.message });
  }
};

export default createReagent;
