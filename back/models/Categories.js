const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            unique:true
        },
        title_ar:{
         type:String,
        },
        showInMenu:{
           type:Boolean, 
           default:true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Category',  CategorySchema)