const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        mimeType: {
            type: String,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }, { timestamps: true }
);

module.exports = mongoose.model('Image', imageSchema);