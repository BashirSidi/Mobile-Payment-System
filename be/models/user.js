const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
// const { model } = require('mongoose');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    },
    isAdmin: {type: String, default: 'customer'}
})

const user = mongoose.model('Users', userSchema);

module.exports = user;