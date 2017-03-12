/**
 *  CMS configuration
 */
module.exports = {
  postLogoutPage:    '/',
  loginSuccessPage:  '/home',
  loginFailedPage:   '/login',
  templatesDir:      '/../templates',  // The path to the templates directory (relative to server.js)
  staticDir:         '/../static',      // The path to the static directory (relative to server.js)
  defaultLanguage:   'de',
  supportedLanguages:['de','en'],
  // mail conf
  mailSender:		 'medicuswebicus@gmail.com', 
  mailPassword: 	 'passw',
  mailHost:			 'smtp.gmail.com', 		//gmail - "smtp.gmail.com",
  mailPort:			 '587'
	  
};
