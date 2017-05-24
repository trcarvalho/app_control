var express              = require('express');
var path                 = require('path');
var app                  = express();
var moment               = require('moment-timezone');
var rot_scale_manager    = require('./routers/scale_manager');
var rot_medicine         = require('./routers/medicine');
var rot_login            = require('./routers/login')
var scale_manager        = require('./controllers/ci_scale')
var session              = require('express-session');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  proxy: true,
  resave: true,
  saveUninitialized: true,
  secret: 'keyboard cat'
}))

//get routes
app.use('/scale',rot_scale_manager);
app.use('/remedio',rot_medicine);
app.use('/log',rot_login);
// set config
app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  if("undefined" === typeof request.session.msg){
    request.session.msg = "Bem vindo";
  }
  response.render('index',{'moment':request.session.msg,'name':request.session.name});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  console.log(moment.tz('Brazil/East').weekday());
  scale_manager.generate_scale()
});

module.exports = app;