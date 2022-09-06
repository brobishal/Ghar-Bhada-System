const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
 email:{
  type:String,
  required:true,
 },
 password:{
  type: String,
  required: true
 },
 cpassword:{
     type:String,
     required:true
 },
 tokens:[
    {
        token:{
            type:String,
            require:true

        }
    }
],

});


//we are hashing the password

adminSchema.pre('save',async function(next){
    //iif pasword garcha vane tohi mujhe yes particular password ko hash karn ahai
console.log("hi from");

if(this.isModified('password')){
    //round 12 ka salt samm jane
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await  bcrypt.hash(this.cpassword,12);

}
next();
});


//we are generating token 
//yaha userShcema ek instance hai so us instace ke sath kuch bi
//work karte ho toh method use grana parcha
adminSchema.methods.generateAuthToken = async function(){
    try{
        //and sign ke under hame two parameter pass kana hai
        //one is payload and another is scret key
        let token = jwt.sign({_id:this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
