const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Authenticate = require("../middleware/Authenticate");

const multer = require("multer");

require("../db/conn");
const User = require("../model/userSchema");
const Room = require("../model/roomSchema");
const Category = require("../model/categorySchema");
const Payment = require("../model/paymentSchema");
const Contact = require("../model/contactSchema");
const Admin = require("../model/adminSchema");
const Renter = require("../model/renterSchema");
const HouseOwner = require("../model/houseOwnerSchema");
const Invoice = require("../model/invoiceSchema");
const Booking  = require('../model/bookingSchema');

router.get("/", (req, res) => {
  console.log("hello auth world from the server");
});

/* 
//just created a path to load our html file
//uploading the image
//distorage function eccept obejct of two values
//destination 
//define storage for the images
const fileStorage = multer.diskStorage({
    //destination for file
destination:(req, file, callback) =>{
    //run the cb funciton that exception error which is null
    //then the destination string - is direct path where save file in server
    callback(null, './images');
},
//add back the extension
filename : (req, file, callback)=>{
    callback(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));

}
});
// for image upload
// to run this multer function to pass object
 //and this object has fiew properties
 //first is storage properties - storage properties 
 //takes storage engine and this storage engine we are going to create
 //tells and how to save our files


 //for file filter

 const fileFilter = (req, file, callback)=>{
     const allowedFileTypes = ['image/jpeg','image/jpg','image/png'];
     if(allowedFileTypes.includes(file.mimetype)){
         callback(null, true);
     }else{
         callback(null, false);
     }
 }

//upload paramater for multer
// const upload = multer({
//     storage:fileStorageEngine,
//     fileFilter:(req, file, callback)=>{
//         if(file.mimetype=="image/png" || file.mimetype=="image/jpog" || file.mimetype == "image/jpeg"){
//             callback(null, true);

//         }else{
//             callback(null, flase);
//             return callback(new Error("only .png, .jpg anf jpeg format allow"));
//         }
//     }

//  });

let upload = multer({fileStorage, fileFilter});
//one we are going to run single this tell us
//he tells multer that only one file is going to sent
//and then we have to gibe it a file name
//that multer forwar look incomming requres

router.post("/single", upload.single("image"), (req, res)=>{

    console.log(req.file);
    res.send("single file upload success");
})

//for sending multiple file
//instead of single we use array
// and give it the parameter one is image and antoeher is 
//max count
router.post('/multiple',upload.array('images',3), (req,res)=>{
    console.log(req.files);

    res.send('multiple files upload');

})



*/

//using async await.....................

router.post("/signup", async (req, res) => {
  //object destricturing

  const { name, email, phone, address, password, cpassword } = req.body;
  // console.log(name);
  // console.log(email);
  // console.log(req.body.name);
  // console.log(req.body.email);
  // console.log(req.body);
  // res.json({message:req.body});
  // res.send("mera refister page");

  if (!name || !email || !phone || !address || !password || !cpassword) {
    return res.status(422).json({ error: "plz filled the field propelry" });
  }

  // cheching use exist hai ya or nahi
  //database ma vako email ra client le haleko email match garcha ki nai

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "email already resgister" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "passowrd are not matched" });
    } else {
      //The findOne() function is used to find one document according to the condition. If multiple documents match the condition, then it returns the first document satisfying the condition.

      const user = new User({
        name,
        email,
        phone,
        address,
        password,
        cpassword,
      });
      //yaha pe
      //save garne se pahele teslai hami useShecma ma lekhchhau
      //middleware
      //userSchema ma save garne bitikai user.save() call huncha
      await user.save();
      res.status(201).json({ message: "use registered successfully" });
      // if(userRegister){
      //     res.status(201).json({message:"user register successfully"});

      // }else{
      //     res.status(500).json({error:"failed to registered"});

      // }
    }
  } catch (err) {
    console.log(err);
  }
});

// login route.................................

