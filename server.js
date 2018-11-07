const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// Init App
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://dima:dimapov19@ds253243.mlab.com:53243/users', () => console.log('connected to DB'))
mongoose.Promise = global.Promise;

app.use(express.static('public'))

app.use(bodyParser.json());

// Init Routes
app.use('/api', require('./routes/api'));

// Error middleware
app.use((err, req, res, next) => {
  res.send({error: err.message});
})

// Listen for request
app.listen(process.env.port || 4000, () => {
  console.log('listening for request');
});

