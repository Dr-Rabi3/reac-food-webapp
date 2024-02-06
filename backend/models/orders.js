import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  items: [
    {
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
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  customer: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    "postal-code": {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
});
export const Order = mongoose.model("Order", OrderSchema);
