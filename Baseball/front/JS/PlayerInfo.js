// 서버에서 선수 이름으로 Data를 제공받음 * 현재는 Shin-Soo Choo 고정
var N = 'Shin-Soo Choo';
var Name = {
    'Name': N
};

$.ajax({
    type: 'POST',
    url: '/PlayerData/Basic_ByName',
    data: Name,
    dataType: 'json',
    success: function (data) {
        // Shin-Soo Choo의 기본 데이터를 서버로부터 제공받음.
        console.log(data);
    },
    error: function (e) {
        alert(e.responseText);
    }
});

$.ajax({
    type: 'POST',
    url: '/PlayerData/Stats_ByName',
    data: Name,
    dataType: 'json',
    success: function (data) {
        // Shin-Soo Choo의 기본 데이터를 서버로부터 제공받음.
        console.log(data);
    },
    error: function (e) {
        alert(e.responseText);
    }
});