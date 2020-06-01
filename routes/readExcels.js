const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/Hyun-Jin_Ryu', function (req, res, next) {
    console.log('Hyun-Jin_Ryu Called');
    var dataArray = '';
    console.log(req.body)

    fs.readFile('./DataBase/류현진.csv', 'utf8', function(err, data){
      dataArray = data.split(/\r?\n/);
      res.send(dataArray);
    })
});

router.post('/readBatter', function (req, res, next) {
  console.log('readBatter Called');
  var dataArray = '';

  var name = req.body.Name;

  fs.readFile('./DataBase/Batters/' + name + '.csv', 'utf8', function(err, data){
    dataArray = data.split(/\r?\n/);
    res.send(dataArray);
  })
});

// 모듈화 -> 하지 않으면 'Router.use() requires a middleware function but got a Object' 에러 발생
module.exports = router;
