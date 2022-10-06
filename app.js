require('dotenv').config();
const mongoose = require('mongoose')
var express = require('express');
var app = express();
var path = require('path');
const fs = require('fs')
const fsPromises = require('fs').promises;
const PORT  = process.env.PORT || 5000
const connectDB = require('./config/dbConn')
const cors = require('cors')
const logger = require('./logger/logger')



app.use(cors({
  origin: '*',
  methods: ['GET', "POST", "PUT", "DELETE"]
}))




logger.info('text info');
logger.warn('text warn');
logger.error('text error')



const mysql = require('mysql')
const bodyparser = require('body-parser');
const { application } = require('express');

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


//create people
app.post('/fontend', async(req, res) => {

  pool.getConnection((err, connection)=>{
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    const params = req.body
    console.log(req.body)

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


//available people

app.get('/avlist', async(req, res)=>{
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

//id by mail
app.post('/ov', async (req, res)=>{
  pool.getConnection((err, connection)=>{
       if(err) throw err
       //console.log(`connected as id ${connection.threadId}`)
       const {mail} = req.body
      
       
         console.log(req.body)
      connection.query('SELECT * from `staff` WHERE staff.mail = ?', mail ,  (err, rows)=>{
       connection.release()
          if(!err){

         //   console.log(rows, "Response from backend")

            res.status(200).json({status:1, data:rows, statusCode:200});

        //  res.send(rows)
          //  res.send(rows.name)
           //  res.send(rows)
           // res.send(rows)
          //res.status(200).json({status:1, data:mail, statusCode:200})
          // res.status(200).json({status:1, data:mail, statusCode:200});
          }else{
            return res.end({status:0, message:"exception occured", statusCode:400});
          }
       })
  }) 
})


//delte 
app.post('/del', (req, res)=>{
  pool.getConnection((err, connection)=>{
       if(err) throw err
       console.log(`connected as id ${connection.threadId}`)

      const { mail } = req.body;

      console.log(typeof mail)

       //queries
       connection.query('DELETE from `staff` WHERE staff.mail = ?', mail , (err, rows)=>{
          connection.release()

          if(!err){
            res.send(`The record ${mail} removed`)
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



mongoose.connection.once('open', ()=>{
  console.log('Connected to Mongo');
  app.listen(PORT, console.log(`you are listening on ${PORT}`))
})


