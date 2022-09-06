const mongoose = require('mongoose')
const roomSchema = new mongoose.Schema({
roomno:{
    type:Number,
    required:true
},
 roomname:{
  type:String,
  required:true,
 },
 category:{
  type: String,
  required: true
 },
 price:{
  type:Number,
  required:true
 },
 address:{
     type:String,
     required:true
 },
 features:{
  type:String,
  required:true
 },
 status:{
    type:String,
    required:true
 },
 houseowner:{
    type:String,
    required:true
 },
 roomImage:{
     type:String,   
     default:null
 },

//  },
//  postDate:{
//     type:Date, 
//     default:Date.now
//  },
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
