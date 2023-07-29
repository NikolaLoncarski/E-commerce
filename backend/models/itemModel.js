import mongoose, { mongo } from "mongoose";

const itemSchema = mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "An item must have a name"],
    },
    model: {
      type: String,
      required: [true, "An item must have a name"],
    },
    price: {
      type: Number,
      required: [true, "An item must have a price"],
    },
    priceDiscount: {
      type: Number,
    },
  },
  {
    timeStamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
