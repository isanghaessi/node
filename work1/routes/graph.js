const express = require('express');
const { Op } = require('sequelize');
const { sequelize } = require('../models');
const models = require('../models');
const moment = require('moment');
const router = express.Router();

router.get('/', (req, res) => {
	const group_id = req.query['group_id_input'];
	const patient_id = req.query['patient_id_input'];
	const from =
		req.query['from_input'] != '' ? req.query['from_input'] : new Date(0);
	const to = req.query['to_input'] != '' ? req.query['to_input'] : Date.now();

	let date = [];
	let temp = [];

	sequelize
		.sync({ force: false })
		.then(() => {
			models.measuretemp_202102
				.findAll({
					where: {
						group_id: group_id,
						patient_id: patient_id,
						[Op.and]: [
							{ reg_date: { [Op.gte]: from } },
							{ reg_date: { [Op.lte]: to } }
						]
					}
				})
				.then((data) => {
					console.log('load data completed');
					res.render('graph', { data: JSON.stringify(data) });
				});
		})
		.catch((err) => {
			console.error(err);
		});
});

module.exports = router;
