const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    tracked: [{ type: Schema.Types.ObjectId, ref: 'Location', required: true }],
    favorite: [{ type: Schema.Types.ObjectId, ref: 'Cat', required: true }]
    // userType: 
});

const User = mongoose.model("User", userSchema);

module.exports = User;