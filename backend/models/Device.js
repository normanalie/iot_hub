const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema(
    {
        name: { type: String },
        sn: { type: String, required: true },
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
        state: {
            r: { type: Number },
            g: { type: Number },
            b: { type: Number },
            brightness: { type: Number },
            is_on: { type: Number },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Device', deviceSchema);
