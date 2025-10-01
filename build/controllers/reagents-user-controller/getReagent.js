import Reagent from "../../models/reagents-model.js";
const getReagent = async (req, res) => {
  try {
    const userId = res.locals.user?._id;
    if (!userId) return res.status(400).json({
      message: "User not allowed"
    });
    const {
      casNumber
    } = req.params;
    if (!casNumber) return res.status(400).json({
      message: "Invalid CAS-Number"
    });
    const reagent = await Reagent.find({
      casNumber: casNumber.trim(),
      createdBy: userId
    });
    if (reagent.length === 0) return res.status(400).json({
      message: "There is no reagent associated with this CAS-Number"
    });
    return res.status(200).json({
      reagent: reagent
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      err: err.message
    });
  }
};
export default getReagent;