const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Confirmed", "onDelivery", "Deliverd", "Refused"],
    },
    is_paid: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
    shipping_cost: {
      type: Number,
      default: 0
    },
    phone: {
      type: String,
      required: true
    },
    address:{
      type: String,
      required: true
    },
    // add region_id here !! 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
