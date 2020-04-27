const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/Hyun-Jin_Ryu', function (req, res, next) {
    console.log('Hyun-Jin_Ryu Called');
    var dataArray = '';

    fs.readFile('./DataBase/류현진.csv', 'utf8', function(err, data){
      dataArray = data.split(/\r?\n/);
      res.send(dataArray);
    })
});

// 모듈화 -> 하지 않으면 'Router.use() requires a middleware function but got a Object' 에러 발생
module.exports = router;
