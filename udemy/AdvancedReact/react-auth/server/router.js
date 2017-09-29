const Authentication = require('./controllers/authentication');
//requiring the service here executes the service code and ensures 
//passport is configured to use jwt and local authentication strategies
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session : false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){
  //req => request and data about the request
  //res => response to be built and sent back
  //next => mostly used for error handling
  app.get('/', requireAuth, function(req,res){
    res.send({hi : 'there'});
  });
  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup);
}
