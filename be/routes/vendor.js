const router = require("express").Router();
const Vendor = require('../models/vendors');
const logger = require('../utils/logger');

router.get('/vendors', async (req, res) => {
    try {
        const vendors = await Vendor.find();
        if (!vendors) return res.status(400).json({
            msg: "No vendor found!"
        });
        return res.status(200).json(complains);
    } catch (err) {
        logger.info("Something Wrong " + err)
    }
});

router.post('/vendor', async (req, res) => {
    try {
        const newVendor = await Vendor.create(req.body);
        res.status(201).json(newVendor);
    } catch (e) {
        logger.info(e);
    }
});

router.put('/vendor/:id', async (req, res) => {
    try {
		const id = req.params.id;
		const updatedVendor = await Vendor.findByIdAndUpdate(id, req.body, { new: true });
		res.json(updatedVendor);
	} catch (e) {
		logger.info(e);
	}
});

router.delete('/vendor/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const deletedVendor = await Vendor.findByIdAndRemove(id);
		res.status(204).end();
	} catch (e) {
		logger.info(e);
	}
});

module.exports = router;