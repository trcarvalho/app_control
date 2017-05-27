var express              = require('express');
var path                 = require('path');
var body_parser          = require('body-parser');
var moment               = require('moment');
var ci_medicine          = require('../controllers/ci_medicine');
var ci_login             = require('../controllers/ci_login')
var medicine             = express.Router();

medicine.use(express.static(path.join(__dirname, '../public'))); // buscar um jeito mais elegante para solucionar essa perrenga
medicine.use(body_parser.urlencoded({extended: true}));
medicine.use(body_parser.json());
medicine.get('/add',ci_login.is_logged,function(req,res){res.send("SSSSSS")})
module.exports = medicine;
medicine.get('/listar',ci_login.is_logged,function(req,res){res.send("VVVVVV")})
