const mongoose = require("mongoose");
const ProductShema = mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
    },
    image:{
      type:String,
      default:""
    },
    title_en: {
      type: String,
      required: true,
    },
    title_ar: {
      type: String,
    },
    username: {
      type: String,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type:String
    },
    size: {
      type: Array,
    },
    store: {
      type: Number,
      default: 1,
    },
    sale: {
      string: Number,
    },
    onsale: {
      type: Boolean,
      default: false,
    },
    status:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Products", ProductShema);
