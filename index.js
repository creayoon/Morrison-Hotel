var express = require('express');
var app = express();
var fs = require('fs');

// port
app.listen(3000, function() {
	console.log('server run');
});

// routing
app.get('/', function(req, res) {
	fs.readFile('./public/index.html', function(error, data) {
		if (error) {
			console.log(error);
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(data);
		}
	});
});
 No newline at end of file