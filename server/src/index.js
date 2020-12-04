require('./server/dbMongo/mongoose');
const http = require('http');
const express = require('express');
const router = require('./server/router');
const cors = require('cors');
const controller = require('./socketInit');
const handlerError = require('./server/handlerError/handler');

const fs = require('fs')
const path  = require('path')
//const debug = require('debug')('index')
const PORT = process.env.PORT || 9632;
const app = express();




// create a write stream (in append mode)
//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'accessLog'), {flags: 'a'})

// setup the logger
//app.use(morgan('combined', {stream: accessLogStream}))

//app.use(morgan( ':method :status :url "HTTP/:http-version" :date[web]'))

const morgan = require('morgan'); //____________________________________
const accessLogStream = fs.createWriteStream('./access.log', {flags: 'a'}); //выгрузка логов в файл с расширением log
app.use(morgan({stream: accessLogStream}));

app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))





// app.use((req, res, next)=>{
//   let logRequest = ("%s", req);
  
//   next();
//   console.log(logRequest);
// })

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);
app.use(handlerError);


const server = http.createServer(app);


server.listen(PORT,
  () => console.log(`Example app listening on port ${ PORT }!`)); // debug! instead console.log
controller.createConnection(server);