router.post("/signin", async (req, res) => {
  // console.log(req.body);
  // res.json({ message :"awesome"});
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data" });
    }

    //it return promises
    //ani await garxa - either fullfill or reject
    const userlogin = await User.findOne({ email: email });
    console.log(userlogin);

    if (userlogin) {
      //compare login ko samaya ko password ra database ko password
      const isMatch = await bcrypt.compare(password, userlogin.password);

      //token
      //jwt - jwt ke under two method hai jwt.sign and jwt.verify
      const token = await userlogin.generateAuthToken();
      console.log(`token is ${token}`);

      //token storing into cookie
      //cookie ka nam kya dena hai and usme value kya store karna hai
      //and kab expire karna hai and kaha usko hum add kar sakte hai bata diya

      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 25892000000),
        //chalna ew natra secure ma matra chalchha
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "invalid pass credentials" });
      } else {
        res.json({ message: "user signin sucessfully" });
      }
    } else {
      res.status(400).json({ errorL: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// ...........................
// .............................
//adminregister
router.post("/adminregister", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "plz filled the field propelry" });
  }
  try {
    const userExist = await Admin.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "email already resgister" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "passowrd are not matched" });
    } else {
      const admin = new Admin({ name, email, password, cpassword });
      await admin.save();
      res.status(201).json({ message: "admin registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// adminlogin
router.post("/adminlogin", async (req, res) => {
  // console.log(req.body);
  // res.json({ message :"awesome"});
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data" });
    }

    //it return promises
    //ani await garxa - either fullfill or reject
    const adminlogin = await Admin.findOne({ email: email });
    console.log(adminlogin);

    if (adminlogin) {
      //compare login ko samaya ko password ra database ko password
      const isMatch = await bcrypt.compare(password, adminlogin.password);
      //token
      //jwt - jwt ke under two method hai jwt.sign and jwt.verify
      const token = await adminlogin.generateAuthToken();
      console.log(`token is ${token}`);

      //token storing into cookie
      //cookie ka nam kya dena hai and usme value kya store karna hai
      //and kab expire karna hai and kaha usko hum add kar sakte hai bata diya

      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 25892000000),
        //chalna ew natra secure ma matra chalchha
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "invalid pass credentials" });
      } else {
        res.json({ message: "user signin sucessfully" });
      }
    } else {
      res.status(400).json({ error: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// about us ka page
//here authenticate is middleware
// router.get('/about', Authenticate, (req, res)=>{
//     console.log("hello my about");
//     // res.send("hello from the server");
//     res.send(req.rootUser);
// });

// get user data for contact us and home page
router.get("/getdata", (req, res) => {
  console.log(`hello my about`);
  res.send(req.rootUser);
});

// contact us ka page
router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.json({ error: "please filled the contact form" });
    }

    const userContact = await User.findOne({ _id: req.userID });
    //    if user milgaya ho toh yo data us user ko document ma
    //add karna hai
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "user contact successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// logout
router.get("/logout", (req, res) => {
  // simply path lekh ke xod sakta hu agar kuch na ho directly
  //wo home page ma chala jaye
  res.clearCookie("jwttoken", { httpOnly: true, path: "/" });
  //must add status code
  res.status(200).send("user logout");
  res.redirect("/login");
});

//.................................
//for file storage

// const storage = multer.diskStorage({
//     // req is reuired
//     destination: (req, file, callback)=>{
//         callback(null,'./images');

//     },

//     filename:(req, file, callback)=>{
//         // original means name of the file
//         callback(null, file.originalname);
//     }
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      req.fileValidationError = "Only image files are allowed!";
      cb(null, false);
    }
  },
});

router.post("/single", upload.single("roomImage"), (req, res) => {
  console.log(req.file);
  res.send("single file upload success");
});

// room add
//add upload middleware
// upload.single("image")
router.post("/roompage", upload.single("file"), function (req, res) {
    const roomno = req.body.roomno;
    const roomname = req.body.roomname;
    const category = req.body.category;
    const price = req.body.price;
    const address = req.body.address;
    const features = req.body.features;
    const houseowner = req.body.houseowner;
    const roomImage = req.file.filename;
    const status = req.body.status;

    if (!roomno ||!roomname || !category || !price || !address || !features || !houseowner || !roomImage || !status) {
      return res.status(422).json({ error: "plz filled the field propelry" });
    }
  const data = new Room({
    roomno : roomno,
    roomname : roomname,
    category:category,
    price:price,
    address:address,
    features:features,
    houseowner:houseowner,
    roomImage:roomImage,
    status:status

    // roomname: req.body.roomname,
    // category: req.body.category,
    // price: req.body.price,
    // address: req.body.address,
    // features: req.body.features,
    // houseowner: req.body.houseowner,
    // roomImage: req.file.originalname,
  });
  console.log({ data });
  data
    .save()
    .then(function (result) {
      // success message with status code
      console.log(data);

      res.status(201).json({
        message: "Registered Successfully",
        success: true,
        data: data,
      });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});
// upload file

//get roomdata
router.get("/roomdata", async (req, res) => {
  // by default is 1
  const page = req.query.page || 1;

  //this is limi how many page in data
  const perPage = req.query.perPage || 5;

  try {
    Room.find({}, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
      //   like after fetch , i need to skip 10 room data from database
      //next skip 10 data
    });

    //   .limit(perPage * 1).skip((page-1)*perPage);

    // const mycount =  Room.find().countDocuments()
    // console.log(mycount);
  } catch (err) {
    console.log(err);
  }

  // Room.countDocuments({}, function(err, count) {
  //     if (err) {
  //          return handleError(err)
  //         } //handle possible errors
  //     console.log(count)
  //     res.json(count);
  // })
});

//get room individaul renter
router.get("/roomuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    // console.log(req.params);

    const id = req.params.id;

    const userindividual = await Room.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    console.log(error);
  }
});

