const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const { sequelize } = require('./models');

var bodyParser = require('body-parser')
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

const authRoutes = require("./routes/auth");

app.use('/auth',authRoutes);
sequelize.authenticate();
module.exports = app