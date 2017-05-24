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
    var obj_scale          = JSON.parse(data);
    var is_gerenate_scale  = false; // variavel para controle da geração de escala, onde será disparada se houver mudança de semana
    var true_current_week  = Math.ceil(moment.tz('Brazil/East').date()/7);

    // Verfifca se houve mudança de semana e se é o primeiro dia
    if((obj_scale['current_week'] != true_current_week)&&(moment.tz('Brazil/East').weekday() == 0)){ // verifica se mudou a semana
      is_gerenate_scale = true;
      obj_scale['current_week'] = true_current_week;  
    }
  

    for (var i = 0; i < obj_scale['days'].length; i++) {
      // Faz  mudança de indicação da tabela 
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
      if(is_gerenate_scale){
        // make everything // scale is here
      }
      maria = obj_scale["person"].find(get_person.bind(obj, "Maria Helena"));
      rita  = obj_scale["person"].find(get_person.bind(obj, "Rita"));
      rosa  = obj_scale["person"].find(get_person.bind(obj, "Rosa"));

      if (i >= 1 && i <= 5) { //avaliação de segunda a sexta
               
        if (maria["seq_work"] >= 2 && (rita["seq_work"] == rosa["seq_work"])) { //
          
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Maria Helena"));
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Maria Helena"));
          
          if (i == 0) {
            j = 6;
          } else {
            j = i - 1;
          }
          
          if((obj_scale['days'][j]['work_day'] == 'Rita' || obj_scale['days'][j]['work_night']=='Rita')&&(obj_scale['days'][j]['work_day']=='Rosa'||obj_scale['days'][j]['work_night']=='Rosa')){ // ambas trabalharam no dia anterior
            
            if (rosa["work_night"]) { // trabalhou a noite?
            //dia
            obj_scale['days'][i]['work_day'] = 'Rita';
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));            
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
             //noite
            obj_scale['days'][i]['work_night'] = 'Rosa';            
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rosa"));
                        
            }
            else{
             //dia
            obj_scale['days'][i]['work_day'] = 'Rosa';
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));            
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));
             //noite
            obj_scale['days'][i]['work_night'] = 'Rita';            
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rita"));
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rita"));
            }
          }
          else{
            if(obj_scale['days'][j]['work_day'] == 'Rosa' || obj_scale['days'][j]['work_day'] == 'Rosa'){ // Trabalhou no dia anterior
               //dia
            obj_scale['days'][i]['work_day'] = 'Rita';
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));            
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
             //noite
            obj_scale['days'][i]['work_night'] = 'Rosa';            
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rosa"));
            }
            else{
               //dia
            obj_scale['days'][i]['work_day'] = 'Rosa';
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));            
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));
             //noite
            obj_scale['days'][i]['work_night'] = 'Rita';            
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rita"));
            }
          }
          
        }
        else if (maria["seq_work"] == 2 && (rita["seq_work"] > rosa["seq_work"])) { // rita trabalhou mais que rosa
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Maria Helena"));
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Maria Helena"));

          //dia
          obj_scale['days'][i]['work_day'] = 'Rosa';
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));            
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));
             //noite
          obj_scale['days'][i]['work_night'] = 'Rita';            
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rita"));
        } 
        else if(maria["seq_work"] == 2 && (rita["seq_work"] < rosa["seq_work"])){ // rosa trabalhou mais que a rita
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Maria Helena"));
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Maria Helena"));

          //dia
          obj_scale['days'][i]['work_day'] = 'Rita';
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));            
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
             //noite
          obj_scale['days'][i]['work_night'] = 'Rosa';            
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rosa"));
        }
        else if(rosa["seq_work"]>=2){ // já trabalhou dois dias de trabalho
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Rosa"));
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));

          //dia
          obj_scale['days'][i]['work_day'] = 'Rita';
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));            
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
          //noite
          obj_scale['days'][i]['work_night'] = 'Maria Helena';            
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",maria["seq_work"]+1,"Maria Helena"));
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Maria Helena"));
        }
        else if(rita["seq_work"]>=2){
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Rita"));
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));

          //dia
          obj_scale['days'][i]['work_day'] = 'Rosa';
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));            
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));
          //noite
          obj_scale['days'][i]['work_night'] = 'Maria Helena';            
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",maria["seq_work"]+1,"Maria Helena"));
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Maria Helena"));
        }
        else if(rita["seq_work"]==rosa["seq_work"]){
          if (i == 0) {
            j = 6;
          } else {
            j = i - 1;
          }
          if((obj_scale['days'][j]['work_day'] == 'Rita' || obj_scale['days'][j]['work_night']=='Rita')&&(obj_scale['days'][j]['work_day']=='Rosa'||obj_scale['days'][j]['work_night']=='Rosa')){ // ambas trabalharam no dia anterior
            
            if (rosa["work_night"]) { // trabalhou a noite?
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Rosa"));
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));
              //dia
              obj_scale['days'][i]['work_day'] = 'Rita';
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));            
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
              //noite
              obj_scale['days'][i]['work_night'] = 'Maria Helena';            
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",maria["seq_work"]+1,"Maria Helena"));
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Maria Helena"));
                        
            }
            else{
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Rita"));
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
              //dia
              obj_scale['days'][i]['work_day'] = 'Rosa';
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));            
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));
              //noite
              obj_scale['days'][i]['work_night'] = 'Maria Helena';            
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",maria["seq_work"]+1,"Maria Helena"));
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Maria Helena"));
            }
          }
          else{
            if(obj_scale['days'][j]['work_day'] == 'Rosa' || obj_scale['days'][j]['work_day'] == 'Rosa'){ // Trabalhou no dia anterior
               //dia
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Rosa"));            
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));

              obj_scale['days'][i]['work_day'] = 'Rita';
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));            
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
              //noite
              obj_scale['days'][i]['work_night'] = 'Maria Helena';            
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",maria["seq_work"]+1,"Maria Helena"));
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Maria Helena"));
            }
            else{
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Rita"));            
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
              //dia
              obj_scale['days'][i]['work_day'] = 'Rosa';
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));            
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));
              //noite
              obj_scale['days'][i]['work_night'] = 'Maria Helena';            
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",maria["seq_work"]+1,"Maria Helena"));
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Maria Helena"));
            }
          }
        }
        else if(rita["seq_work"] > rosa["seq_work"]){
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Rita"));
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
          //dia
          obj_scale['days'][i]['work_day'] = 'Rosa';
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));            
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));
          //noite
          obj_scale['days'][i]['work_night'] = 'Maria Helena';            
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",maria["seq_work"]+1,"Maria Helena"));
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Maria Helena"));
        }
        else if(rita["seq_work"] < rosa["seq_work"]){
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Rosa"));
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));
          //dia
          obj_scale['days'][i]['work_day'] = 'Rita';
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));            
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
          //noite
          obj_scale['days'][i]['work_night'] = 'Maria Helena';            
          obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",maria["seq_work"]+1,"Maria Helena"));
          obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Maria Helena"));
        }

      }
      // Apartir daqui a avaliação é do sabado e  do domingo
      else if(rosa["seq_work"]>=2){
          if(i==6 && maria["work_night"]){

            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Maria Helena"));
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Maria Helena"));
            //dia
            obj_scale['days'][i]['work_day'] = 'Rita';
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));            
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
            //noite
            obj_scale['days'][i]['work_night'] = 'Rosa';            
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rosa"));

          }
          else{
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Rosa"));
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));
            //dia
            obj_scale['days'][i]['work_day'] = 'Maria Helena';
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",maria["seq_work"]+1,"Maria Helena"));            
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Maria Helena"));
            //noite
            obj_scale['days'][i]['work_night'] = 'Rita';            
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rita"));
          }
      }
      else if(rita["seq_work"]>=2){
          if(i==6 && maria["work_night"]){

            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Maria Helena"));
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Maria Helena"));
            //dia
            obj_scale['days'][i]['work_day'] = 'Rosa';
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));            
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));
            //noite
            obj_scale['days'][i]['work_night'] = 'Rita';            
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rita"));

          }
          else{
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Rita"));
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
            //dia
            obj_scale['days'][i]['work_day'] = 'Maria Helena';
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",maria["seq_work"]+1,"Maria Helena"));            
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Maria Helena"));
            //noite
            obj_scale['days'][i]['work_night'] = 'Rosa';            
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rosa"));
          }
      }
      else if(rita["seq_work"] == rosa["seq_work"]){
         if (i == 0) {
            j = 6;
          } else {
            j = i - 1;
          }
        if((obj_scale['days'][j]['work_day'] == 'Rita' || obj_scale['days'][j]['work_night']=='Rita')&&(obj_scale['days'][j]['work_day']=='Rosa'||obj_scale['days'][j]['work_night']=='Rosa')){
            if(rosa["work_night"]){
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Maria Helena"));
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Maria Helena"));
              //dia
              obj_scale['days'][i]['work_day'] = 'Rita';
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));            
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
              //noite
              obj_scale['days'][i]['work_night'] = 'Rosa';            
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rosa"));
            }
            else{
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Maria Helena"));
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Maria Helena"));
              //dia
              obj_scale['days'][i]['work_day'] = 'Rosa';
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));            
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));
              //noite
              obj_scale['days'][i]['work_night'] = 'Rita';            
              obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));
              obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rita"));
            }
        }
        else if(obj_scale['days'][j]['work_day']=='Rosa'||obj_scale['days'][j]['work_night']=='Rosa'){
           obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Maria Helena"));
           obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Maria Helena"));
           //dia
           obj_scale['days'][i]['work_day'] = 'Rita';
           obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));            
           obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
           //noite
           obj_scale['days'][i]['work_night'] = 'Rosa';            
           obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));
           obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rosa"));  
        }
        else{
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Maria Helena"));
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Maria Helena"));
            //dia
            obj_scale['days'][i]['work_day'] = 'Rosa';
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));            
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));
            //noite
            obj_scale['days'][i]['work_night'] = 'Rita';            
            obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));
            obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rita"));
        }
      }
      else if(rita["seq_work"]>rosa["seq_work"]){
        obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Maria Helena"));
        obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Maria Helena"));
        //dia
        obj_scale['days'][i]['work_day'] = 'Rosa';
        obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));            
        obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rosa"));
        //noite
        obj_scale['days'][i]['work_night'] = 'Rita';            
        obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));
        obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rita"));
      }
      else{
        obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",0,"Maria Helena"));
        obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Maria Helena"));
        //dia
        obj_scale['days'][i]['work_day'] = 'Rita';
        obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rita["seq_work"]+1,"Rita"));            
        obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",false,"Rita"));
        //noite
        obj_scale['days'][i]['work_night'] = 'Rosa';            
        obj_scale["person"].find(modify_data_persons.bind(obj,"seq_work",rosa["seq_work"]+1,"Rosa"));
        obj_scale["person"].find(modify_data_persons.bind(obj,"work_night",true,"Rosa"));
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

function modify_data_persons(data_name,data, name, element, index) {
  // console.log(index,name,element,data,data_name);
   if (element['name'] === name) {
      element[data_name] = data;
   }
}
        // You can now play with your datas
