// const mongoose = require('mongoose');
// const connectDb = async () => {
// 	try {
// 		await mongoose.connect('mongodb://localhost:27017/example');
// 		const db = mongoose.connection;
// 		db.on('error', console.error.bind(console, 'Db connection error'));
// 		console.log(`Db connected to: ${connection.host}, connection.name`);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// export default connectDb;

const mongoose = require('mongoose');
dbURI = 'mongodb://127.0.0.1:27017/example';
const db = mongoose
	.connect(dbURI)
	.then((result) => console.log('connected to the db'))
	.catch((error) => {
		console.log(error);
	});

module.exports = db;
