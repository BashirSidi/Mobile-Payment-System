const router = require("express").Router();
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require("../utils/config");
const logger = require('../utils/logger');

const auth = config.auth;

router.get("/active", auth, async (req, res) => {
   try {
    const currentUser = await User.findById(req.userId)
    return res.json(currentUser)
   } catch (error) {
       res.status(404).json({
           msg: "Something wrong",
           err: error
       })
   }
});


router.get('/getUsers',  async (req, res) => {
    // console.log(req.userId);
    try {
        const allUsers = await User.find();
        if (!allUsers) return res.status(400).json({
            msg: "No users found"
        });
        return res.status(200).json(allUsers);
    } catch (err) {
        logger.info("Something Wrong " + err)
    }
});

router.post('/register', async (req, res) => {
    const {
        fullName,
        phoneNumber,
        username,
        password
    } = req.body
    try {
        const findUser = await User.findOne({
            username: username
        });
        if (findUser) return res.status(401).json({ msg: "User already exist", success: false});
        const newUser = new User({
            fullName,
            phoneNumber,
            username,
            password
        });
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash
        const user = await newUser.save();
        return res.status(200).json(user);
    } catch (err) {
        res.status(401).send("Something Went Wrong " + err);
    }
});

router.post('/login', async (req, res) => {
    const {
        username,
        password
    } = req.body;
    
    try {
        const user = await User.findOne({
            username: username
        })
        if (!user) return res.status(400).json("You're not a registered user!");
        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json("Incorrect password!");
        //User match
        const payload = {
            id: user.id,
            username: user.username
        };
        //sign token
        const token = await jwt.sign(payload, process.env.screteJWT, {
            expiresIn: '1h'
        });
        res.json({
            success: true,
            token: 'Bearer ' + token
        });
    } catch (err) {
        console.log("error", err)
        res.status(401).json("Something Went Wrong " + err);
    }
});

module.exports = router;