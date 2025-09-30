import Reagent from "../../models/reagents-model.js";

const getReagents = async (req, res) => {
  try {
    const userId = res.locals.user?._id;
    if (!userId) return res.status(401).json({ message: "User not allowed." });

    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 10;

    if (Number.isNaN(page) || Number.isNaN(limit))
      return res
        .status(400)
        .json({ message: "Page and limit must be valid numbers." });

    if (page < 1 || limit < 1)
      return res.status(400).json({
        message: "Invalid page or limit value. Must be greater than 0.",
      });

    if (page > 100 || limit > 100)
      return res
        .status(400)
        .json({ message: "Page or limit value exceeds maximum of 100." });

    const startIndex = (page - 1) * limit;
    const totalReagents = await Reagent.countDocuments({ createdBy: userId });
    const totalPages = Math.ceil(totalReagents / limit);

    const reagents = await Reagent.find({ createdBy: userId })
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (!reagents || reagents.length === 0)
      return res
        .status(404)
        .json({ message: "No reagents found on this page." });

    return res.status(200).json({
      reagents,
      totalReagents,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err: err.message });
  }
};

export default getReagents;
