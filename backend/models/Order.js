import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        productId: { type: String },
        productName: { type: String },

        category: { type: Array },
        color: { type: String },
        size: { type: String },
        shoeNumber: { type: String, default: " " },
        price: { type: Number },
        quantity: {
          type: Number,
        },
        gender: { type: String },
        img: { type: String },
      },
    ],

    adressDetails: {
      city: { type: String },

      country: { type: String },
      line1: { type: String },

      line2: { type: String },
      postalCode: { type: String },
      state: { type: String },
    },
    email: { type: String },
    total: { type: Number },
    orderStatutus: { type: String, default: "In progress..." },
    userId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
