const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        Unique: true
    },
    desc:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    categories:{
        type: Array,
        required: false,
    },
    photo:{
        type: String,
        default:""
    }
},{timestamps:true});

module.exports = mongoose.model('Post',PostSchema);