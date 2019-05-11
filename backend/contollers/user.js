const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User= require("../models/user");


exports.CreateUSer = (req ,res, next)=>{
  bcrypt.hash(req.body.password,10)
  .then(hash => {
   const user = new User({
     email:req.body.email,
     password: hash
   });
   user.save()
   .then( result =>{
     res.status(201).json({message:"user created!!" , result:result });
   })
   .catch(err =>{
     res.status(500).json({
         message:"Invalid Authentication credentials!!"
     })
   })
  });
}

exports.UserLogin = (req,res,next) =>{

  let FetchUser;
  User.findOne( {email: req.body.email})
  .then(user =>{
    if (!user){
      return res.status(401).json({message: "auth Falied!"});
    }
    FetchUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
   if(!result){
    return res.status(401).json({message: "auth Falied!"});
   }

   const token =jwt.sign({email:FetchUser.email , userId:FetchUser._id},
    process.env.JWT_KEY,{
      expiresIn: "1h"}
      );

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId:FetchUser._id
      })
  })
  .catch(err =>{
    return res.status(401).json({message: "Invalid Authentication credentials!!"});
  });
}
