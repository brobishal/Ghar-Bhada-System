const mongoose = require('mongoose')
const renterSchema = new mongoose.Schema({
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
 room:{
     type:String,
     required:true
 },
 date:{
     type:String,
     required:true
 }
});

const Renter = mongoose.model('Renter', renterSchema);
module.exports = Renter;
