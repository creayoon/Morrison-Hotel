var express = require('express');
var app = express();
var fs = require('fs');

// port
var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('server run');
});

// routing
app.get('/', function(req, res) {
	fs.readFile('./dist/index.html', function(error, data) {
		if (error) {
			console.log(error);
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(data);
		}
	});
});

app.use(express.static(__dirname + '/dist'));
