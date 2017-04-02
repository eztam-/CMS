"use strict";

const commander   = require('commander')
let configFilePath = commander.config ? commander.config.replace(/.js$/, "") : '../config' // TODO externalize the default filename
const userConfig   = require(configFilePath)

/** TODO public documentaton
 * Do not change any settings directly in this file !!!
 * This is the CMS default configuration that extends the settings defined by the user in the /config.js file
 */
 const defaultConfig = {
  port:              '9000',            // Port to run server on. This is overridden by the command line param --port <port>
  postLogoutPage:    '/',
  loginSuccessPage:  '/home',
  loginFailedPage:   '/login',
  templatesDir:      '/../templates',   // The path to the templates directory (relative to server.js)
  staticDir:         '/../static',      // The path to the static directory (relative to server.js)
  defaultLanguage:   'de',
  supportedLanguages:['de','en'],
  numProcesses:      require('os').cpus().length, // The number of instances / processes the server should use
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


const mergedConfig = Object.assign(defaultConfig, userConfig)

module.exports = mergedConfig
