var express              = require('express');
var path                 = require('path');
var app                  = express();
var rot_scale_manager    = require('./routers/scale_manager');
var scale_manager        = require('./controllers/ci_scale')

app.use(express.static(path.join(__dirname, 'public')));
app.use('/scale',rot_scale_manager);
app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  response.render('index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  scale_manager.generate_scale()
});
