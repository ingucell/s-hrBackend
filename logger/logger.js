const {format, createLogger, transports, stack} = require('winston')
const {timestamp} = format


const logFormat = format.printf(({ level, message, label, timestamp})=>{
    return `${timestamp} ${level}: ${stack || message}`
})

const log = createLogger({
    level: 'info',
    format : 
    format.combine(timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), 
    logFormat,
    format.errors({stack: true})
    ),
    
   // defaultMeta: {service: 'user-service'},
    transports : [
           new transports.Console()
    ],
})


module.exports = log; 