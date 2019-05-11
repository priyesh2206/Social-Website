const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    const DecodeToken= jwt.verify(token ,process.env.JWT_KEY);
    req.userData = {email: DecodeToken.email, userId: DecodeToken.userId};
    next();
  }
  catch (error) {
    console.log(error)
    res.status(401).json({message: "You are Not Authenicated!"});
  }
};
