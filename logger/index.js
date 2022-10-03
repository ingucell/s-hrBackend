const devlogger = require('./logger')
const prod = require('./prodLogger')

let logger = null;
if(!process.env.NODE_ENV === 'development'){
    logger = devlogger;
}else{
     logger = prod;
}   

module.exports = devlogger;