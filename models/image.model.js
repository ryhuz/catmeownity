const mongoose = require('mongoose');
const { Schema } = mongoose;

const Image = mongoose.model("Image", Schema({
    imageURL: String
}));

module.exports = Image;