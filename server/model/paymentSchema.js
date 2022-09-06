const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema({
date:{
    type:Date,
    dafault: Date.now
},
 invoice:{
  type:Number,
  required:true,
 },
 renter:{
  type: String,
  required: true
 },
 price:{
  type:Number,
  required:true
 }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
