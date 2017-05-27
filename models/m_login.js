var express              = require('express');
var path                 = require('path');
var moment               = require('moment-timezone');


exports.get_users_and_set_session = function (callback) {
  var fs = require('fs'),obj
  fs.readFile(path.join(__dirname, '../controllers/teste.json'), handleFile)
  function handleFile(err,data) {
    if (err) throw err
    obj_scale = JSON.parse(data);
    callback(obj_scale)
  };   
}
