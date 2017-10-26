const express = require('express');
const app = express();

// dist folder is generated after ng build is run on the heroku server
app.use(express.static(__dirname + '/dist'));
//set the port to listen from outside
app.listen(process.env.port || 8080);