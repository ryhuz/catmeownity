const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    homeLocation: { type: Schema.Types.ObjectId, ref: 'Location' },
    trackedLocations: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
    favourites: [{ type: Schema.Types.ObjectId, ref: 'Cat' }],
    descForCats: [{type: Schema.Types.ObjectId, ref: 'Desc'}],
    image: String,
    // userType: 
});

const User = mongoose.model("User", userSchema);

module.exports = User;