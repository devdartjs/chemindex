import User from "../../../models/user-model.js";
import Reagent from "../../../models/reagents-model.js";
const createUserReagent = async (req, res) => {
  try {
    const {
      userId
    } = req.params;
    const user = await User.findOne({
      _id: userId,
      status: "user"
    });
    if (!user) return res.status(404).json({
      message: "User not found"
    });
    const {
      casNumber
    } = req.body;
    if (!casNumber) return res.status(400).json({
      message: "Missing required fields"
    });
    const newReagent = await Reagent.create({
      ...req.body,
      createdBy: userId
    });
    if (!newReagent) throw new Error("Error while creating user reagent");
    res.status(201).json({
      message: "Reagent created",
      reagent: newReagent
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};
export default createUserReagent;