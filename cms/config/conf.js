"use strict";
let userConfig = require('../../conf.js')

/** TODO public documentaton
 * Do not change any settings directly in this file !!!
 * This is the CMS default configuration that extends the settings defined by the user in the /config.js file
 */
 let defaultConfig = {
  port:              '9000',            // Port to run server on. This is overridden by the command line param --port <port>
  postLogoutPage:    '/',
  loginSuccessPage:  '/home',
  loginFailedPage:   '/login',
  templatesDir:      '/../templates',   // The path to the templates directory (relative to server.js)
  staticDir:         '/../static',      // The path to the static directory (relative to server.js)
  defaultLanguage:   'de',
  supportedLanguages:['de','en'],
  mailConfig: {                         // Nodemailer configuration
    	host: 'smtp.gmail.com',
    	port: '587',
      secureConnection: true,
      auth: {
          user: '',
          pass: '',
      }
  },
  users: []

}


let mergedConfig = Object.assign(defaultConfig, userConfig)

module.exports = mergedConfig
