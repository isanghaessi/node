const express = require('express');
const { Op } = require('sequelize');
const { Sequelize, sequelize } = require('../models');
const models = require('../models');

const router = express.Router();

router.get('/search', (req, res) => {
	input = req.query['search_input'];
	sequelize
		.sync({ force: false })
		.then(() => {
			models.measuretemp_202102
				.findAll({
					attributes: [
						[
							Sequelize.fn(
								'DISTINCT',
								Sequelize.col('patient_id')
							),
							'patient_id'
						],
						'group_id'
					],
					where: {
						[Op.or]: [
							{ rid: { [Op.like]: '%' + input + '%' } },
							{ group_id: { [Op.like]: '%' + input + '%' } },
							{ patient_id: { [Op.like]: '%' + input + '%' } }
						]
					},
					order: [
						['group_id', 'ASC'],
						['patient_id', 'ASC']
					]
				})
				.then((data) => {
					console.log('index: search patients complete!');
					res.render('index', { users: data });
				})
				.catch((error) => {
					res.render('error', { error });
				});
		})
		.catch((error) => {
			res.render('error', { error });
		});
});

router.get('/', (req, res) => {
	res.render('index', { users: [] });
});

module.exports = router;
