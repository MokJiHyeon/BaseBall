//-------------------------------------------- 데이터 로드 파트 --------------------------------------------//
// Excel data 초기화
var excelData = '';
var pitch_type = Array();
var plate_x = Array();
var plate_z = Array();

// Ajax로 서버와 통신 (readExcels/Hyun-Jin_Ryu) ==> 차후 수정 예정 (선수명을 data로 전송)
$.ajax({
    type: 'GET',
    url: '/readExcels/Hyun-Jin_Ryu',
    data: '',
    dataType: 'json',
    success: function (data) {
        // Hyun-Jin_Ryu의 Excel 데이터를 서버로부터 제공받음.
        excelData = Json2Array(data);
        DataInitialize(excelData);
        console.log('data loaded Perfectly')
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

//-------------------------------------------- 데이터 로드 파트 END ----------------------------------------//
//-------------------------------------------- Three.js 파트 Start ----------------------------------------//
// ES6에서는 모듈 Load를 import로 한다.
import * as THREE from '../lib/Three.js/three.module.js';
import { OrbitControls } from '../lib/Three.js/OrbitControls.js';
import { TrackballControls } from '../lib/Three.js/TrackballControls.js';
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
    var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 90, 0); // x, y, z
    camera.lookAt(scene.position);

    // 3. Light (생략)

    // 4. Materials - 스트라이크존
    var StrikeZoneGeometry = new THREE.PlaneGeometry(24, 24, 1, 1);
    var StrikeZoneMaterial = new THREE.MeshBasicMaterial({ color: 0xCCCCCC });
    var StrikeZone = new THREE.Mesh(StrikeZoneGeometry, StrikeZoneMaterial);
    StrikeZone.rotation.x = -0.5 * Math.PI;
    scene.add(StrikeZone);

    var wireframeGeometry = new THREE.EdgesGeometry(StrikeZone.geometry);
    var wireframeMaterials = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })
    var wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterials);
    StrikeZone.add(wireframe);


    // 4. Materials - 공 생성
    var FFGeometry = new THREE.Geometry(); // Fastball Fourseam 0xFF0000(빨강)
    var FFmaterial = new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, color: 0xFF0000 })

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
        var vertex = new THREE.Vector3(parseFloat(plate_z[i]) * 2.54 *3, 0, parseFloat(plate_x[i]) * 2.54 *3); // Vertex 좌표 생성
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
    var controls = new OrbitControls(camera, renderer.domElement);
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

    // gui에 탭 추가
    Gui.add(GuiControls, 'FF');
    Gui.add(GuiControls, 'FT');
    Gui.add(GuiControls, 'FC');
    Gui.add(GuiControls, 'CH');
    Gui.add(GuiControls, 'CU');
    Gui.add(GuiControls, 'SL');

    // Div(Scene)에 Renderer를 등록
    function render() {
        renderer.render(scene, camera);
    }

    document.getElementById("threejs_scene").appendChild(renderer.domElement);
    render();
    animate();
}