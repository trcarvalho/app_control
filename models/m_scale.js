var express              = require('express');
var path                 = require('path');
var moment               = require('moment');

exports.generate_scale = function () {
  var fs  = require('fs'),obj
  fs.readFile(path.join(__dirname, '/teste.json'), handleFile)
  function handleFile(err, data) {
      if (err) throw err
      obj_scale = JSON.parse(data)
      console.log(obj_scale);
      for (var i = 0; i < obj_scale['days'].length; i++) {
        if(obj_scale['days'][i]< moment().weekday()){
         obj_scale['days'][i]['is_last'] =true;
         obj_scale['days'][i]['is_current'] =false;
         console.log("1");
        }
        else if (obj_scale['days'][i]== moment().weekday()) {
          obj_scale['days'][i]['is_last'] =false;
          obj_scale['days'][i]['is_current'] =true;
          console.log("2");
        }
        else{
          obj_scale['days'][i]['is_last'] =true;
          obj_scale['days'][i]['is_current'] =false;
        }
      }
      fs.writeFile (express.static(path.join(__dirname, '../public')), JSON.stringfy(obj_scale), function(err) {
                if (err) throw err;
                console.log('complete');
            });
      }
}
;

exports.get_data = function (handle) {
  console.log(handle);
  var fs = require('fs'),obj
  fs.readFile(path.join(__dirname, '../controllers/teste.json'), handle);
}
