const mongoose = require("mongoose");

const SubCategorySchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    title_ar: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", SubCategorySchema);
