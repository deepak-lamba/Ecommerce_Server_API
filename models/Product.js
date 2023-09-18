const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    price: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
}, {});

const Product = mongoose.model('Product', productSchema);
module.exports = {Product};