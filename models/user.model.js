const mongoose = require('mongoose');
const { Schema } = mongoose;

var GFS = mongoose.model("GFS", new Schema({}, { strict: false }), "photo.files");

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    tracked: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Cat' }],
    imageID: { type: Schema.Types.ObjectId, ref: 'GFS' },
    // userType: 
});

const User = mongoose.model("User", userSchema);

module.exports = User;