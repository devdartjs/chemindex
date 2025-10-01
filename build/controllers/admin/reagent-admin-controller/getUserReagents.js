import Reagent from "../../../models/reagents-model.js";
const getUserReagents = async (req, res) => {
  try {
    const {
      userId
    } = req.params;
    const userReagents = await Reagent.find({
      createdBy: userId
    });
    if (!userReagents || userReagents.length === 0) return res.status(400).json({
      message: "There is no reagents for this user"
    });
    res.status(200).json({
      totalUserReagents: userReagents.length,
      userReagents
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};
export default getUserReagents;