require('dotenv').config();
const mongoose = require('mongoose')
var express = require('express');
var app = express();
var path = require('path');
const fs = require('fs')
const fsPromises = require('fs').promises;
const PORT  = process.env.PORT || 5000
const connectDB = require('./config/dbConn')


const mysql = require('mysql')
const bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())


//mysql

const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '4lizzy@School',
    database: 'smarthr'
})

//get all
app.get('/tstaff', (req, res)=>{
  pool.getConnection((err, connection)=>{
       if(err) throw err
       console.log(`connected as id ${connection.threadId}`)

       //queries
       connection.query('SELECT * from staff', (err, rows)=>{
          connection.release()

          if(!err){
            res.send(rows)
          }else{
            console.log(err)
          }
       })
  })
})
 

//specific
app.get('/tstaff/:id', (req, res)=>{
  pool.getConnection((err, connection)=>{
       if(err) throw err
       console.log(`connected as id ${connection.threadId}`)

       //queries
       connection.query('SELECT * from staff WHERE id = ?', [req.params.id], (err, rows)=>{
          connection.release()

          if(!err){
            res.send(rows)
          }else{
            console.log(err)
          }
       })
  })
})


//delte 
app.delete('/tstaff/:id', (req, res)=>{
  pool.getConnection((err, connection)=>{
       if(err) throw err
       console.log(`connected as id ${connection.threadId}`)

       //queries
       connection.query('DELETE from staff WHERE id = ?', [req.params.id], (err, rows)=>{
          connection.release()

          if(!err){
            res.send(`The record ${req.params.id} removed`)
          }else{
            console.log(err)
          }
       })
  })
})

//add
app.post('/tstaff', (req, res)=>{
  pool.getConnection((err, connection)=>{
       if(err) throw err
       console.log(`connected as id ${connection.threadId}`)

       const params = req.body

       connection.query('INSERT INTO staff SET ?', params , (err, rows)=>{
          connection.release()

          if(!err){
            res.send(`The record ${req.name} has been added`)
          }else{
            console.log(err)
          }
       })
  })
})

//update
app.put('/tstaff', (req, res)=>{
  pool.getConnection((err, connection)=>{
       if(err) throw err
       console.log(`connected as id ${connection.threadId}`)

    const {id, name, mail, role, stack , completedProjects, reportingDays, p2p} = req.body
       connection.query('UPDATE staff SET name = ? WHERE staff.id = ?', [name, id] , (err, rows)=>{
          connection.release()
          if(!err){
            res.send(`The record ${name} has been updated`)
          }else{
            console.log(err)
          }
       })
  })
})




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


