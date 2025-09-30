import Reagent from '../../models/reagents-model.js';

export const deleteReagent = async (req, res) => {
  try {
    const userId = res.locals.user?._id;
    if (!userId) return res.status(400).json({ message: 'User not allowed' });

    const { casNumber } = req.params;
    if (!casNumber)
      return res.status(400).json({ message: 'invalid CAS-Number' });

    const deletedProduct = await Reagent.findOneAndDelete({
      casNumber: casNumber.trim(),
      createdBy: userId,
    });

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ error: 'Product not found or already deleted.' });
    }

    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default deleteReagent;
