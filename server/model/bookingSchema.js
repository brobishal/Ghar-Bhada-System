const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
paymentMethod:{
  type:String,
  required:true,
 },
 amount:{
    type:String,
    required:true
 },
 id:{
  type: Number,
  required: true
 },
 remarks:{
  type:String,
  required:true
 }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
