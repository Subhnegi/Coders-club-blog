const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    key:{
        type: 'string'
    },
    name:{
        type: String,
        required: true
    }
},{timestamps:true});

module.exports = mongoose.model('Category',CategorySchema);