const nodemailer = require('nodemailer')
const CONSTANTS = require('../../constants')

const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'squadhelp.test@gmail.com',
            pass: CONSTANTS.MAIL_PASS
        }
},{
    from: 'mailer <squadhelp.test@gmail.com>',

})

const mailer =  message =>{
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err);
        console.log('email sent', info);
    })
}

module.exports = mailer