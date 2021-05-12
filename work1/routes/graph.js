var express = require('express');
const { sequelize } = require('../models');
const models = require('../models');
const moment = require('moment');
var router = express.Router();

let date = [];
let temp = [];

router.get('/', async (req, res) => {
	if (date.length === 0 || temp.length === 0) {
		await sequelize
			.sync({ force: false })
			.then(async () => {
				await models.measuretemp_202102
					.findAll({
						where: {
							patient_id: 'pinpin001'
						}
					})
					.then(async (d) => {
						for (const _d of d) {
							date.push(
								// moment(_d['dataValues']['reg_date']).format(
								// 	'DD-MM hh:mm'
								// )
								_d['dataValues']['reg_date']
							);
							temp.push(_d['dataValues']['temp']);
						}
						console.log(date, temp);
						await console.log('load pinpin001 data completed');
					});
			})
			.catch((err) => {
				console.error(err);
			});
	}
	console.log('rendering...');
	return res.render('index', {
		date: JSON.stringify(date),
		temp: JSON.stringify(temp)
	});
});

module.exports = router;
