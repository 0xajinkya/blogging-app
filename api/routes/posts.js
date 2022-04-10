const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const fetchpost = require("../middleware/fetchpost");
const Post = require("../models/Post");
const { findById } = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET;



//Create Post

router.post('/createpost', fetchuser, [
    body('title', 'Enter a Title').isLength({ min: 7 }),
    body('desc', 'Enter a minimum 60 word desc').isLength({ min: 100 }),
], async (req, res) => {
    // const user = await User.findById(req.user.id);;
    // req.body.username = user.username;
    // req.body.userid = req.user.id;
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        const pdata = {
            post: {
                id: savedPost.id
            }
        }
        const postToken = jwt.sign(pdata, JWT_SECRET);
        console.log(postToken);
        res.status(200).json(postToken);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Update Post
router.put('/updatepost/:id', fetchuser, [
    body('title', 'Enter a New Title').isLength({ min: 7 }),
    body('desc', 'Enter a minimum 60 word desc').isLength({ min: 100 }),
], async (req, res) => {
    // const post = await Post.findById(req.params.id)
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, { title: req.body.title, desc: req.body.desc }, { new: true })
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Delete Post

router.delete('/deletepost/:id', fetchuser, async (req, res) => {
    // const userId = req.user.id;
    const postId = req.params.id;
    try {
        
        // const user = await User.findById(userId);
        try {
            const post = await Post.findByIdAndDelete(postId);
            console.log(post);
            res.send(post)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
    catch (err) {
        res.status(404).send("User Not Found");
    }
})


//Get Post
router.get('/getallposts', fetchuser, [
    body('title', 'Enter a New Title').isLength({ min: 7 }),
    body('desc', 'Enter a minimum 60 word desc').isLength({ min: 100 }),
], async (req, res) => {
    const user = await User.findById(req.user.id);
    req.body.username = user.username;
    try {
        // const post = await Post.findByIdAndUpdate(req.user.id, {title : req.body.title, desc : req.body.desc } , { new : true })
        const post = await Post.find();
        const spost = post[0];
        const uarray = [];
        for (let index = 0; index < post.length; index++) {
            if (spost.userid === req.user.id) {
                uarray.push(spost);
            }
        }

        res.status(200).json(uarray);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// //Get All Posts
// router.get('/', async (req, res) => {
//     try {
//         const post = await Post.find();
//         res.status(200).json(post);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })

//Get Post By Category Else Fetch All
router.get('/', async (req, res) => {
    const username = req.query.user;
    const category = req.query.cat;
    try {
        if(username){
        const post = await Post.find({ username});
        res.status(200).json(post);
        }
        else if(category){
            const post = await Post.find({ category });
            res.status(200).json(post);
        }
        else{
            const post = await Post.find();
        res.status(200).json(post);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Get Post By Id
router.get('/post/:id', async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        console.log(post)
        if (!post) { return res.status(404).send("Not Found") }
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Get Post By Username
router.get('/uPost/:username', async (req, res) => {
    try {
        const username = req.params.username;
        console.log(username);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router