var express              = require('express');
var path                 = require('path');
var body_parser          = require('body-parser');
var moment               = require('moment');
var ci_login             = require('../controllers/ci_login');
var login                = express.Router();

login.use(express.static(path.join(__dirname, '../public'))); // buscar um jeito mais elegante para solucionar essa perrenga
login.use(body_parser.urlencoded({extended: true}));
login.use(body_parser.json());

login.get('/login',ci_login.login)
login.get('/logout',ci_login.logout)
login.post('/post_login',ci_login.post_login)
module.exports = login;