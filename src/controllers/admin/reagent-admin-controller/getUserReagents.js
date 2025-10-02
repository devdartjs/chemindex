import { z } from "zod";
import { Types } from "mongoose";
import Reagent from "../../../models/reagents-model.js";

const getUserReagentsSchema = z.object({
  userId: z
    .string()
    .refine(id => Types.ObjectId.isValid(id), { message: "Invalid user ID" }),
});

const getUserReagents = async (req, res) => {
  try {
    const { userId } = getUserReagentsSchema.parse(req.params);

    const userReagents = await Reagent.find({
      createdBy: Types.ObjectId.createFromHexString(userId),
    });

    if (!userReagents || userReagents.length === 0) {
      return res
        .status(404)
        .json({ message: "No reagents found for this user" });
    }

    return res.status(200).json({
      totalUserReagents: userReagents.length,
      userReagents,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: error.message });
  }
};

export default getUserReagents;
