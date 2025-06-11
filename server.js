const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, "public")));


// Database Connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to Database: ${mongoose.connection.name}.`);
});``

// Parse the form body data
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

// Require Controller
const planetCtrl = require('./controlllers/planets')
app.use('/', planetCtrl)

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});