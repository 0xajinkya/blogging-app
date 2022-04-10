const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    desc:{
        type: String,
        required: true,
        unique: false
    },
    photo:{
        type: String,
        required: false,
        default: null
    },
    username:{
        type: String,
        required: true
    },
    categories:{
        type: Array,
        required: false,
        default: "General"
    },
    userid:{
        type: String,
        required: true
    }
    // },
    // timestamps: true
})

module.exports = mongoose.model('Post', PostSchema)