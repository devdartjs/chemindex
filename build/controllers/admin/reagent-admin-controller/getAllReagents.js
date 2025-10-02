import Reagent from "../../../models/reagents-model.js";
const getAllReagents = async (req, res) => {
  try {
    const allReagents = await Reagent.find();
    if (!allReagents || allReagents.length === 0) return res.status(400).json({
      message: "There is no reagents here"
    });
    res.status(200).json({
      totalReagentsAdmin: allReagents.length,
      allReagents
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};
export default getAllReagents;