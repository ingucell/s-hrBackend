const staff = require('../model/staff')


const getAllStaff = (req, res) =>{
    res.json(staff.name);
}

const createNewStaff = async (req, res) =>{
     const { name, mail, role, stack , projectsCompleted, reportingDays, p2p} = req.body

    if(!name || !mail) return res.status(400).json({'message' : 'name required'});

    ///dup
    const duplicate = await staff.findOne ({name: name}).exec();
    if(duplicate) return res.sendStatus(409);
    try{
        //create and store new user
            const result = await staff.create({
                "name" : name , 
                "mail" : mail,
                "role" : role,
                "stack" : stack, 
                "projectsCompleted" : projectsCompleted,
                "reportingDays" : reportingDays,
                "p2p" : p2p
            });

            console.log(result)

            res.status(201).json({'success':`New User ${result.name} created`}) } 
            catch (err) {
                res.status(500).json({'message' : err.message})
            }
     //res.send(`The Contact ${newStaff.name} has been created`)
     res.status(201).json(staff)
}


 
const getEmployees = (req, res) => {
    
    res.json({"message" : "get employee spec"})
}



module.exports = {
      getAllStaff,
      createNewStaff,
      getEmployees
}