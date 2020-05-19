const express = require('express');

const router = express.Router();

router.get('/', function (req, res, next) {
    console.log('router.js_Main.html Called');

    res.sendfile('./Baseball/front/HTML/Main.html');
});

router.get('/index', function (req, res, next) {
    console.log('router.js_index.html Called');

    res.sendfile('./Baseball/front/HTML/index.html');
});

router.get('/PlayerInfo', function (req, res, next) {
    console.log('router.js_PlyaerInfo.html Called');

    res.sendfile('./Baseball/front/HTML/PlayerInfo.html');
});

router.get('/LeaderBoard', function (req, res, next) {
    console.log('router.js_LeaderBoard.html Called');

    res.sendfile('./Baseball/front/HTML/LeaderBoard.html');
});

// 모듈화 -> 하지 않으면 'Router.use() requires a middleware function but got a Object' 에러 발생
module.exports = router;
