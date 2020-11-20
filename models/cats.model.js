let mongoose = require('mongoose');
let { Schema } = mongoose;

const feedingSchema = new Schema({
    time: { type: Date, required: true },
    byUser: { type: Schema.Types.ObjectId, required: true },
})

const catSchema = new Schema({
    names: [{ type: String, required: true }],
    locations: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    breed: { type: String, required: true },
    color: [{ type: String }],
    desc: String,
    fed: [feedingSchema],
    photos: [String],
    missing: { type: Boolean, default: false },
    duplicate: { type: Boolean, default: false },
})

const Cat = mongoose.model('Cat', catSchema);
module.exports = Cat;