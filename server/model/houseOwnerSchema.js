const mongoose = require('mongoose')
const houseOwnerSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
 email:{
  type:String,
  required:true,
 },
 address:{
     type:String,
     required:true
 },
 phone:{
    type:Number,
    required:true
 }

});

const HouseOwner = mongoose.model('HouseOwner', houseOwnerSchema);
module.exports = HouseOwner;
