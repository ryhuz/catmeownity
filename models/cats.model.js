let mongoose = require('mongoose');
let { Schema } = mongoose;

const feedingSchema = new Schema({
    time: { type: Date, required: true },
    byUser: { type: Schema.Types.ObjectId, required: true },
})

let gender = ['Male', 'Female', 'Not Sure'];

const catSchema = new Schema({
    names: [{ type: String, required: true }],
    locations: [
        {
            location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
            description: { type: String, required: true }
        }
    ],
    breed: String,
    gender: { type: String, enum: gender, default: gender[2], },
    sterilised: { type: Boolean, default: false },
    colour: { type: String },
    desc: String,
    fed: [feedingSchema],
    photos: [String],
    missing: { type: Boolean, default: false },
    duplicate: { type: Boolean, default: false },
})

const Cat = mongoose.model('Cat', catSchema);
module.exports = Cat;