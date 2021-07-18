const router = require("express").Router();
const Complain = require('../models/complain');
const logger = require('../utils/logger');

router.get('/complains', async (req, res) => {
    try {
        const complains = await Complain.find();
        if (!complains) return res.status(400).json({
            msg: "No complain found!"
        });
        return res.status(200).json(complains);
    } catch (err) {
        logger.info("Something Wrong " + err)
    }
});

router.post('/complain', async (req, res) => {
    try {
        const newComplain = await Complain.create(req.body);
        res.status(201).json(newComplain);
    } catch (e) {
        logger.info(e);
    }
});

router.put('/complain/:id', async (req, res) => {
    try {
		const id = req.params.id;
		const updatedComplain = await Complain.findByIdAndUpdate(id, req.body, { new: true });
		res.json(updatedComplain);
	} catch (e) {
		logger.info(e);
	}
});

router.delete('/complain/:id', async (req, res) => {
    try {
		const id = req.params.id;
		const deletedComplain = await Complain.findByIdAndRemove(id);
		res.status(204).end();
	} catch (e) {
		logger.info(e);
	}
})

module.exports = router;