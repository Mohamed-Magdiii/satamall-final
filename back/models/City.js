const mongoose = require('mongoose')
const CitySchema = mongoose.Schema(
    {
        city:{
            type:String,
        },
        countryId:{
            type:String,
        },
        countryname:{
            type:String
        }
    }
)

module.exports = mongoose.model('City' , CitySchema)