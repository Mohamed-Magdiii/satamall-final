const mongoose = require("mongoose");

const OrderItemSchema = mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderItem", OrderItemSchema);
