"use strict";
/**
 *  CMS configuration
 */
module.exports = {
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
