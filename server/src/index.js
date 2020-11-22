require('./server/dbMongo/mongoose');
const http = require('http');
const express = require('express');
const router = require('./server/router');
const cors = require('cors');
const controller = require('./socketInit');
const handlerError = require('./server/handlerError/handler');


// const bodyParser = require('express')


const PORT = process.env.PORT || 9632;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);
app.use(handlerError);


// app.use(bodyParser.urlencoded({extended: false})) попытка отправить даные на почту
// app.post('/ResetPassword', (req, res) => {
//   console.log(req.body)
// })

// app.get('/ResetPassword', (req, res) => {
//   res.sendFile(__dirname + '../../client/src/pages/ResetPasswordPage/ResetPasswordPage.js')
// })




const server = http.createServer(app);
server.listen(PORT,
  () => console.log(`Example app listening on port ${ PORT }!`));
controller.createConnection(server);


