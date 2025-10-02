import { z } from "zod";
import { Types } from "mongoose";
import User from "../../../models/user-model.js";
const updateUserParamsSchema = z.object({
  userId: z.string().refine(id => Types.ObjectId.isValid(id), {
    message: "Invalid user ID"
  })
});
const updateUserBodySchema = z.object({
  email: z.string().email({
    message: "Invalid email format"
  }).optional(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters"
  }).optional()
}).superRefine((data, ctx) => {
  if (Object.keys(data).length === 0) {
    ctx.addIssue({
      code: "custom",
      message: "No valid fields to update"
    });
  }
});
const updateUser = async (req, res) => {
  try {
    const {
      userId
    } = updateUserParamsSchema.parse(req.params);
    const updateFields = updateUserBodySchema.parse(req.body);
    if (updateFields.email) {
      updateFields.email = updateFields.email.trim().toLowerCase();
    }
    const updatedUser = await User.findOneAndUpdate({
      _id: Types.ObjectId.createFromHexString(userId),
      status: "user"
    }, {
      $set: updateFields
    }, {
      new: true,
      runValidators: true
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found or not a regular user"
      });
    }
    return res.status(200).json({
      updatedUser
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
export default updateUser;