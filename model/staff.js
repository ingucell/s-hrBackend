const { stringify } = require("uuid");

const mongoose = require('mongoose');
const Schema  = mongoose.Schema

const employeeSchema = new Schema({
    name: {
        type: String, 
        required: true
    }
    ,
    mail: {
        type: String, 
        required: true
    }
    ,
    role: {
        type: String, 
        required: true
    },
    stack: {
        type: String, 
        required: true
    },
    projectsCompleted: {
        type: String, 
        required: true
    },
    reportingDays: {
        type: String, 
        required: true
    }
    ,
    p2p: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('Staff', employeeSchema)