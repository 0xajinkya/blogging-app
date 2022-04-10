const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
var jwt = require("jsonwebtoken");
const JWT_SECRET = "FCUKHACKERS";



//Update
router.put("/:id", async (req, res) => {
    if(req.body.authToken){
        
    }
    try {
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router