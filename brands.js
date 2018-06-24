var mongoose= require('mongoose');

var brandschema=mongoose.Schema({
    name:{type:String,
         required:true
    },
    desc:{type:String,
        required:true

    },
    create_date :{
        type:Date,
        default:Date.now
    }
})

var Brand= mongoose.model('Brand',brandschema);
module.exports=Brand;
// module.exports.getBrands=function(callback)
// {
//     Brand.find(callback);
// }
