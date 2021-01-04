const bunyan = require('bunyan')

const level = 'info'

const log = bunyan.createLogger({
    name: 'myapp',
    hostname: 'localHost',
    streams: [
        {
            level: 'info',
            stream: process.stdout            
        },
        {
            type: 'rotating-file',
            pattern: '.YYYY-MM-DD-hh-mm',
            period: '1d',
    
            path:  './Logs/err-logs.json',
            level: 'error'
        },
        {
            type: 'rotating-file',
            pattern: '.YYYY-MM-DD-hh-mm',
            period: '1d',

            path:  './Logs/debug-logs.json',
            level: 'debug'
        },
        {
            // type: 'rotating-file',
            // pattern: '.YYYY-MM-DD-hh-mm',
            // period: '1d',

            // path:  './warn-logs.json',
            stream: process.stdout ,
            level: 'warn'
        },
        {
            type: 'rotating-file',
            pattern: '.YYYY-MM-DD-hh-mm',
            period: '1d',

            path:  './Logs/fatal-logs.json',
            level: 'fatal'
        }
    ]
    
});



module.exports = log