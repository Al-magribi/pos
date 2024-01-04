import { Schema, model } from "mongoose";

const foodSchema = new Schema(
  {
    food: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("food", foodSchema);
