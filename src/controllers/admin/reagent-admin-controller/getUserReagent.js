import { z } from "zod";
import { Types } from "mongoose";
import Reagent from "../../../models/reagents-model.js";

const getUserReagentSchema = z.object({
  userId: z
    .string()
    .refine(id => Types.ObjectId.isValid(id), { message: "Invalid user ID" }),
  casNumber: z.string().trim().min(1, "Invalid CAS number"),
});

const getUserReagent = async (req, res) => {
  try {
    const { userId, casNumber } = getUserReagentSchema.parse(req.params);

    const userReagent = await Reagent.find({
      createdBy: Types.ObjectId.createFromHexString(userId),
      casNumber,
    });

    if (!userReagent || userReagent.length === 0) {
      return res
        .status(404)
        .json({ message: "There is no reagents for this user" });
    }

    return res.status(200).json({
      totalUserReagents: userReagent.length,
      userReagent,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: error.message });
  }
};

export default getUserReagent;
