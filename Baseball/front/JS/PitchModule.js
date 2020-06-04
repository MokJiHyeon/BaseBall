//-------------------------------------------- 데이터 로드 파트 --------------------------------------------//
// Excel data 초기화
var URL = document.URL;
var Player = URL.split('=')[1];

var excelData = '';
var pitch_type = Array();
var plate_x = Array();
var plate_z = Array();

var json = {
    "Name": Player
};

Player = Player.replace('_', ' ');

// Ajax로 서버와 통신 (readExcels/Hyun-Jin_Ryu) ==> 차후 수정 예정 (선수명을 data로 전송)
$.ajax({
    type: 'POST',
    url: '/readExcels/readPitcher',
    data: json,
    success: function (data) {
        excelData = Json2Array(data);
        DataInitialize(excelData);
        AddText();
        init();
    },
    error: function (e) {
        alert(e.responseText);
    }
});

function Json2Array(json) {
    var array = Array();
    // 2차원 배열을 split하여 push
    for (var i = 0; i < json.length; i++) {
        var splitted = json[i].split(',');
        array[i] = Array();
        for (var j = 0; j < splitted.length; j++) {
            array[i][j] = splitted[j].replace(/"/g, "");
        }
    }
    return array;
}

function DataInitialize(data) {
    // 각 데이터의 1번은 "데이터명"
    for (var i = 1; i < data.length; i++) {
        pitch_type.push(data[i][0])
        plate_x.push(data[i][29]);
        plate_z.push(data[i][30]);
    }
}

function AddText() {
    var Right_Container = document.getElementById('Right_Container');

    Right_Container.innerHTML += Player + " 선수의 2019년도 평균 발사각입니다.<br>"
    Right_Container.innerHTML += "평균 발사 각도 : <span class='RedText'> 도</span><br>"
    // Right_Container.innerHTML += "평균 타구 속도 : <span class='RedText'>" + Avg_Launch_Speed + " mph</span><br>"
    // Right_Container.innerHTML += "<span class='BlueText'>파란색 선</span>은 "+ Player + " 선수의 평균 발사 각과 타구 속도를 의미하며,<br>"
    Right_Container.innerHTML += "반원의 색은 타구 속도를 의미합니다.<br>"
    Right_Container.innerHTML += "하양 반원 : 0mph ~ 30mph<br>";
    Right_Container.innerHTML += "노랑 반원 : 30mph ~ 60mph<br>";
    Right_Container.innerHTML += "주황 반원 : 60mpb ~ 90mph<br>";
    Right_Container.innerHTML += "진한 주황 반원 : 90mph ~ 120mph<br>";
    Right_Container.innerHTML += "( 원의 검정 라인은 10도 간격을 의미합니다. )<br>";
    Right_Container.innerHTML += "붉은 색 부채꼴은 배럴타구 발사각도를 뜻합니다.<br>";
    Right_Container.innerHTML += "배럴타구 발사각의 범위는 8도 ~ 50도 사이이며,<br>";
    Right_Container.innerHTML += "타구 속도에 따라 각도가 변화합니다.<br>";
}

//-------------------------------------------- 데이터 로드 파트 END ----------------------------------------//
//-------------------------------------------- Three.js 파트 Start ----------------------------------------//
// ES6에서는 모듈 Load를 import로 한다.
import * as THREE from '../lib/Three.js/three.module.js';
import { OrbitControls, MapControls } from '../lib/Three.js/OrbitControls.js';
import * as dat from '../lib/Three.js/dat.gui.module.js';

// Three.js 는 5가지 조건이 충족되어야 실행된다.
// 1. Scene 
// 2. Camera
// 3. Light
// 4. Geometry or Material
// 5. Renderer

function init() {
    // 5가지 조건을 미리 선언
    // 1. Scene
    var scene = new THREE.Scene();
    console.log('now start Moduling')

    // 2. Camera
    var camera = new THREE.PerspectiveCamera(6, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.x = 0;
    camera.position.y = 90;
    camera.position.z = 0;
    camera.lookAt(scene.position);

    // 3. Light (생략)

    // 4. Materials - 스트라이크존
    var StrikeZoneGeometry = new THREE.PlaneGeometry(9, 9, 1, 1);
    var StrikeZoneMaterial = new THREE.MeshBasicMaterial({ color: 0xCCCCCC });
    var StrikeZone = new THREE.Mesh(StrikeZoneGeometry, StrikeZoneMaterial);
    StrikeZone.rotation.x = Math.PI / 2;
    scene.add(StrikeZone);

    // 스트라이크존에 Grid(격자) 추가 (8X9)
    var FrameMaterials = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
    var FramePoints = [];
    for(var i = -4.5 ; i < 4.5 ; i++){
        // 가로선 그리기
        var a = 9/8;
        var temp = -4.5;
        FramePoints.push(new THREE.Vector3(temp , i , 0))
        FramePoints.push(new THREE.Vector3(temp , i+1 , 0))
        temp = temp+a;
        FramePoints.push(new THREE.Vector3(temp , i , 0))
        FramePoints.push(new THREE.Vector3(temp , i+1 , 0))
        temp = temp+a;
        FramePoints.push(new THREE.Vector3(temp , i , 0))
        FramePoints.push(new THREE.Vector3(temp , i+1 , 0))
        temp = temp+a;
        //
        FramePoints.push(new THREE.Vector3(temp , i , 0))
        FramePoints.push(new THREE.Vector3(temp , i+1 , 0))
        temp = temp+a;
        FramePoints.push(new THREE.Vector3(temp , i , 0))
        FramePoints.push(new THREE.Vector3(temp , i+1 , 0))
        temp = temp+a;
        FramePoints.push(new THREE.Vector3(temp , i , 0))
        FramePoints.push(new THREE.Vector3(temp , i+1 , 0))
        temp = temp+a;
        FramePoints.push(new THREE.Vector3(temp , i , 0))
        FramePoints.push(new THREE.Vector3(temp , i+1 , 0))
        temp = temp+a;
        FramePoints.push(new THREE.Vector3(temp , i , 0))
        FramePoints.push(new THREE.Vector3(temp , i+1 , 0))
        //
        temp = temp+a;
        FramePoints.push(new THREE.Vector3(temp , i , 0))
        FramePoints.push(new THREE.Vector3(temp , i+1 , 0))
    }
    for(var i = -4.5 ; i < 4.5 ; i++){
        //세로선 그리기
        FramePoints.push(new THREE.Vector3(i , -4.5 , 0))
        FramePoints.push(new THREE.Vector3(i+1 , -4.5 , 0))
        FramePoints.push(new THREE.Vector3(i , -3.5 , 0))
        FramePoints.push(new THREE.Vector3(i+1 , -3.5 , 0))
        FramePoints.push(new THREE.Vector3(i , -2.5 , 0))
        FramePoints.push(new THREE.Vector3(i+1 , -2.5 , 0))
        FramePoints.push(new THREE.Vector3(i , -1.5 , 0))
        FramePoints.push(new THREE.Vector3(i+1 , -1.5 , 0))
        FramePoints.push(new THREE.Vector3(i , -0.5 , 0))
        FramePoints.push(new THREE.Vector3(i+1 , -0.5 , 0))
        FramePoints.push(new THREE.Vector3(i , 0.5 , 0))
        FramePoints.push(new THREE.Vector3(i+1 , 0.5 , 0))
        FramePoints.push(new THREE.Vector3(i , 1.5 , 0))
        FramePoints.push(new THREE.Vector3(i+1 , 1.5 , 0))
        FramePoints.push(new THREE.Vector3(i , 2.5 , 0))
        FramePoints.push(new THREE.Vector3(i+1 , 2.5 , 0))
        FramePoints.push(new THREE.Vector3(i , 3.5 , 0))
        FramePoints.push(new THREE.Vector3(i+1 , 3.5 , 0))
        FramePoints.push(new THREE.Vector3(i , 4.5 , 0))
        FramePoints.push(new THREE.Vector3(i+1 , 4.5 , 0))
    }
    var FrameGeometry = new THREE.BufferGeometry().setFromPoints(FramePoints);
    var Frame = new THREE.LineSegments(FrameGeometry, FrameMaterials);
    Frame.rotation.x = -Math.PI / 2;
    scene.add(Frame);

    // 붉은색 스트라이크존 Grid
    var RedFrameMaterials = new THREE.LineBasicMaterial({ color: 0xFF00FF, linewidth: 2 });
    var RedFramePoints = [];
    for(var i = -1.5 ; i < 2.5 ; i++){
        // 가로선 그리기
        a = 9/8;
        RedFramePoints.push(new THREE.Vector3(-4.5+(2*a) , i , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(2*a) , i+1 , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(3*a) , i , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(3*a) , i+1 , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(4*a) , i , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(4*a) , i+1 , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(5*a) , i , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(5*a) , i+1 , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(6*a) , i , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(6*a) , i+1 , 0))
    }
    for(var i = -1.5 ; i < 3.5 ; i++){
        //세로선 그리기
        a = 9/8;
        RedFramePoints.push(new THREE.Vector3(-4.5+(2*a) , i , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(3*a) , i , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(3*a) , i , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(4*a) , i , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(4*a) , i , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(5*a) , i , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(5*a) , i , 0))
        RedFramePoints.push(new THREE.Vector3(-4.5+(6*a) , i , 0))
    }
    var RedFrameGeometry = new THREE.BufferGeometry().setFromPoints(RedFramePoints);
    var RedFrame = new THREE.LineSegments(RedFrameGeometry, RedFrameMaterials);
    RedFrame.rotation.x = -Math.PI / 2;
    scene.add(RedFrame);

    // 4. Materials - 공 생성
    var FFGeometry = new THREE.Geometry(); // Fastball Fourseam 0xFF0000(빨강)
    var FFmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0xFF0000, opacity:0.7 })

    var FTGeometry = new THREE.Geometry(); // Fastball Twoseam 0xFFFF00(노랑)
    var FTmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0xFFFF00 })

    var FCGeometry = new THREE.Geometry(); // Fastball Cutter 0x00FF00(초록)
    var FCmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0x00FF00 })

    var CHGeometry = new THREE.Geometry(); // Change Up 0x0000FF(파랑)
    var CHmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0x0000FF })

    var CUGeometry = new THREE.Geometry(); // Curve Ball 0x00FFFF(아쿠아)
    var CUmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0x00FFFF })

    var SLGeometry = new THREE.Geometry(); // SLider 0xFF00FF(마젠타)
    var SLmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0xFF00FF })

    for (var i = 0; i < pitch_type.length; i++) {
        var vertex = new THREE.Vector3(parseFloat(plate_x[i]), parseFloat(plate_z[i]), 0.1); // Vertex 좌표 생성
        var temp_pitch_type = pitch_type[i];
        switch (temp_pitch_type) {
            case 'FF':
                FFGeometry.vertices.push(vertex);
                break;
            case 'FT':
                FTGeometry.vertices.push(vertex);
                break;
            case 'FC':
                FCGeometry.vertices.push(vertex);
                break;
            case 'CH':
                CHGeometry.vertices.push(vertex);
                break;
            case 'CU':
                CUGeometry.vertices.push(vertex);
                break;
            case 'SL':
                FTGeometry.vertices.push(vertex);
                break;
        }
    }

    // 점 생성
    var FF = new THREE.Points(FFGeometry, FFmaterial);
    var FT = new THREE.Points(FTGeometry, FTmaterial);
    var FC = new THREE.Points(FCGeometry, FCmaterial);
    var CH = new THREE.Points(CHGeometry, CHmaterial);
    var CU = new THREE.Points(CUGeometry, CUmaterial);
    var SL = new THREE.Points(SLGeometry, SLmaterial);

    FF.translateY(0.1);
    FF.translateZ(2);
    FF.rotation.x = -Math.PI / 2;
    FT.translateY(0.11);
    FT.translateZ(2);
    FT.rotation.x = -Math.PI / 2;
    FC.translateY(0.12);
    FC.translateZ(2);
    FC.rotation.x = -Math.PI / 2;
    CH.translateY(0.13);
    CH.translateZ(2);
    CH.rotation.x = -Math.PI / 2;
    CU.translateY(0.14);
    CU.translateZ(2);
    CU.rotation.x = -Math.PI / 2;
    SL.translateY(0.15);
    SL.translateZ(2);
    SL.rotation.x = -Math.PI / 2;

    // scene에 점 추가
    scene.add(FF);
    scene.add(FT);
    scene.add(FC);
    scene.add(CH);
    scene.add(CU);
    scene.add(SL);

    // 5. Renderer
    var renderer = new THREE.WebGLRenderer({ antialise: true }); // 안티엘리어싱-true : 선명하게
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.85); // Canvas의 Size를 브라우저 크기로 조절
    document.body.appendChild(renderer.domElement);

    // InterFace :: Orbit Controls 추가
    // 카메라와 마우스 상호작용을 위해 OrbitControls를 설정합니다.
    var controls = new MapControls(camera, renderer.domElement);
    // controls.target.set(0,2,0);
    controls.update();

    function animate() {

        requestAnimationFrame(animate);

        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();

        renderer.render(scene, camera);
    }

    //InterFace :: GUI
    //구질에 대한 체크박스를 만들어 표시
    var GuiControls = new function () {
        this.FF = true;
        this.FT = true;
        this.FC = true;
        this.CH = true;
        this.CU = true;
        this.SL = true;
    }

    var Gui = new dat.GUI({ autoPlace: false });
    // domElement 세팅
    Gui.domElement.id = 'Gui';
    var Gui_Container = document.getElementById('Gui_Container');
    Gui_Container.appendChild(Gui.domElement);

    // gui에 탭 추가 및 아이템에 이벤트 추가 (onChange)
    var Flag_FF = 0;
    Gui.add(GuiControls, 'FF').onChange(
        function (params) {
            if ((Flag_FF % 2) == 0) {
                scene.remove(FF);
            }
            if ((Flag_FF % 2) == 1) {
                scene.add(FF);
            }
            Flag_FF++;
        }
    );

    var Flag_FT = 0;
    Gui.add(GuiControls, 'FT').onChange(
        function (params) {
            if ((Flag_FT % 2) == 0) {
                scene.remove(FT);
            }
            if ((Flag_FT % 2) == 1) {
                scene.add(FT);
            }
            Flag_FT++;
        }
    );

    var Flag_FC = 0;
    Gui.add(GuiControls, 'FC').onChange(
        function (params) {
            if ((Flag_FC % 2) == 0) {
                scene.remove(FC);
            }
            if ((Flag_FC % 2) == 1) {
                scene.add(FC);
            }
            Flag_FC++;
        }
    );

    var Flag_CH = 0;
    Gui.add(GuiControls, 'CH').onChange(
        function (params) {
            if ((Flag_CH % 2) == 0) {
                scene.remove(CH);
            }
            if ((Flag_CH % 2) == 1) {
                scene.add(CH);
            }
            Flag_CH++;
        }
    );

    var Flag_CU = 0;
    Gui.add(GuiControls, 'CU').onChange(
        function (params) {
            if ((Flag_CU % 2) == 0) {
                scene.remove(CU);
            }
            if ((Flag_CU % 2) == 1) {
                scene.add(CU);
            }
            Flag_CU++;
        }
    );

    var Flag_SL = 0;
    Gui.add(GuiControls, 'SL').onChange(
        function (params) {
            if ((Flag_SL % 2) == 0) {
                scene.remove(SL);
            }
            if ((Flag_SL % 2) == 1) {
                scene.add(SL);
            }
            Flag_SL++;
        }
    );

    // Div(Scene)에 Renderer를 등록
    function render() {
        renderer.render(scene, camera);
    }

    document.getElementById("threejs_scene").appendChild(renderer.domElement);
    render();
    animate();
}