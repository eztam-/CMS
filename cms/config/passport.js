var LocalStrategy = require('passport-local').Strategy;
var db 			= require('../db')


module.exports = function(passport) {

	// session setup
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	
	// Configure Passport authenticated session persistence.
	//
	// In order to restore authentication state across HTTP requests, Passport needs
	// to serialize users into and deserialize users out of the session. The
	// typical implementation of this is as simple as supplying the user ID when
	// serializing, and querying the user record by ID from the database when
	// deserializing.
	
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, cb) {
		db.users.findById(id, function(err, user) {
			if (err) {
				return cb(err);
			}
			cb(null, user);
		});
	});

	// Configure the authentication strategy for Passport. With the `verify`
	// function which receives the credentials (username and password) submitted by the user.
	// After authenticating an user, cb is called with an user object
	passport.use('local-login', new LocalStrategy(function(username, password, cb) {
		db.users.validPassword(username, password, function(err, user) {
			if (err) {
				return cb(err);
			}
			if (!user) {
				return cb(null, false, {message: 'Oops! Wrong password or username.'});
			}
			return cb(null, user);
		});
	}));
	
//	passport.use('local-login', new LocalStrategy({
//	    // by default, local strategy uses username and password
//	    usernameField : 'username',
//	    passwordField : 'password',
//	    passReqToCallback : true
//	// allows us to pass in the req from our route (lets us check if a user is
//	// logged in or not)
//	}, function(req, username, password, done) {
//		if (username)
//			username = username.toLowerCase(); // Use lower-case e-mails to avoid
//											// case-sensitive e-mail matching
//
//		// asynchronous
//		process.nextTick(function() {
//			db.users.findByUsername(username, function(err, user) {
//				// if there are any errors, return the error
//				if (err)
//					return done(err);
//
//				// if no user is found, return the message
//				if (!user)
//					return done(null, false, req.flash('loginMessage', 'No user found.'));
//
//				if (!db.users.validPassword(username, password))
//					return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
//
//				// all is well, return user
//				else
//					return done(null, user);
//			});
//		});
//
//	}));
};