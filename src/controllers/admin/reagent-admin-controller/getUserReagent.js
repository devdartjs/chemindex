import mongoose from "mongoose";
import Reagent from "../../../models/reagents-model.js";

const getUserReagent = async (req, res) => {
  try {
    const { userId, casNumber } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (!casNumber || typeof casNumber !== "string") {
      return res.status(400).json({ message: "Invalid CAS number" });
    }

    const userReagent = await Reagent.find({
      createdBy: new mongoose.Types.ObjectId(userId),
      casNumber: casNumber.trim(),
    });

    if (!userReagent || userReagent.length === 0) {
      return res
        .status(400)
        .json({ message: "There is no reagents for this user" });
    }

    res
      .status(200)
      .json({ totalUserReagents: userReagent.length, userReagent });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getUserReagent;
