
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        address:{
            type:String,
            required:true

        },
        password:{
            type:String,
            required:true,

        },
        cpassword:{
            type:String,
            required:true
        },
        // data:{
        //     type:Date,
        //     default:Date.now
        // },
        messages:[
            {
                name:{
                    type:String,
                    required:true
                },
                email:{
                    type:String,
                    required:true
                },
                phone:{
                    type:Number,
                    required:true
                },
                message:{
                    type:String,
                    required:true
        
                },


        }],
        tokens:[
            {
                token:{
                    type:String,
                    require:true

                }
            }
        ],

        


})



//we are hashing the password

userSchema.pre('save',async function(next){
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
userSchema.methods.generateAuthToken = async function(){
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







//stored the message
//userSchema.methods.wo function ka name
userSchema.methods.addMessage = async function(name,email,phone, message){
    try{
        //yo basically yesari vaira hunxa name:name so both key and value are same
        //so tei vayera single lekheko hamile
        this.messages= this.messages.concat({name, email, phone, message })
        await this.save();
        return this.messages; 

    }catch(error){
        console.log(error);
    }

}




//model ke under two parameter hunxa first 
//is collection ko name 
//ANOTHER is structure kasto hunxa vanera vanxa

const User = mongoose.model('User',userSchema);
module.exports = User; 
