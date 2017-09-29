const Authentication = require('./controllers/authentication');

module.exports = function(app){
  //req => request and data about the request
  //res => response to be built and sent back
  //next => mostly used for error handling
  app.post('/signup', Authentication.signup);
}
