var m_login  = require('../models/m_login');
var express  = require('express');
var path     = require('path');
var find     = require('array.prototype.find');
var moment   = require('moment-timezone');
var ci_login = express.Router();

find.shim();
ci_login.use(express.static(path.join(__dirname, '../public')))

exports.login =  function (req, res) {
    res.status(200).render('login');
    res.end();
  }
exports.logout = function(req, res){
    req.session.is_logged = false;
    req.session.name = "";
    req.session.msg = "Deslog";
    url = req.protocol + '://' + req.get('host')
    res.status(200).redirect(url)
}
exports.post_login = function (req, res){
    m_login.get_users_and_set_session(function(obj){
        obj_scale['users'].find(verify_account.bind({},req,obj));
        url = req.protocol + '://' + req.get('host')
        res.redirect(url);
    });

}

exports.is_logged = function(req, res, next){
    if(req.session.is_logged){
        next();
    }
    else{
         url = req.protocol + '://' + req.get('host')+'/log/login'
    res.redirect(url);
    }
}

function verify_account(req,none3,obj){
    if(req.body.name == obj['user']){
        if(req.body.password == obj['pass']){
            req.session.is_logged =true;
            req.session.name = obj['user']
        }
        else{
            req.session.is_logged = false;
            req.session.msg       = "Errou"
        }
    }
    else{
        req.session.msg = "Usuário inválido"
    }
}
