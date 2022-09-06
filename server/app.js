const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
//ab express ke uner method, function property hai toh wo 
//sab ko use karne ke liye hum is tara lekhte hai
const app = express();
app.use(cookieParser());
dotenv.config({ path: './config.env' });

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

require('./db/conn');
//postman ko json data lai convert garna or understand garna

app.use(express.json());
// const User = require('./model/userSchema');

// we link the router files to make out route easy

app.use(require('./router/auth'));

//confi.env ko file lai hamile directly access garna sakdaina
//tesko lagi we use process
// const DB = process.env.DATABASE;
const PORT = process.env.PORT;



// const DB = 'mongodb+srv://bishal:bishal@cluster0.b8e9m.mongodb.net/houserental?retryWrites=true&w=majority';

//it return promise and write then
// mongoose.connect(DB).then(()=>{
//     console.log(`connection successful`);

// }).catch((err)=>{
//     console.log("no connection");
//     console.log(err);
// });

//middleware
//middleware ma aauta parameter add hunxa next
//middleware function are function that have access to the request object(req),
//the response object(res), amnd the next function in the applicaton's
//request-response cycle
//the next function is a function in the express router,
//when invoked, executes the middleware succeeding the current middleware

// const middleware = (req, res, next)=>{
//     console.log(`hello my middleware`);
//     ne;

// }

// const middleware = (req,res,next)=>{
//     console.log("hello from middleware");
//     next();
// }


//syntax:app.get(path,callback)


// app.get('/',(req, res)=>{
//     //response vejna hai server se
//     res.send("hello data word from the server");
    
// });

// app.get('/about',middleware,(req, res)=>{

//     res.send("hello from the about us page" );

// });



// app.get('/contact',(req,res)=>{
//     res.cookie("Test","Thapa");
//     res.send("hello frpm the contact is us page");


// })



//server ko listen karna padega yo wala port mai 
//es particular  
//you mathi ko page ma visit garyo nai vanera hamile server lai
//kuch na kuch listen karwana padega
app.listen(PORT, () =>{
    console.log(`server is running at port no ${PORT}`);
})