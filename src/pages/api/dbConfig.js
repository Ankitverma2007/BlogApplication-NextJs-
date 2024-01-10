const mysql = require('mysql');

// Create a database connection
const DbConnect = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '12345',
	database: 'blogs',
});

// Connect to the database
DbConnect.connect((err) => {
	if (err) {
		console.error('Error connecting to the database: ' + err.stack);
		return;
	}
	console.log('Connected to the database with id ' + DbConnect.threadId);
});

// Export a function to query the database
module.exports = {
	query: (sql, values) => {
		return new Promise((resolve, reject) => {
			DbConnect.query(sql, values, (err, results) => {
				if (err) {
					return reject(err);
				}
				resolve(results);
			});
		});
	},
};