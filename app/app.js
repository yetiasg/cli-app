const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use((req, res) => {
  res.status(404).json({message: "This route does not exist."});
});

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

mongoose.connect(config.database.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  app.listen(config.server.PORT, () => console.log(`Listening on port: ${config.server.PORT}`))
}).catch(err => console.log(err));