const mongoose = require('mongoose'); 
const logger = require('../utils/logger.js')
const config = require('../utils/config.js')

const url = config.DB_URL

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        logger.info('Database connected successfully...')
    })
    .catch( (err) => {
        logger.info(`Error connecting to the database. \n${err}`);
    })

mongoose.Promise = Promise;
module.exports.User = require('./user');
module.exports.Vendor = require('./vendors')
module.exports.Complain = require('./complain');