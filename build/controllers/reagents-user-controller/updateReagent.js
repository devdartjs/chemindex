import Reagent from "../../models/reagents-model.js";
export const updateReagent = async (req, res) => {
  try {
    const userId = res.locals.user?._id;
    if (!userId) {
      return res.status(400).json({
        message: "User not allowed"
      });
    }
    const {
      casNumber,
      ...updateFields
    } = req.body;
    if (!casNumber || Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        message: "Invalid request format: please review your fields"
      });
    }
    const casNumberClean = String(casNumber).trim();
    const existingProduct = await Reagent.findOne({
      casNumber: casNumberClean,
      createdBy: userId
    });
    if (!existingProduct) {
      return res.status(404).json({
        error: "Product not found"
      });
    }
    const updatedProduct = await Reagent.findOneAndUpdate({
      casNumber: casNumberClean,
      createdBy: userId
    }, {
      $set: updateFields
    }, {
      new: true
    });
    if (!updatedProduct) {
      return res.status(400).json({
        error: "No changes were made"
      });
    }
    return res.status(200).json({
      message: "Product updated successfully",
      updatedProduct
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
};
export default updateReagent;