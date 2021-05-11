const Express = require('express');
const moment = require('moment');
const path = require('path');
const morgan = require('morgan');

const { sequelize } = require('./models');
const models = require('./models');

let date = [];
let temp = [];

const app = Express();
app.set('port', 5000);
app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.get('/', async (req, res) => {
	if (date.length === 0 || temp.length === 0) {
		await sequelize
			.sync({ force: false })
			.then(async () => {
				console.log('success sync database');
				await models.measuretemp_202102
					.findAll({
						where: {
							patient_id: 'pinpin001'
						}
					})
					.then(async (d) => {
						for (const _d of d) {
							date.push(
								moment(_d['dataValues']['reg_date']).format(
									'DD-MM hh:mm'
								)
							);
							temp.push(_d['dataValues']['temp']);
						}
						console.log(d);
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

app.listen(app.get('port'), () => {
	console.log(app.get('port'), ' listening ...');
});
