const express = require("express");

const CheckAuth = require("../middleware/check-auth");

const ExtractFile = require("../middleware/file")

const PostController = require("../contollers/post");

const router = express.Router();


router.post("", CheckAuth , ExtractFile, PostController.CreatePost);

router.put('/:id',CheckAuth,ExtractFile,PostController.UpdatePosts);

router.get("",PostController.GetPosts );

router.get('/:id',PostController.GetPost);

router.delete('/:id',CheckAuth,PostController.deletePosts);

module.exports = router;
