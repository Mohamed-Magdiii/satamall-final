const mongoose = require("mongoose");

const OfferSchema = mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    quantity: {
      type: Number,
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Products",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offers", OfferSchema);
