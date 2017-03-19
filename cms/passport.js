"use strict";
const LocalStrategy = require('passport-local').Strategy,
 			bcrypt 				= require('bcrypt-nodejs'),
 			CONFIG 				= require('./config/conf')



module.exports = (passport) => {

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

	// generating a hash
	// let generateHash = function(password) {
	// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  // };


	passport.serializeUser((user, done) => {
		done(null, user.name);
	});

	// used to deserialize the user
	passport.deserializeUser((id, cb) => {
		let user = CONFIG.users.find((u)=>{ return u.name === id})
		if (user) {
			cb(null, user)
		} else {
			cb(new Error('User ' + id + ' does not exist'))
		}
	})

	// Configure the authentication strategy for Passport. With the `verify`
	// function which receives the credentials (username and password) submitted by the user.
	// After authenticating an user, cb is called with an user object
	passport.use('local-login', new LocalStrategy((username, password, cb) => {
		let userFromDb = CONFIG.users.find((u)=>{ return u.name === username})
		if (userFromDb) {
			var passwordOK = bcrypt.compareSync(password, userFromDb.password)
			if (passwordOK) {
				return cb(null, userFromDb);
			}
		}
		return cb(null, null);
	}));
};
