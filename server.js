const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 8080);

app.get('/*', function(req, res){
	res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// app.get('*', (req, res) => {
//   res.sendFile(`./front-end/dist/index.html`); // load the single view file (angular will handle the page changes on the front-end)
// });

console.log('Console listening');
