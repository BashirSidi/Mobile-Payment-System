const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complainSchema = new Schema({
    issue: {
        type: String,
        required: true
    }
})

const complain = mongoose.model('Complains', complainSchema);

module.exports = complain;