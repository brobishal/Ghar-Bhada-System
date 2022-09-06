
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const Authenticate = async (req, res, next) =>{
    try{
        //humse yaha token ko get karliya hai
        const token = req.cookies.jwttoken;
        //yaha hamile token ra secret key lai compare garera match garnu parcha
        //ra hamro secre key config.env ma xa ra teslai paauna ko lagi
        //we write process.env.SECRET_KEY
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        //verify token ke under user ka sara data aa chuka hai and  "tokens:token":token match kargaya
        // toh hamara user availabe hai
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token":token});

        //agar user nahi milta hai toh
        if(!rootUser){ throw new Error('User not found')}
        
        //agar hume user mila hai toh 
        //here req.token will be my token
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        // next() call garnu parcha natra hamro yehi middle ware ma atakke raha jayega
          
        next();

    }catch(err){
        res.status(401).send("Ununthorized :No token provided");
        console.log(err);
    }


}

module.exports = Authenticate;