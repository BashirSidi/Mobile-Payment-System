const router = require("express").Router();
const logger = require('../utils/logger');
const config = require('../utils/config')
const request = require('request');

router.get("/get-all-vendors", async (req, res) => {
  const options = {
    'method': 'GET',
    'url': `${process.env.BASE_API_URL}/bill-categories`,
    'headers': {
      'Authorization': `Bearer ${process.env.SEC_KEY}`,
      'Content-Type': 'application/json'
    }
  }; 
  request(options, function (error, response) { 
    if (error) throw new Error(error);
      const vendors = JSON.parse(response.body)
      const vend = vendors.data.map((ven) => ven.name)
      const names = new Set(vend);
      logger.info("vendors",[...names])
      res.json([...names])
    });
});

router.post("/create-bill-payment", config.auth, async (req, res) => {
   const currentUser = await User.findById(req.userId)
    logger.info("USER",currentUser)
    const customerNumber = req.body.number;
    const amount = req.body.amount;

    var options = {
    'method': 'POST', 
    'url': `${process.env.BASE_API_URL}/bills`,
    'headers': {
    'Authorization': `Bearer ${process.env.SEC_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"country":"NG","customer":customerNumber,"amount":amount,"recurrence":"ONCE","type":"AIRTIME","reference":"9300049404444"})
      
    };

    request(options, function (error, response) { 
      if (error) throw new Error(error);
      console.log(typeof JSON.parse(response.body));
      res.json(JSON.parse(response.body))
    });
});

router.get('/history', config.auth, async(req, res) => {
  var options = {
  'method': 'GET',
  'url': '{{BASE_API_URL}}/bills',
  'headers': {
    'Authorization': `Bearer ${process.env.SEC_KEY}`,
    'Content-Type': 'application/json'
  }
  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    logger.info(response.body);
    res.json(response.body)
  });

})


module.exports = router; //trying to figure out something