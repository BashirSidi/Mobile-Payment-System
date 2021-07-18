const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const vendor = mongoose.model('Vendors', vendorSchema);

module.exports = vendor;