var m_scale              = require('../models/m_scale');
var express              = require('express');
var path                 = require('path');
var moment               = require('moment');
var ci_scale_manager     = express.Router();

ci_scale_manager.use(express.static(path.join(__dirname, '../public')))

exports.form_candidate = function(req, res) {
  res.render('add_candidate');
  res.end();
}
exports.list_scale = function (req, res) {
    m_scale.get_data(function handle(err, data) {
      // console.log(data);
      var obj_scale = JSON.parse(data)
      res.status(200).render('list',{'lista':obj_scale});
      res.end();
    })

  };


exports.generate_scale = function(){

  var fs = require('fs'),obj
  fs.readFile(path.join(__dirname, '/teste.json'), handleFile);

  function handleFile(err, data) {
      if (err) throw err
      obj_scale = JSON.parse(data)
      for (var i = 0; i < obj_scale['days'].length; i++) {
        if(obj_scale['days'][i]['number']< moment().weekday()){
          obj_scale['days'][i]['is_last'] =true;
          obj_scale['days'][i]['is_current'] =false;
          console.log(1);
        }
        else if (obj_scale['days'][i]['number']== moment().weekday()) {
          obj_scale['days'][i]['is_last'] =false;
          obj_scale['days'][i]['is_current'] =true;
          console.log(2);
        }
        else{
          obj_scale['days'][i]['is_last'] =false;
          obj_scale['days'][i]['is_current'] =false;
          console.log(3);
        }
      }
      // console.log(obj);
      fs.writeFile (path.join(__dirname, '/teste.json'), JSON.stringify(obj_scale), function(err) {
               if (err) throw err;
               console.log('complete');
           });
         }
}
// You can now play with your datas
