// 최초에 불려지는 데이터
// 타자 or 투수 버튼을 눌렀을때 함수를 실행해주면됨.

// ============== 데이터 확인후 삭제 요망 ==============
initBatter();
initPitcher();
var ex = {
    "year":2018,
    "sort_column" : 'hr'

}
CustomizeBatter(ex);
CustomizePitcher(ex);
// ============== 삭제 요망 ===========================

function initBatter(){
    $.ajax({
        type: 'POST',
        url: '/LeaderBoard/Leader_Batter',
        success: function (data) {
            // 데이터를 받은 뒤 코드를 어떻게 할건지 여기다가 적으면됨.
            // data는 Array 형태
            console.log('2019_batter_hr')
            console.log(data);
        },
        error: function (e) {
            alert(e.responseText);
        }
    });
}

function initPitcher(){
    $.ajax({
        type: 'POST',
        url: '/LeaderBoard/Leader_Pitcher',
        success: function (data) {
            // 데이터를 받은 뒤 코드를 어떻게 할건지 여기다가 적으면됨.
            // data는 Array형태
            console.log('2019_pitcher_era')
            console.log(data);
        },
        error: function (e) {
            alert(e.responseText);
        }
    });
}

// Customize를 위한 Ajax
// 매개변수인 data는 json형태로 제공해야함
// json의 규격은 아래와 같음 (데이터는 예시임)
// data = {
//     "year":2019,
//     "sort_column" : 'hr'
// }
// 데이터는 json안에 들어갈 데이터는 드롭다운을 통해 받아올것

function CustomizeBatter(json){
    $.ajax({
        type: 'POST',
        url: '/LeaderBoard/Leader_Customize_Bat',
        data: json,
        success: function (data) {
            // 데이터를 받은 뒤 코드를 어떻게 할건지 여기다가 적으면됨.
            // data는 Array형태
            console.log('2018_batter_hr')
            console.log(data);
        },
        error: function (e) {
            alert(e.responseText);
        }
    });
}

function CustomizePitcher(json){
    $.ajax({
        type: 'POST',
        url: '/LeaderBoard/Leader_Customize_Pit',
        data: json,
        success: function (data) {
            // 데이터를 받은 뒤 코드를 어떻게 할건지 여기다가 적으면됨.
            // data는 Array형태
            console.log('2018_pitcher_hr')
            console.log(data);
        },
        error: function (e) {
            alert(e.responseText);
        }
    });
}