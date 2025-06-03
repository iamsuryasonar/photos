const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            minlength: 6,
            maxlength: 255,
            index: true,
        },
        password: {
            type: String,
            required: false,
            minlength: 6,
            maxlength: 255,
            select: false
        }
    },
);

module.exports = mongoose.model('User', userSchema);