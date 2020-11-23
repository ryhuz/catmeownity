const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    tracked: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Cat' }],
    image: String,
    // userType: 
});

const User = mongoose.model("User", userSchema);

module.exports = User;