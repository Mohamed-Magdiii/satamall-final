const mongoose = require('mongoose')
const CountryModel = mongoose.Schema(
    {
        country:{
            type:String,
            require:true,
            unique:true
        }
    }
)
module.exports= mongoose.model('Country', CountryModel)