const express = require('express');
const request = require('request');
const fs = require('fs');

const router = express.Router();
// master.csv - 이름과 Player_id를 매칭시키는 csv
var master = Array();
master[0] = Array();
master[1] = Array();

fs.readFile('./DataBase/master.csv', 'utf8', function (err, data) {
    var metadata = data.split(/\r?\n/);
    // meta 데이터를 Array로 변환 ( meta 데이터는 한줄의 String )
    // meta 데이터의 0번은 설명에 관한것이므로 1번부터 반복 시작
    var data2Array = Array();

    for (var i = 1; i < metadata.length; i++) {
        var splitted = metadata[i].split(',');

        // 0번 ( Player_id ) 과 1번 ( Player_Name )만 필요하므로 j는 2번만
        master[0][i-1] = splitted[0]; // Id
        master[1][i-1] = splitted[1]; // Name
    }
});

router.post('/Basic_byName', function (req, res, next) {
    console.log('PlayerData/Basic_byName Called');

    var Name = req.body.Name;

    request.get({
        uri: "http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='" + Name + "'",
    }, function (error, response, body) {
        res.send(response.body);
    })
});

router.post('/Stats_ByName', function (req, res, next) {
    console.log('PlayerData/Stats_ByName Called');

    var Name = req.body.Name;
    var Id_index = master[1].indexOf(Name);

    request.get({
        uri: "http://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id='" + master[0][Id_index] + "'"
    }, function (error, response, body) {
        res.send(response.body);
    })
});

// 모듈화 -> 하지 않으면 'Router.use() requires a middleware function but got a Object' 에러 발생
module.exports = router;
