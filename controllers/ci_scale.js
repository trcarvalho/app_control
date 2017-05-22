var m_scale = require('../models/m_scale');
var express = require('express');
var path = require('path');
var find = require('array.prototype.find');
var moment = require('moment-timezone');
var ci_scale_manager = express.Router();

find.shim();
ci_scale_manager.use(express.static(path.join(__dirname, '../public')))

exports.form_candidate = function (req, res) {
  res.render('add_candidate');
  res.end();
}
exports.list_scale = function (req, res) {
  m_scale.get_data(function handle(err, data) {
    var obj_scale = JSON.parse(data)
    res.status(200).render('list', {
      'lista': obj_scale
    });
    res.end();
  })

};


exports.generate_scale = function () {

  var fs = require('fs'),
    obj
  fs.readFile(path.join(__dirname, '/teste.json'), handleFile);

  function handleFile(err, data) {
    if (err) throw err
    obj_scale = JSON.parse(data)

    for (var i = 0; i < obj_scale['days'].length; i++) {
      if (obj_scale['days'][i]['number'] < moment.tz('Brazil/East').weekday()) {
        obj_scale['days'][i]['is_last'] = true;
        obj_scale['days'][i]['is_current'] = false;
      } else if (obj_scale['days'][i]['number'] == moment.tz('Brazil/East').weekday()) {
        obj_scale['days'][i]['is_last'] = false;
        obj_scale['days'][i]['is_current'] = true;
      } else {
        obj_scale['days'][i]['is_last'] = false;
        obj_scale['days'][i]['is_current'] = false;
      }
      if (i >= 1 && i <= 5) {
        maria = obj_scale["person"].find(get_person.bind(obj, "Maria Helena"));
        rita  = obj_scale["person"].find(get_person.bind(obj, "Rita"));
        rosa  = obj_scale["person"].find(get_person.bind(obj, "Rosa"));
        obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",obj,"Rita",obj));
        if (maria["seq_work"] == 2 && (rita["seq_work"] == rosa["seq_work"])) {
          if (i == 0) {
            j = 6;
          }
          else {
            j = i - 1;
          }
          if (true) {

          }
        }
      }
    }
    fs.writeFile(path.join(__dirname, '/teste.json'), JSON.stringify(obj_scale), function (err) {
      if (err) throw err;
      console.log('complete');
    });
  }
}

function get_person(name, element) { // busca o objeto referente as funcionárias       
  return element['name'] === name
}

function modify_data_persons(name, element, data, data_Name) {
  console.log(name,element,data,data_Name);
  // if (element['name'] === name) {
  //   element['seq_work'] = 1;
  // }
  return null
}
        // You can now play with your datas