//room delete
router.delete("/roomdelete/:id", async (req, res) => {
  const id = req.params.id;
  await Room.findByIdAndRemove(id).exec();
  res.send("Item deleted");
});

//roomdetails
router.get("/roomdetails", async (req, res) => {
  Room.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });

  const mycount = Room.find().countDocuments();
  console.log(mycount);
});

//category add/............................................

router.post("/categorypage", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(422).json({ error: "plz filled the field propelry" });
  }
  const category = new Category({ name });

  await category.save();
  res.status(201).json({ message: "category add successfully" });
});

//get category data
router.get("/categorydata", async (req, res) => {
  await Category.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  }).clone();
});

//categorypudate
router.put("/categoryupdate", async (req, res) => {
  //to get the data from frontend
  const newName = req.body.newName;
  const id = req.body.id;
  try {
    await Category.findById(id, (error, categoryToUpdate) => {
      categoryToUpdate.name = newName;
      categoryToUpdate.save();
      res.send("data updated");
    }).clone();
  } catch (err) {
    console.log(err);
  }
});

//category delete
router.delete("/categorydelete/:id", async (req, res) => {
  const id = req.params.id;
  await Category.findByIdAndRemove(id).exec();
  res.send("Item deleted");
});

//RENTER apge
router.post("/renterpage", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.address;
  const phone = req.body.phone;
  const room = req.body.room;
  const date = req.body.date;
  if (!name || !email || !address || !phone || !room || !date) {
    return res.status(422).json({ error: "plz filled the field propelry" });
  }
  try {
    const prerenter = await Renter.findOne({ email: email });
    console.log(prerenter);
    const renter = new Renter({
      name: name,
      email: email,
      address: address,
      phone: phone,
      room: room,
      date: date,
    });
    await renter.save();
    res.status(201).json({ message: "renter add successfully" });
  } catch (error) {
    console.log(err);
  }
});

//get renter data
router.get("/renterdata", async (req, res) => {
  Renter.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//get renter individaul renter
router.get("/renteruser/:id", async (req, res) => {
  try {
    console.log(req.params);
    // console.log(req.params);

    const id = req.params.id;

    const userindividual = await Renter.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    console.log(error);
  }
});

//update renter data

router.put("/updaterenter/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedrenter = await Renter.findByIdAndUpdate(id, req.body, {
      // hamile yo new:true kina lekheko vaneko
      // jo bhi update kare wo updated value uss milegi
      new: true,
    });
    console.log(updatedrenter);
    res.status(201).json(updatedrenter);
  } catch (error) {
    console.log(error);
  }
});

//renter delete
router.delete("/renterdelete/:id", async (req, res) => {
  const id = req.params.id;
  await Renter.findByIdAndRemove(id).exec();
  res.send("Item deleted");
});

// ........................

//payment
router.post("/paymentpage", async (req, res) => {
  const { date, invoice, renter, price } = req.body;

  if (!date || !invoice || !renter || !price) {
    return res.status(422).json({ error: "plz filled the field propelry" });
  }
  const payment = new Payment({ date, invoice, renter, price });

  await payment.save();
  res.status(201).json({ message: "payment add successfully" });
});

//get payment data
router.get("/paymentdata", async (req, res) => {
  Payment.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// update payment
router.get("/paymentuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    // console.log(req.params);

    const id = req.params.id;

    const userindividual = await Payment.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    console.log(error);
  }
});

//payment delete
router.delete("/paymentdelete/:id", async (req, res) => {
  const id = req.params.id;
  await Payment.findByIdAndRemove(id).exec();
  res.send("Item deleted");
});

//contact insert
router.post("/contactpage", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const message = req.body.message;

  if (!name || !email || !mobile || !message) {
    return res.status(422).json({ error: "plz filled the field propelry" });
  }
  const contact = new Contact({
    name: name,
    email: email,
    mobile: mobile,
    message: message,
  });

  await contact.save();
  res.status(201).json({ message: "contact add successfully" });
});

