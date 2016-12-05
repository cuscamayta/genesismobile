'use strict';

module.exports = function (app) {
	app.use('/settings', require('./server/routes/settings'));	
	app.use('/permits', require('./server/routes/permits'));
	app.use('/useroffices', require('./server/routes/useroffices'));
 	app.use('/users', require('./server/routes/users'));
	app.use('/roles', require('./server/routes/roles'));
	app.use('/modules', require('./server/routes/modules'));
	app.use('/pages', require('./server/routes/pages'));
	app.use('/destinations', require('./server/routes/destinations'));
	app.use('/orderbooks', require('./server/routes/orderbooks'));
	app.use('/salesbooks', require('./server/routes/salesbooks'));
	app.use('/invoices', require('./server/routes/invoices'));
	app.use('/offices', require('./server/routes/offices'));
	app.use('/sales', require('./server/routes/sales'));
	app.use('/security', require('./server/routes/security'));
};