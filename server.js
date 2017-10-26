const express = require('express');
const app = express();

app.use(express.static(__dirname, '/dist'));
app.listen(process.env.port || 8080);