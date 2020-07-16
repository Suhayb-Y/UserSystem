const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        index: true,
        unique: true,
        trim: true,
        required: [true, "Email is a required field!"]
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Name is a required field!"]
    },
    password: {
        type: String,
        required: [true, "Password is a required field!"]
    },
    rank: {
        type: String,
        default: 'customer'
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;