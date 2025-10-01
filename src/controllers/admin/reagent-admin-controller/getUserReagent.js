import Reagent from "../../../models/reagents-model.js";

const getUserReagent = async (req, res) => {
  try {
    const { userId, casNumber } = req.params;

    const userReagent = await Reagent.find({
      createdBy: userId,
      casNumber: casNumber.trim(),
    });
    if (!userReagent || userReagent.length === 0)
      return res
        .status(400)
        .json({ message: "There is no reagents for this user" });

    res
      .status(200)
      .json({ totalUserReagents: userReagent.length, userReagent });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getUserReagent;
