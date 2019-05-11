const path = require('path');
const express = require('express');
const bodyParser= require("body-parser");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user")
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://losser_Titu:" + process.env.MONGO_ATLAS_PW +"@cluster0-hqdmz.mongodb.net/node-angular?retryWrites=true"
,{ useNewUrlParser: true})
.then(() => {
  console.log("connected to data base");
})
.catch(() => {
  console.log("connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-requested-With,Content-Type,application/json,Accept,Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,PUT,DELETE,OPTIONS");


next();

});
app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);


 module.exports = app;


//app.get('/',(req,res)=>{
  //console.log("It is Working")
  //res.send("THIS IS EXPRESS")
//})

//server.listen(3000,()=>{
  //console.log("WORKING")
//})
