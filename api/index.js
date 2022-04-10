// eslint-disable-next-line
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
// const authRoute = require("./routes/auth");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected To Mongo"))
.catch(err => console.log(err));

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "images")
    }, filename: (req,file,cb) =>{
        cb(null, req.body.name);
    }
})

const upload = multer({storage : storage});
app.post("/api/upload", upload.single("file"),(req,res) => {
    res.status(200).json("File Has Been Uploaded");
})

app.use("/api/auth", require("./routes/auth"))
app.use("/api/posts", require("./routes/posts"))
app.use("/api/categories", require("./routes/categories"))


app.listen("5000", () => {
    console.log("Backend is running.");
})