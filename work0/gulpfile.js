const { resolveInclude } = require('ejs');
const gulp = require('gulp');

gulp.task('default', async () => {
	const Sequelize_auto = require('sequelize-auto');
	const sequelize_auto = new Sequelize_auto(
		'test_db',
		'test_user',
		'test_pw',
		{
			host: 'test_host',
			port: '3306',
			dialect: 'mysql'
		}
	);
	sequelize_auto.run((err) => {
		if (err) {
			throw err;
		}
	});
});
// -----> sequelize-cli 커맨드
// sequelize-auto -o "./models" -d chois -h localhost -u root -p 3306 -x tmddyd -e mysql
