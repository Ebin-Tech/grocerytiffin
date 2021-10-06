const mongoose = require("mongoose");
const schema = mongoose.Schema;
let user = new schema(
    {
        firstName:String,
        lastName:String,
        email:String,
        password:String,
        Phonenumber:String,
        Address:String,
        Address2:String,
        City:String,
        Province:String,
        Zip:String,

      
        }
);
module.exports=mongoose.model("users",user);