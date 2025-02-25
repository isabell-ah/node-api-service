const express = require('express');
const dtb = require('./config/db');
const app = express();
port = 2000;

const start = async () => {
	try {
		// dtb();
		app.listen(port, () => {
			console.log(`Server is running on port  ${port}`);
		});
	} catch (err) {
		console.log(err, 'Error connecting to Server');
		process.exit(1);
	}
};
start();
