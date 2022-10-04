const staff = require('../model/staff')

//get all staff
const getAllStaff = (req, res) =>{
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
      }



//create new staff
const createNewStaff = async (req, res) =>{

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
      }



 
const getEmployees = (req, res) => {
    
    res.json({"message" : "get employee spec"})
}



module.exports = {
      getAllStaff,
      createNewStaff,
      getEmployees
}