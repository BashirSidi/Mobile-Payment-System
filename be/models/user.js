const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { model } = require('mongoose');

const userSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        unique: false
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    }
})

const user = mongoose.model('Users', userSchema);

module.exports = user;