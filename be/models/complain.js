const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complainSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

const complain = mongoose.model('Complains', complainSchema);

module.exports = complain;