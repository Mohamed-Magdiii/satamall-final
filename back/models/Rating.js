const mongoose = require("mongoose");
const RatingSchema = mongoose.Schema({
  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
  },
  rate:{
      type:Number,
      default:0
  },
  isApproved:{
    type:Boolean,
    default:false
  },
  product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Products'    
  },
  productTitle:{
      type:String
  },
  comment:{
      type:String
  },
  name:{
      type:String
  }
},
{timestamps:true}
)
module.exports = mongoose.model('Rate' , RatingSchema)