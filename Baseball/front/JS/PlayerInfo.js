// 서버에서 선수 이름으로 Data를 제공받음 * 현재는 Shin-Soo Choo 고정
var N = 'Hyun-Jin Ryu';
var Name = {
    'Name': N
};

var PlayerInfo = '';

$.ajax({
    type: 'POST',
    url: '/PlayerData/Basic_ByName',
    data: Name,
    success: function (data) {
        if(data[0].position == "P"){
            Pitcher(data);
        }
        else{
            Batter(data);
        }
    },
    error: function (e) {
        alert(e.responseText);
    }
});

function Pitcher(data){
    
    // Thead 동적으로 생성하는 코드 여기에 적을것


    // <----------------END---------------->

    // 투수의 기본 데이터를 서버로부터 제공받음.
    var str = '<TR>';  // 선수 성적 테이블
    var basic_info = '<div>';
    PlayerInfo = data;

    console.log(PlayerInfo);
}


function Batter(data) {

    // Thead 동적으로 생성하는 코드 여기에 적을것


    // <----------------END---------------->

    // 타자의 기본 데이터를 서버로부터 제공받음.
    var str = '<TR>';  // 선수 성적 테이블
    var basic_info = '<div>';
    PlayerInfo = data;

    if (PlayerInfo[0].bats == "L") {
        PlayerInfo[0].bats = "왼손";
    }
    if (PlayerInfo[0].bats == "R") {
        PlayerInfo[0].bats = "오른손";
    }
    if (PlayerInfo[0].throws == "L") {
        PlayerInfo[0].throws = "왼손";
    }
    if (PlayerInfo[0].throws == "R") {
        PlayerInfo[0].throws = "오른손";
    }
    basic_info += '<div>' + "소속팀 : " + PlayerInfo[0].team_full + '</div>' + '<div>' + "투 : " + PlayerInfo[0].throws + " / 타 : " + PlayerInfo[0].bats + '</div>' + '<div>' + "신장 : " + PlayerInfo[0].height_feet + "피트" + PlayerInfo[0].height_inches + "인치" + '</div>' + "포지션 : " + PlayerInfo[0].position + '</div>';

    $("#Player_Name").append(PlayerInfo[0].name_display_first_last);
    $("#Basic_Info").append(basic_info);

    $.each(PlayerInfo, function (i) {
        if (PlayerInfo[i].season != null) {
            str += '<TD>' + PlayerInfo[i].season + '</TD><TD>' + PlayerInfo[i].team_abbrev + '</TD><TD>' + PlayerInfo[i].g + '</TD><TD>' + PlayerInfo[i].tpa + '</TD><TD>' + PlayerInfo[i].ab + '</TD><TD>' + PlayerInfo[i].r + '</TD><TD>' + PlayerInfo[i].h + '</TD><TD>' + PlayerInfo[i].hr + '</TD><TD>' + PlayerInfo[i].rbi + '</TD><TD>' + PlayerInfo[i].bb + '</TD><TD>' + PlayerInfo[i].so + '</TD><TD>' + PlayerInfo[i].sb + '</TD><TD>' + PlayerInfo[i].hbp + '</TD><TD>' + PlayerInfo[i].avg + '</TD><TD>' + PlayerInfo[i].obp + '</TD><TD>' + PlayerInfo[i].slg + '</TD><TD>' + PlayerInfo[i].ops + '</TD>';
            str += '</TR>';
        }
        if (PlayerInfo[i].length > 1) {
            for (var j = 0; j < PlayerInfo[i].length; j++) {
                str += '<TD>' + PlayerInfo[i][j].season + '</TD><TD>' + PlayerInfo[i][j].team_abbrev + '</TD><TD>' + PlayerInfo[i][j].g + '</TD><TD>' + PlayerInfo[i][j].tpa + '</TD><TD>' + PlayerInfo[i][j].ab + '</TD><TD>' + PlayerInfo[i][j].r + '</TD><TD>' + PlayerInfo[i][j].h + '</TD><TD>' + PlayerInfo[i][j].hr + '</TD><TD>' + PlayerInfo[i][j].rbi + '</TD><TD>' + PlayerInfo[i][j].bb + '</TD><TD>' + PlayerInfo[i][j].so + '</TD><TD>' + PlayerInfo[i][j].sb + '</TD><TD>' + PlayerInfo[i][j].hbp + '</TD><TD>' + PlayerInfo[i][j].avg + '</TD><TD>' + PlayerInfo[i][j].obp + '</TD><TD>' + PlayerInfo[i][j].slg + '</TD><TD>' + PlayerInfo[i][j].ops + '</TD>';
                str += '</TR>';
            }
        }

    });

    $("#t").append(str);
}