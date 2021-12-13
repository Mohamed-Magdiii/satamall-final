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
  product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Products'    
  },
  productTitle:{
      type:String
  }
},
{timestamps:true}
)
module.exports = mongoose.model('Rate' , RatingSchema)