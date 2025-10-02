import { z } from "zod";
import { Types } from "mongoose";
import User from "../../../models/user-model.js";
import Reagent from "../../../models/reagents-model.js";
const createUserReagentParamsSchema = z.object({
  userId: z.string().refine(id => Types.ObjectId.isValid(id), {
    message: "Invalid user ID"
  })
});
const createUserReagentBodySchema = z.object({
  casNumber: z.string().min(1, "CAS number is required")
});
const createUserReagent = async (req, res) => {
  try {
    const {
      userId
    } = createUserReagentParamsSchema.parse(req.params);
    const body = createUserReagentBodySchema.parse(req.body);
    const user = await User.findOne({
      _id: Types.ObjectId.createFromHexString(userId),
      status: "user"
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    const newReagent = await Reagent.create({
      ...body,
      createdBy: user._id
    });
    if (!newReagent) {
      throw new Error("Error while creating user reagent");
    }
    return res.status(201).json({
      message: "Reagent created",
      reagent: newReagent
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        errors: error.errors
      });
    }
    return res.status(500).json({
      error: error.message
    });
  }
};
export default createUserReagent;