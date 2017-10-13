//Starting pointof application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router');
const app = express();

/*---------*/
//DB setup//
/*---------*/
mongoose.connect('mongodb://localhost:auth/auth');
//

/*---------*/
//App setup//
/*---------*/
//Contains Express application setup

//Logging
app.use(morgan('combined'));

//Data parser
app.use(bodyParser.json({ type: '*/*'}));

//Route all requests
router(app);

/*---------*/
//Server Setup//
/*---------*/
//Contains code to interact with outside world
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
