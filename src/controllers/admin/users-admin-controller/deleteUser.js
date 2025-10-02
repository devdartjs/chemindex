import { z } from "zod";
import { Types } from "mongoose";
import User from "../../../models/user-model.js";

const deleteUserParamsSchema = z.object({
  userId: z
    .string()
    .refine(id => Types.ObjectId.isValid(id), { message: "Invalid user ID" }),
});

const deleteUser = async (req, res) => {
  try {
    const { userId } = deleteUserParamsSchema.parse(req.params);

    const deletedUser = await User.findOneAndDelete({
      _id: Types.ObjectId.createFromHexString(userId),
      status: "user",
    });

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "User not found or already deleted" });
    }

    return res.status(200).json({ message: "The user has been deleted" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: error.message });
  }
};

export default deleteUser;
