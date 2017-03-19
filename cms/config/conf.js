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
          pass: 'medweb2015',
      }
  },
  users: [
    {name: "a", password: "$2a$08$Bo8ImxqyJh5cPNv6hgpEj.V8TP/5zRaD5eduHdwiKBYPl5l6KOkSm",  email: "a@mail.com" },
    {name: "admin", password: "$2a$08$.eh96sXTOrj0lWhE0S/G9.6C.DfeJpJ.Bk8xOQFuqiGHHVMpNaNMi",  email: "aa@mail.com" },
    {name: "test", password: "$2a$08$.YTrlExHXrtg5s8V5aU7YOcIWf80Dg4OHm1/wnUvAjwcKEc3KwjL6",  email: "b@mail.com" }
  ]

};
