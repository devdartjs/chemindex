import Reagent from "../../../models/reagents-model.js";
const updateUserReagent = async (req, res) => {
  try {
    const {
      userId,
      casNumber
    } = req.params;
    const updateData = req.body;
    const updatedReagent = await Reagent.findOneAndUpdate({
      createdBy: userId,
      casNumber: casNumber.trim()
    }, {
      $set: updateData
    }, {
      new: true,
      runValidators: true
    });
    if (!updatedReagent) return res.status(404).json({
      message: "Reagent not found"
    });
    res.status(200).json({
      message: "Reagent updated",
      updatedReagent
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};
export default updateUserReagent;