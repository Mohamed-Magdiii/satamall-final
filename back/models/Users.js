const mongoose = require("mongoose");
const UserShema = mongoose.Schema(
  {
    fullname:{
      type:String,
      required:true
    },
    telephone:{
      type:Number,
      default:""
    },
    mobile:{
      type:Number,
      default:""
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "vendor","moderator"],
    },
    image:{
        type:String,
        default:""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserShema);
