const data = {
    user : require('../model/staff.json'),
    setUSer : (data) => {this.user = data}
}

const fsPromises = require('fs').promises
const path = require('path')
const staff = require('../model/staff')


const handleNewStaff = async (req, res) =>{
    const {user} = req.body
    if(!user) return res.status(400).json({'message' : 'username and pass requiredd'});
    ///dup
    const duplicate = await staff.findOne ({name: user}).exec();
    if(duplicate) return res.sendStatus(409);
    try{
        
        const result = {
                'name' : user , 
            };

            console.log(result.name)

            res.status(201).json({'success':`New User ${user} created`}) } catch (err) {
                res.status(500).json({'message' : err.message})
            }
}

module.exports = {handleNewStaff}
