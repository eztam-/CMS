/**
 *  This configuration file is just for development purpose ans should not be used in production
 */
module.exports = {
  forceHttpsPaths:  ['none'], // List of paths (express.js expressions) that are forced to use HTTPS only
  forceHttpsPathsAuth: ['none'],   // List of paths that are forced to use HTTPS when user is authenticated. In production this should always be ['*']
  postLogoutPage:   '/',
  loginSuccessPage: '/home',
  loginFailedPage:  '/login',
  templatesDir:     '/../templates',  // The path to the templates directory (relative to server.js)
  staticDir:        '/../static'      // The path to the static directory (relative to server.js)
};
