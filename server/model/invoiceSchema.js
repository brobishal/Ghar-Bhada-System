const mongoose = require('mongoose');
const invoiceSchema = new mongoose.Schema({
 invoiceId:{
  type:String,
  required:true,
 },
 date:{
    type:Date,
    default:Date.now
 },
 renter:{
  type: String,
  required: true
 },
 amount:{
  type:Number,
  required:true
 },
 electricity:{
    type:Number,
    required:true

 },
 water:{
    type:Number,
    required:true

 },
 garbage:{
    type:Number,
    required:true

 },
 status:{
     type:String,   
     required:true
 }

});

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;
