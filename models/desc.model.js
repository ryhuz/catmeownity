let mongoose = require('mongoose');
let { Schema } = mongoose;

const descSchema = new Schema({
    comment: { type: String, required: true },
    reference: { type: Schema.Types.ObjectId, required: true, ref: 'referenceModal' },
    referenceModal: {
        type: String,
        required: true,
        enum: ['Cat', 'User'],
    }
}, {timestamps: true})

const Desc = mongoose.model('Desc', descSchema);
module.exports = Desc;