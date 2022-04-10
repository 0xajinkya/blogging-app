const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const Post = require("../models/Post");
const { findById } = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET;


//Register
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        // localStorage.setItem("auth",authToken);
        res.status(200).json(authToken);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Login
router.post("/login",
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        try {
            let user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ error: "User Doesn't Exist" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);

            if (!passwordCompare) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);


            res.status(200).json(authToken);
        } catch (error) {
            res.status(500).json(error);
        }


    })


//Update User
router.put('/updateuser/:id', fetchuser, [
    body('username', 'Enter Username').exists(),
    body('email', 'Enter Email').isEmail(),
    body('password', 'Enter Password').isAlphanumeric()
], async (req, res) => {
    try {
        // const u = await User.findById(req.user.id);
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const u = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            profilePic: req.body.profilePic? req.body.profilePic:null,
        }
        let user = await User.findOne({ username: u.username });
        let user1 = await User.findOne({ email: u.email });
        if (user || user1) { 
            res.status(400).send("User Already Exists");
        }
        else {
            const user2 = await User.findByIdAndUpdate(req.params.id, { username: u.username, email: u.email, password: u.password, profilePic: req.body.profilePic }, { new: true })
            res.status(200).json(user2);
        }
        // res.status(200).json(user || user1);
    } catch (error) {
        console.error(error.message);
        // res.status(500).send("Internal Server Error");
    }
})

//Delete User

router.delete('/deleteUser', fetchuser, async (req, res) => {

    const userId = req.user.id;
    try {
        // const user = findById(userId);
        try {
            // await Post.deleteMany({username : user.username})
            const user = await User.findByIdAndDelete(userId);
            res.send(user)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
    catch (err) {
        res.status(404).send("User Not Found");
    }
})


//Get User
router.get('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router