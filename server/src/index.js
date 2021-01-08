require('./server/dbMongo/mongoose');
const http = require('http');
const express = require('express');
const router = require('./server/router');
const cors = require('cors');
const controller = require('./socketInit');
const handlerError = require('./server/handlerError/handler');
const mailer = require('./server/nodemailer/mailer')

const fs = require('fs')
const path  = require('path')

const PORT = process.env.PORT || 9632;
const app = express();

// const logger = require('./server/logger/log')
// logger.info('error')//
// logger.debug('deb')
// logger.error('err')//






app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use( router);
app.use(handlerError);


const server = http.createServer(app);


server.listen(PORT,
  () => console.log(`Example app listening on port ${ PORT }!`)); 
controller.createConnection(server);


















// const morgan = require('morgan'); //____________________________________
// const accessLogStream = fs.createWriteStream('./access.log', {flags: 'a'}); //выгрузка логов в файл с расширением log
// app.use(morgan({stream: accessLogStream}));

// app.use(morgan('dev', {
//   skip: function (req, res) { return res.statusCode < 400 }
// }))
