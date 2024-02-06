import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: mongoose.Decimal128,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
    // default
  }
});
export const Meal = mongoose.model("Meal", MealSchema);
