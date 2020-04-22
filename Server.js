// 모듈 로딩
// 반드시 const로 정의할 것
const express = require('express');
const session = require('express-session');
const path = require('path');

// 생성자 및 상수정의
// 반드시 const로 정의할 것
const app = express();
const port = 3000;

// 포트 설정
app.set('port', port);

// 세션 설정
app.use(session({
  secret:'*******',
  resave:false,
  saveUninitialized:true
}));

// static 설정 ( 파일 접근 제한 해제 )
app.use(express.static(path.join( __dirname, './Baseball/front' )));

// 이하 라우터 정의
const index = require('./routes/router');
const readExcels = require('./routes/readExcels');

// 이하 라우터 사용 ( 라우팅 )
app.use('/',index);
app.use('/readExcels',readExcels);

// 서버 리스닝
var server = app.listen(port, function() {
  console.log('Port No ( ' + port + ' ) Listening ...');
});
