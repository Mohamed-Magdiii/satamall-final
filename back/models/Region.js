const mongoose = require('mongoose')
const RegionModel = mongoose.Schema(
    {
        region:{
            type:String,
            
        },
        cityId:{
            type:String,
            ref:"City"
        },
        price:{
            type:Number,
            required:true
        },
        cityname:{
            type:String,
        },
        countryname:{
            type:String
        }
    }
)
module.exports= mongoose.model('Region', RegionModel)