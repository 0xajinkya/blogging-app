const router = require("express").Router();
const Category = require("../models/Category");

router.post("/createCat" , async(req,res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (error) {
        res.status(500).json(err);
    }
})

router.get("/getCat" , async(req,res) => {
    try {
        const Cats = await Category.find();
        res.status(200).json(Cats);
    } catch (error) {
        res.status(500).json(err);
    }
})

module.exports = router
