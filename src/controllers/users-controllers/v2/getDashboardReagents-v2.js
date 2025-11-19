import ReagentsModel from "../../../models/reagents-model.js";

export const getDashboardReagentsv2 = async (req, res) => {
  try {
    const userId = res.locals.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, error: "User not authenticated" });
    }

    const reagents = await ReagentsModel.find({ userId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalReagents = await ReagentsModel.countDocuments({ userId });
    const totalPages = Math.ceil(totalReagents / limit);

    return res.status(200).json({
      success: true,
      data: {
        reagents: reagents.map(reagent => ({
          _id: reagent._id,
          casNumber: reagent.casNumber || "N/A",
          reagentName: reagent.reagentName || "Unnamed",
          local: reagent.local || "Unknown",
          quantity: reagent.quantity || "0",
        })),
        totalReagents,
        currentPage: page,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching reagents:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
