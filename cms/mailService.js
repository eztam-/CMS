"use strict";
const nodemailer = require('nodemailer')
const CONFIG     = require('./config')

//create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(CONFIG.mailConfig)

module.exports.sendMail = (subject, message) => {

    if (!CONFIG.mailConfig){
        console.log("WARN - sending mail is deactivated because of missing configuration")
        res.status(500).end()
        return
    }

    let mailOptions = {
        to: 'mbirschl@gmail.com, nodirbek@gmail.com', // TODO externalize to config
        subject: subject,
        text: message + '\n'
    };

    return new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  // TODO log error
                  reject('error: ' + error)
              }
              else {
                resolve(info)
              }
          })
    })
}
