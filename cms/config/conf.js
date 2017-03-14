"use strict";
/**
 *  CMS configuration
 */
module.exports = {
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
          user: 'medicuswebicus@gmail.com',
          pass: '',
      }
  }
};
