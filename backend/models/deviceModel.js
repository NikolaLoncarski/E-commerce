import mongoose from "mongoose";

const brandNameSchema = mongoose.Schema({
  brandName: {
    type: String,
    required: [true, "An item must have a name"],
  },
});
const modelSchema = mongoose.Schema({
  modelName: {
    type: String,
    required: [true, "An item must have a modelName"],
  },
});

const Brand = mongoose.model("Brand", brandNameSchema);
const Model = mongoose.model("Model", modelSchema);

export { Brand, Model };
