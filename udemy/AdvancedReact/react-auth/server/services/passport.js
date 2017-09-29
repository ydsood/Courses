const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;


//Create JWT Strategy//
//------------------//
const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  //Verify this username and password
  //if it is correct call done with the user
  //else call done wiht false
  User.findOne({email: email}, function(err, user){
    if(err) {return done(err);}

    if(!user) {return done(null, false);}

    //compare password with the password provided
    user.comparePassword(password, function(err, isMatch){
      if(err) {return done(err);}
      if(!isMatch) {return done(null, false);}

      return done(null, user);
    });
  });
});



//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT Strategy//
//------------------//
//function is called every time a user tries to login with JWT
//payload : decoded JWT token
//done : callback function that should be called based on whether the user was successfully authenticated or not
const jwtLogin =  new JwtStrategy(jwtOptions, function(payload, done){
  // See if the user ID in the payload exists in our database
  // if it does, call `done` with that user
  // else, call done without a user object

  User.findById(payload.sub, function(err, user){
    if(err) { return done(err, false); }

    if(user){
      done(null, user);
    } else{
      done(null, false);
    }
  });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
