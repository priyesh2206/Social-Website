const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
title: {type:String,require:true},
content: {type:String , require:true},
imagePath: { type: String, required: true },
creator:{ type:mongoose.Schema.Types.ObjectId, ref:"User", require:true }
});

module.exports = mongoose.model('Post',postSchema);
