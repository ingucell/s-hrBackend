const {format, createLogger, transports, stack} = require('winston')
const {timestamp, errors, json} = format



const log = createLogger({
    level: 'debug',
    format : 
    format.combine(timestamp(), 
    errors({stack: true}), 
    json(),
    ),
    
   // defaultMeta: {service: 'user-service'},
    transports : [
           new transports.Console()
    ],
})


module.exports = log; 