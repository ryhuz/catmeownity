const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
    district: { type: Schema.Types.ObjectId, ref: 'District', required: true },
    block: [String],
    street: { type: String, required: true },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;