//monthlyreports

//house, renter, payment

//renter

router.get("/renters", async (req, res) => {
  Renter.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/rooms", async (req, res) => {
  Room.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/payments", async (req, res) => {
  Payment.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/monthlyreports", async (req, res) => {
  Payment.aggregate([
    {
      $lookup: {
        from: "renter",
        // another ko payement ko
        localField: "invoice",
        //ya chai renter ko feild
        foreignField: "name",
        as: "renters_data",
      },
    },
    {
      $unwind: "$renters_data",
    },
    {
      $lookup: {
        from: "room",
        // another ko
        localField: "renters_data.email",
        // room ko
        foreignField: "price",
        as: "renters_data.room_data",
      },
    },
    {
      $unwind: "$renters_data.room_data",
    },
  ]).toArray((err, list) => {
    if (err) throw err;
    console.log(JSON.stringify(list));
    res.send(JSON.stringify(list));
  });
});

//get room count for dashboard , renter count,
router.get("/roomcount", async (req, res) => {
  Room.countDocuments({}, function (err, count) {
    if (err) {
      return handleError(err);
    } //handle possible errors
    console.log(count);
    res.json(count);
  });
});

//renter count,
router.get("/rentercount", async (req, res) => {
  Renter.countDocuments({}, function (err, count) {
    if (err) {
      return handleError(err);
    } //handle possible errors
    console.log(count);
    res.json(count);
  });
});

// const mycount =  Room.find().countDocuments()
// console.log(mycount);

//   housedetails

//get house individual details
router.get("/houseindividualdata/:id", async (req, res) => {
  try {
    console.log(req.params);
    // console.log(req.params);
    const id = req.params.id;

    const userindividual = await Room.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    console.log(error);
  }
});

// house owner data insert
//house owner
router.post("/houseownerpage", async (req, res) => {
  const { name, email, address, phone } = req.body;

  if (!name || !email || !address || !phone) {
    return res.status(422).json({ error: "plz filled the field propelry" });
  }
  const houseowner = new HouseOwner({ name, email, address, phone });
  await houseowner.save();
  res.status(201).json({ message: "House Owner add successfully" });
});

//get house owner data
router.get("/houseownerdata", async (req, res) => {
  HouseOwner.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//update house owner
router.get("/houseownerupdate/:id", async (req, res) => {
  try {
    console.log(req.params);
    // console.log(req.params);
    const id = req.params.id;

    const userindividual = await HouseOwner.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    console.log(error);
  }
});

//house owner delete
router.delete("/houseownerdelete/:id", async (req, res) => {
  const id = req.params.id;
  await HouseOwner.findByIdAndRemove(id).exec();
  res.send("Item deleted");
});

// insert invoice
//
router.post("/invoicepage", async (req, res) => {

  const { invoiceId, date, renter, amount, electricity, water, garbage, status } = req.body;

  if (!invoiceId || !date || !renter || !amount || !electricity ||! water || ! garbage || !status) {
    return res.status(422).json({ error: "plz filled the field propelry" });
  }
  const invoice = new Invoice({ invoiceId, date, renter, amount, electricity,water, garbage, status });
  await invoice.save();
  res.status(201).json({ message: "Invoice add successfully" });
});

//get invoice data
router.get("/invoicedata", async (req, res) => {
  Invoice.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/invoiceuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    // console.log(req.params);

    const id = req.params.id;

    const userindividual = await Invoice.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    console.log(error);
  }
});

// update invoice
router.get("/invoiceupdate/:id", async (req, res) => {
  try {
    console.log(req.params);
    // console.log(req.params);

    const id = req.params.id;

    const userindividual = await Invoice.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    console.log(error);
  }
});

//invoice delete
router.delete("/invoicedelete/:id", async (req, res) => {
  const id = req.params.id;
  await Invoice.findByIdAndRemove(id).exec();
  res.send("Item deleted");
});


// insert data  booking
router.post("/bookingpage",async (req, res) => {
  res.send(req.rootUser);

  const { name, paymentMethod, id, amount, remarks} = req.body;

  if (!name || !paymentMethod || !id || !amount || !remarks) {
    return res.status(422).json({ error: "plz filled the field propelry" });
  }
  const booking = new Booking({ name, paymentMethod, id, amount, remarks });
  await booking.save();
  res.status(201).json({ message: "Booking add successfully" });
});

module.exports = router;
