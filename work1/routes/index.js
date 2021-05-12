var express = require('express');
const { Sequelize, sequelize } = require('../models');
const models = require('../models');

var router = express.Router();

router.get('/', (req, res) => {
	sequelize
		.sync({ force: false })
		.then(() => {
			models.measuretemp_202102
				.findAll({
					attributes: [
						[Sequelize.fn('DISTINCT', Sequelize.col('rid')), 'rid'],
						'group_id',
						'patient_id'
					]
				})
				.then((data) => {
					console.log('index: load patients complete!');
					res.render('index', { users: data });
				});
		})
		.catch((error) => {
			res.render('error', { error });
		});
});

module.exports = router;
