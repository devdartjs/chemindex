import Reagent from "../../../models/reagents-model.js";

const deleteUserReagent = async (req, res) => {
  try {
    const { userId, casNumber } = req.params;

    const deletedReagent = await Reagent.findOneAndDelete({
      createdBy: userId,
      casNumber: casNumber.trim(),
    });
    if (!deletedReagent)
      return res.status(404).json({ message: "Reagent not found" });

    res
      .status(200)
      .json({ message: "Reagent deleted successfully", deletedReagent });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default deleteUserReagent;
