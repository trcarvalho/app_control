var express              = require('express');
var path                 = require('path');
var body_parser          = require('body-parser');
var moment               = require('moment');
var ci_scale_manager     = require('../controllers/ci_scale');
var scale_manager        = express.Router();;

scale_manager.use(express.static(path.join(__dirname, '../public'))); // buscar um jeito mais elegante para solucionar essa perrenga
scale_manager.use(body_parser.urlencoded({extended: true}));
scale_manager.use(body_parser.json());

scale_manager.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  console.log(moment().week(),moment().weekday());
  next();
});
scale_manager.get('/add',function (req, res) {
  res.send('ddddd')
});
scale_manager.get('/list',ci_scale_manager.list_scale);
module.exports = scale_manager;
