import { z } from "zod";
import { Types } from "mongoose";
import User from "../../../models/user-model.js";
const getUserParamsSchema = z.object({
  userId: z.string().refine(id => Types.ObjectId.isValid(id), {
    message: "Invalid user ID"
  })
});
const getUser = async (req, res) => {
  try {
    const {
      userId
    } = getUserParamsSchema.parse(req.params);
    const user = await User.findOne({
      _id: Types.ObjectId.createFromHexString(userId),
      status: "user"
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    return res.status(200).json({
      user
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
export default getUser;