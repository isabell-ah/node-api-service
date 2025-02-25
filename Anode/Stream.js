// streams
// start using data , before it has finished loading

const fs = require('fs');
const readStrem = fs.createReadStream('./docs/blog3.txt');

readStrem.on('data', (chunk) => {
	console.log('-----new Chunk......');
	console.log(chunk.toString());
});
