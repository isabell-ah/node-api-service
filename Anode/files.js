const fs = require('fs');

// reading file
// fs.readFile('./docs/blog.txt', (err, data) => {
// 	if (err) {
// 		console.log(err);
// 	}
// 	console.log(data.toString());
// });
// console.log('last line')

// writing file
fs.writeFile('./docs/blog3.txt', 'Hellow my gal', (err, data) => {
	console.log('file was written');
});
