require('dotenv').config();
const mongoose = require('mongoose')
var express = require('express');
var app = express();
var path = require('path');
const fs = require('fs')
const fsPromises = require('fs').promises;
const PORT  = process.env.PORT || 5000
const connectDB = require('./config/dbConn')



//connect to Mongo
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/staff', require('./routes/api/staff_route'))
app.use('/register', require('./routes/api/regsiter'))

app.get('/f', (req, res)=>{
  res.send('dfdf')
})

mongoose.connection.once('open', ()=>{
  console.log('Connected to Mongo');
  app.listen(PORT, console.log(`you are listening on ${PORT}`))
})


