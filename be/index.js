const express = require('express');
const userRouter = require('./routes/user.js');
const complainRouter = require('./routes/complain.js');
const vendorRouter = require('./routes/vendor.js');
const billPaymentRouter = require('./routes/billPayment.js')
const cors = require("cors");
require('./models');
const config = require("./utils/config");
const logger = require("./utils/logger");
const app = express();


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", async (req, res) => {
    res.json({message: 'Mobile Payment System Home Page'});
})

app.use('/api/', complainRouter);
app.use('/api/', vendorRouter);
app.use('/api/user/', userRouter);
app.use('/api/bill-payment/', billPaymentRouter);

app.get('*', (req, res) => {
	res.json({message: 'Oops... page not found!'});
});

const PORT = 8080;
app.listen(config.PORT || PORT, (req, res) => {
	logger.info(`Mobile Payment System app is Running on port ${config.PORT || PORT}`);
});

