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
      console.log(typeof JSON.parse(response.body));
      const vendors = JSON.parse(response.body)
      const vend = vendors.data.map((ven) => ven.name)
      const names = new Set(vend);
      logger.info("vendors",[...names])
      res.json(JSON.parse(response.body))
    });
});

router.post("/create-bill-payment", config.auth, async (req, res) => {
   const currentUser = await User.findById(req.userId)
    logger.info("USER",currentUser)
    logger.info("test", "+" + "234" +currentUser.phoneNumber)

    var options = {
    'method': 'POST', 
    'url': `${process.env.BASE_API_URL}/bills`,
    'headers': {
    'Authorization': `Bearer ${process.env.SEC_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"country":"NG","customer":"+" + "234" +currentUser.phoneNumber,"amount":500,"recurrence":"ONCE","type":"AIRTIME","reference":"9300049404444"})
      
    };

    request(options, function (error, response) { 
      if (error) throw new Error(error);
      console.log(typeof JSON.parse(response.body));
      res.json(JSON.parse(response.body))
    });
});


module.exports = router;