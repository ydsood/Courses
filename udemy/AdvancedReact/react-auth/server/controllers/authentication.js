const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
  //sub : subject of token/ who does this token belong to
  const timestamp =  new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next){
   const email = req.body.email;
   const password = req.body.password;

   if(!email || !password){
     //Add more validation
     return res.status(422).send({ error : 'You must provide email and password'});
   }

//see if a user with a given email exists
  User.findOne({ email: email}, function(err, existingUser){
    if(err){ return next(err); }

    //if a user with email does not exist, return an error
    if(existingUser){
      return res.status(422).send({ error : 'Email is in use' });
    }

    //if a user does not email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err){
      if(err) { return next(err); }
    });

    // Respond to request indicating the user was created and return a token
    res.json({ token: tokenForUser(user) });
  });
}

exports.signin = function(req, res, next) {
  // user has already had their email and password auth'd
  //respond with token
  //the request at this point has passed through passport and has been updated to
  //have req.user => user comes from the done(null, user) that passport creates in the request
  res.send({token : tokenForUser(req.user)});
}
