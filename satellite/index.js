var c = 0;

// once everything is loaded, we run our Three.js stuff.
var three, camera, composer, renderer, effect, scene, timeline, earth, earthContainer, skybox,
    innerRing, outerRing, ambientLayer, blurs;
var disableEvent = false;
var rotateControl = true;
var earthRotate = false;
var outlinePass; //光晕
var earthRotateSP = undefined;
var isInHistory = false; //在历史沿革中吗
var isInSilkRoad = false;
var isInGlobalMonitor = false;
var earthStationObject = new THREE.Object3D();
var click1th = {}; //第一次点击的时间
var click2th = {}; // 第二次点击
// var now = (new Date()).getFullYear();
// var now  = 2019;
var firstClick = 0;
var temperature = null;
var rain = null;
var isLastRotate = false;
var addedState
var isInHotEvent = false;
var isInSwiper = false;

var PLAN2D = 2;
var PLAN3D = 3;

var sceneInShow = [];

var mapMode = 3; //   分辨地球所处的模式   3表示球体，2表示平面
var stationContainer = null;
/**
 * hot
 */
// var targetEarthRotationX = THREE.Math.degToRad(-200);;
// var targetEarthRotationY = THREE.Math.degToRad(30);
var targetEarthRotationX = 0;
var targetEarthRotationY = 0.4;

var jiangshui;


var hotspot, dirLight1, dirLight2, ambientLight, detailViewScreen, viewScreen, viewScreen2,
    viewScreen3, viewScreen4, closeButton;
var fire1, fire2, fire3, fire4;
var hadClickedTimelineHotSpot = false;
var waitingToReplay = false;
var radius = 160;
var hotspotYOffset = 0.45;
// var targetRotationX = Math.PI / 180 * -365; //这货是什么
// var targetRotationX  = 0;
var targetRotationOnMouseDownX = 0;
var targetRotationY = 0;
var targetRotationOnMouseDownY = 0;
var targetEarthRotationOnMouseDownX = 0;
var targetEarthRotationOnMouseDownY = 0;
var targetSceneRotationY = 0;
var targetSceneRotationX = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var mouseY = 0;
var mouseYOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var finalRotationY;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var PI2 = Math.PI * 2;
var objects = [];
var locked = false;
var showingDetail = false;
var showingSynopsis = false;
var grabbedEarth = false;
var grabbedTimeline = false;
var lastTime = Date.now();
var playSpeed = 0;
var finishedDrift = true;

var hotspot_alt1 = new THREE.Object3D(),
    hotspot_alt2 = new THREE.Object3D();
var timelineRot = 0;
var timeLinePosition = null;
var gundongmap = {
    top1: 0,
    height1: 0,
    index1: 0,
    top2: 0,
    height2: 0,
    index1: 0
};
var dataSelMap = {
    "guance": 1,
    "yaosu": 0,
    "huoqu": 0,
    "ziliao": 0,
    "type": "",
    "name": "",
    "clickDiv": "guance_Icon"
};
var areaStation;
var lunbo = {
    times: 30,
    lines: 10,
    sss: '',
    index: 0,
    top: 0
};

var earthPosition = null;
var maxPlayRad = 6.3;
var minPlayRad = 1.6;
// var earth = {};
var container, stats;
var group;
var datas;
var scaleN = 1.2;
var scaleM = 2.4;
// 飞机标记
var planeMarkers = {};
// 时间相关站点的数组
var timeTypes = ["NationalWelkinStation", "NationalGroundStation", "NationalRadiationStation"];
// 热点事件的数组
var hotEventTypes = ["FRHotEvent", "CNHotEvent"];
// 资源  农业  专题的贴图


var NationalGroundStationArr;
var NationalRadiationStationArr;
var NationalWelkinStationArr;
var foreignSyncSatellites;
var nativeSyncSatellites;
var foreignPolarSatellites;
var nativePolarSatellites;
var airplaneLineArr;
var duopuleRadar;
var windGisArr;
var data214Arr;
var AgrometeorologicalStationArr;
var trafficArr;
var RADIATIONSTATIONArr;
var shuzhimoshi;
var cldas;
var cmpas;
var cloud;
var AGMEASMArr;
var silkroad;
var UPAR_GPSArr;
var ANIONBRSTATIONArr;
var HYDROLOGYSTATIONArr;
var globalBuoyArr;
var globalseaArr;
var transportArr;
var globalGaokong;
var globalRadiationStationArr;
var turangArr;
var GAWSTATIONArr;
var NEARSURFSTATIONArr;
var AreaStation_kh;
var AreaStation_fkh;
var globalGroundStation;
var boatArr;
var hedaoshuiqing;

// 在图像上面加载着的东西
var mapStations = [];

//平面对象的缓冲
var D2_NationalGroundStationArr;
var D2_NationalRadiationStationArr;
var D2_NationalWelkinStationArr;
var D2_foreignSyncSatellites;
var D2_nativeSyncSatellites;
var D2_foreignPolarSatellites;
var D2_nativePolarSatellites;
var D2_airplaneLineArr;
var D2_duopuleRadar;
var D2_windGisArr;
var D2_data214Arr;
var D2_AgrometeorologicalStationArr;
var D2_trafficArr;
var D2_RADIATIONSTATIONArr;
var D2_shuzhimoshi;
var D2_cldas;
var D2_cmpas;
var D2_AGMEASMArr;
var D2_silkroad;
var D2_UPAR_GPSArr;
var D2_ANIONBRSTATIONArr;
var D2_HYDROLOGYSTATIONArr;
var D2_globalBuoyArr;
var D2_globalseaArr;
var D2_transportArr;
var D2_globalGaokong;
var D2_globalRadiationStationArr;
var D2_turangArr;
var D2_GAWSTATIONArr;
var D2_NEARSURFSTATIONArr;
var D2_AreaStation_kh;
var D2_AreaStation_fkh;
var D2_globalGroundStation;
var D2_boatArr;
var D2_hedaoshuiqing;
var D2_jiangshui;
//光晕效果初始值

// var now = (new Date()).getFullYear();
//用来存放展示的图层
var tuceng = [];
var nameBox = $('#showName');
// 飞机形状
var planeShape = new THREE.Shape();
planeShape.moveTo(0, 0);
planeShape.lineTo(0.2, -0.2);
planeShape.lineTo(0.2, -1.3);
planeShape.lineTo(1.6, -2.7);
planeShape.lineTo(1.6, -3);
planeShape.lineTo(0.2, -2.1);
planeShape.lineTo(0.2, -3);
planeShape.lineTo(0.5, -3.4);
planeShape.lineTo(0.5, -3.7);
planeShape.lineTo(0, -3.3);
planeShape.lineTo(-0.5, -3.7);
planeShape.lineTo(-0.5, -3.4);
planeShape.lineTo(-0.2, -3);
planeShape.lineTo(-0.2, -2.1);
planeShape.lineTo(-1.6, -3);
planeShape.lineTo(-1.6, -2.7);
planeShape.lineTo(-0.2, -1.3);
planeShape.lineTo(-0.2, -0.2);
//$('#introduce').css('display', 'block');
var planeGeometry = new THREE.ShapeGeometry(planeShape);
// 飞机材质
var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    depthTest: true,
    fog: false /*,specular:0xc3e93f*/ ,

});
var winWth = window.innerWidth,
    winHgt = window.innerHeight;


// 创建地球平面
var earthUVcenter = {
    x: 0.2,
    y: 0
};
var earthUVrotate = {
    rotate: 0
};
var earthUVscale = {
    x: 2,
    y: 1
};
var earthUVoffset = {
    x: 0,
    y: 0
};
var earthPlaneWidth = earthUVscale.x * 6 * radius;
var earthPlaneHeight = 3 * radius;
var earthPlaneF = {
    w: 18 * 2 * earthUVscale.x,
    h: 18 * earthUVscale.y
};
console.log(earthPlaneWidth)
var mapPlaneGeo = new THREE.PlaneGeometry(earthPlaneWidth, earthPlaneHeight, earthPlaneF.x, earthPlaneF.y);
var mapLoader = new THREE.TextureLoader();
var month = (new Date()).getMonth();

var maptexture = mapLoader.load('assets/images/earthMap/wtb_' + (+month + 1) + '.jpg');
maptexture.wrapS = maptexture.wrapT = THREE.RepeatWrapping;
maptexture.matrixAutoUpdate = false; // 设置纹理属性matrixAutoUpdate为false以后，纹理将通过matrix属性设置的矩阵更新纹理显示
material = new THREE.MeshBasicMaterial({
    map: maptexture
});
material.map.matrix
    .identity() //矩阵重置
    .translate(-earthUVcenter.x, -earthUVcenter.y) //设置中心点
    .rotate(earthUVrotate.rotate) // 旋转
    .scale(earthUVscale.x, earthUVscale.y) // 设置repeat
    .translate(earthUVcenter.x, earthUVcenter.y) //设置中心点
    .translate(earthUVoffset.x, earthUVcenter.y); //偏移
// material.map.matrix.setUvTransform(0,0,0,0,0,0,0)
var mapPlane = new THREE.Mesh(mapPlaneGeo, material);


mapPlane.rotation.x = THREE.Math.degToRad(0);
mapPlane.position.set(0, 0, -700)


//创建一般平面
var otherCommonPlane = new THREE.PlaneGeometry(earthPlaneWidth / 2, earthPlaneHeight, earthPlaneF.x / 2, earthPlaneF.y);
var P_countryBoundingTexture = mapLoader.load("assets/images/countryBounding.png")
P_countryBoundingTexture.wrapS = P_countryBoundingTexture.wrapT = THREE.RepeatWrapping;
P_countryBoundingTexture.matrixAutoUpdate = false;
var P_countryBoundingMaterial = new THREE.MeshBasicMaterial({
    map: P_countryBoundingTexture,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    opacity: 0.8

});

P_countryBoundingMaterial.map.matrix
    .identity()
    .translate(0, 0)
    .rotate(0)
    .scale(1, 1)
    .translate(0, 0)
    .translate(0.3, 0);
var P_countryBoundingMesh = new THREE.Mesh(otherCommonPlane.clone(), P_countryBoundingMaterial);
P_countryBoundingMesh.position.set(0, 0, 2)
mapPlane.add(P_countryBoundingMesh);


// var boundingMesh = 


var group = new THREE.Object3D();
init();

// targetEarthRotationX = THREE.Math.degToRad(-200);;
// targetEarthRotationY = THREE.Math.degToRad(30);
rotateToLatLngNormal(20, 110, 0, 0, 0);
// addEventListeners();
animate();

/**
 * 根据mapMode 决定显示哪种地图
 */
function toggleEarthMap1() {
    if (mapMode == 2) {
        scene.remove(group);
        sceneInShow.forEach(function(type) {
            removeTypeControl(earth, type)
        })
        group.scale.set(0.1, 0, 0);
        mapPlane.scale.set(scaleN, scaleN, scaleN);
        scene.add(mapPlane);
        sceneInShow.forEach(function(type) {
            addTypeControl(mapPlane, type, PLAN2D)
        })
        stationContainer = mapPlane;



    } else if (mapMode == 3) {
        scene.remove(mapPlane);
        sceneInShow.forEach(function(type) {
            removeTypeControl(mapPlane, type)
        })

        group.scale.set(scaleM, scaleM, scaleM);
        mapPlane.scale.set(0, 0, 0);
        scene.add(group);
        sceneInShow.forEach(function(type) {
            addTypeControl(earth, type, PLAN3D)
        })
        stationContainer = earth;

    }

}



function toggleEarthMap() {
    if (mapMode == 2) {

        stationContainer = mapPlane;

        var tween5 = new TWEEN.Tween({
                scale: scaleN
            }).to({
                scale: 0
            }, 500)
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .onUpdate(function() { // Called after tween.js updates 'coords'.
                scaleN = this.scale;
                group.scale.set(scaleN, scaleN, scaleN);
            })
            .start()
            .onComplete(function() {
                scene.remove(group);
                sceneInShow.forEach(function(type) {
                    removeTypeControl(earth, type)
                });
                sceneInShow.forEach(function(type) {
                    addTypeControl(mapPlane, type, PLAN2D)
                })
                scene.add(mapPlane);

                var tween6 = new TWEEN.Tween({
                        scale: scaleM
                    }).to({
                        scale: 2
                    }).easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                    .onUpdate(function() { // Called after tween.js updates 'coords'.
                        scaleM = this.scale;
                        mapPlane.scale.set(scaleM, scaleM, scaleM);
                    })
                    .start()

            })


    } else if (mapMode == 3) {

        stationContainer = earth;
        var tween5 = new TWEEN.Tween({
                scale: scaleM
            }).to({
                scale: 0
            }, 500)
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .onUpdate(function() { // Called after tween.js updates 'coords'.
                scaleM = this.scale;
                mapPlane.scale.set(scaleM, scaleM, scaleM);
            })
            .start()
            .onComplete(function() {

                sceneInShow.forEach(function(type) {
                    removeTypeControl(mapPlane, type)
                })
                sceneInShow.forEach(function(type) {
                    addTypeControl(earth, type, PLAN3D)
                })
                console.log(scaleN)
                scene.remove(mapPlane);
                scene.add(group);
                var tween6 = new TWEEN.Tween({
                        scale: scaleN
                    }).to({
                        scale: 1.5
                    }).easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                    .onUpdate(function() { // Called after tween.js updates 'coords'.
                        scaleN = this.scale;
                        group.scale.set(scaleN, scaleN, scaleN);
                    })
                    .start()

            })


    }

}
$("#planeGlobe").click(function() {
    if (mapMode == 2) {
        mapMode = 3;
    } else {
        mapMode = 2;
    }
    toggleEarthMap();
})


$(function() {
    createTuliBox(); //生成全球监测的图例
    // console.log(new Date().toISOString())
    $.getJSON('./data/data5.json', function(data) {
            datas = data;
            // 创建国家地面站实体（球体坐标的实体）
            NationalGroundStationArr = TimeReStations("NationalGroundStation", datas["NationalGroundStation"], createNationalGroundStationPlane, PLAN3D);
            // 创建国家地面站实体 （平面坐标的实体）
            D2_NationalGroundStationArr = TimeReStations("NationalGroundStation", datas["NationalGroundStation"], createNationalGroundStationPlane, PLAN2D);
            // 在右侧显示当年站点累计数量的容器
            initShowNum();
            $(".zileixing").on("click", function(event) {
                debugger
                event.preventDefault();
                event.stopPropagation();
                var type = $(this).attr("type");
                var name = $(this).attr("name");
                $(this).toggleClass('active3');
                if ($(this).hasClass("active3")) {
                    dataSelMap.type = type;
                    dataSelMap.name = name;
                    IntroduceBox();
                }
                if (type == "HYDROLOGY_STATION" || type == "AreaStation") {
                    $("." + type + "_list").toggle();
                    if ($("." + type + "_list").css("display") == "none") {
                        var liArray = $("." + type + "_list li.active1");
                        if (liArray != undefined && liArray.length > 0) {
                            liArray.each(function(i, n) {
                                $(this).attr('trigger', true).click()
                            });
                        }
                    } else {
                        $("." + type + "_list li:nth-child(1)").attr('trigger', true).click();
                    }
                }

                changeTuceng();
            });

            //左侧菜单栏点击事件
            $(".leixing").on("click", function(event) {
                event.stopPropagation();
                var that = $(this);
                tuceng = [];
                /*var audioEle = $("#ring1")[0];
                 audioEle.play(); //播放*/
                // 响铃 
                ring();
                var type = $(this).attr("type");
                if (type == undefined) {
                    return;
                }
                // console.log($(this).attr("name"));
                var name = $(this).attr("name");


                //更改按钮的选中状态
                $(this).toggleClass('active1');


                // 增加和删除丝绸之路左侧的图例
                if ($(this).attr("type") == "silkroad") {

                    if (that.hasClass("active1")) {
                        var img = document.createElement("img");
                        img.src = "./assets/images/silkroad_tuli.png";
                        img.id = "silkroad_tuli";
                        img.style.width = "0.95rem";
                        img.style.height = "0.95rem";
                        img.style.position = "absolute";
                        img.style.top = "5.6rem";
                        img.style.left = "3.2rem";
                        $(".container")[0].appendChild(img);
                    } else {
                        $(".container")[0].removeChild(document.getElementById("silkroad_tuli"));
                    }
                }


                if (this.className != 'leixing active1') {
                    $('#echart2').css('display', 'none');
                    $('#title').css('display', 'none');
                    $('.tab').css('display', 'none');
                }

                //数据显示控制部分
                var type = $(this).attr("type");
                if (type == undefined) {
                    return;
                }
                var typeIndex = State.types.indexOf(type);
                var hotEventTypesIndex = State.hotEventTypes.indexOf(type);


                // 在地图上增减不同类型的站点
                if (!$(this).hasClass("active1")) {
                    // 在缓存数组中移除对应的类型
                    removeTypeInScene(type);
                    // 移除对应对应类型实体对象上绑定的事件 并在地图上移除对应的类型
                    removeTypeControl(stationContainer, type);
                } else {
                    // 
                    addTypeInScene(type);
                    addTypeControl(stationContainer, type, mapMode)
                }
                if (State.types.length > 0) {
                    //if (playSpeed != 0) {

                    // 隐藏累计站点年份
                    if (isInSilkRoad || isInGlobalMonitor) {
                        $(".stationNumber").hide();
                    } else {
                        $(".stationNumber").show();
                    }
                    State.types.forEach(function(type) {
                            var num = 0;
                            console.log(type);
                            //这里需要一个代理来直接作为父元素，然后通过更换指向的地址获取对应的东西
                            stationContainer.getObjectByName(type).children.forEach(function(year) {
                                num += year.children.length
                            })

                            // 显示大当年的站点数量
                            $(".singleType." + type + " .year").html(num);
                        })
                        // 显示年份
                    $(".stationNumber>.year>.num").html(State.year);
                } else {
                    $(".stationNumber").hide();
                }
                var activeArray = $(".active1");
                // 修改已经选中的图层信息
                activeArray.each(function(i, n) {
                    var obj = {};
                    obj[n.type] = n.innerText;
                    tuceng.push(obj);

                });
                changeTuceng();


            })

            // 初始化后直接加载国家地面站
            $("[type='NationalGroundStation']").click();
            // renderer.render(scene,camera);
            // console.log(new Date().toISOString())
            // 国家高空站数据
            NationalWelkinStationArr = TimeReStations("NationalWelkinStation", datas["NationalWelkinStation"], createNationalWelkinStation, PLAN3D);
            D2_NationalWelkinStationArr = TimeReStations("NationalWelkinStation", datas["NationalWelkinStation"], createNationalWelkinStation, PLAN2D);
            // 国家雷达站数据
            NationalRadiationStationArr = TimeReStations("NationalRadiationStation", datas["NationalRadiationStation"], createNationalRadiationStation, PLAN3D);
            D2_NationalRadiationStationArr = TimeReStations("NationalRadiationStation", datas["NationalRadiationStation"], createNationalRadiationStation, PLAN2D);

            // 国内十大事件
            CNHotEventArr = hotEvents("CNHotEvent", datas["CNHotEvent"], HotEvent, PLAN3D);
            D2_CNHotEventArr = hotEvents("CNHotEvent", datas["CNHotEvent"], HotEvent, PLAN2D);

            // 国外十大事件
            FRHotEventArr = hotEvents("FRHotEvent", datas["FRHotEvent"], HotEvent, PLAN3D);
            D2_FRHotEventArr = hotEvents("FRHotEvent", datas["FRHotEvent"], HotEvent, PLAN2D);


            //静止卫星        
            foreignSyncSatellites = SyncSatellites("ForeignSyncSatellite", datas["ForeignSyncSatellite"], PLAN3D);
            nativeSyncSatellites = SyncSatellites("NativeSyncSatellite", datas["NativeSyncSatellite"], PLAN3D);

            D2_foreignSyncSatellites = SyncSatellites("ForeignSyncSatellite", datas["ForeignSyncSatellite"], PLAN2D);
            D2_nativeSyncSatellites = SyncSatellites("NativeSyncSatellite", datas["NativeSyncSatellite"], PLAN2D);


            //极轨卫星
            nativePolarSatellites = PolarSatellite("NativePolarSatellite", datas["NativePolarSatellite"]);
            foreignPolarSatellites = PolarSatellite("ForeignPolarSatellite", datas["ForeignPolarSatellite"]);
            //

            // airplaneLineArr  D2_airplaneLineArr全球飞机 ，存储在这个全局变量里面了
            plane();

            // 初始化全球船舶  boatArr  D2_boatArr
            getBoatLine();
            getBoatLine1()


            // 丝绸之路
            silkroad = silkRoad("silkroad", datas["silkroad"], 2);
            silkroad.add(getSilkRoadGlobe('silkroad', "./assets/images/silkroad.png", 2, 1));
            silkroad.add(getSilkRoadGlobe('silkroad', "./assets/images/silkroadRange.png", 2, 0.8));
            D2_silkroad = silkRoad("silkroad", datas["silkroad"], 2, PLAN2D);
            D2_silkroad.add(getGlobe('silkroad', "./assets/images/silkroad.png", 2, 1, PLAN2D))
            D2_silkroad.add(getGlobe('silkroad', "./assets/images/silkroadRange.png", 2, 0.8, PLAN2D))

            // 右下方的 一带一路集  国内十大事件 国外十大事件  历史沿革  全球监测 点击事件
            $(".bottomBox li").on("click", function() {
                var id = $(this).attr("id");
                var child = $(this).children();
                var types = [];
                var TypesIndex = State.hotEventTypes.indexOf(id);
                $(this).siblings().each(function(index, dom) {
                    if ($(this).hasClass("bsel")) {
                        $(this).click();
                    }
                })
                if (id == "silkroad") {

                    // 一带一路
                    // 国内静止气象卫星
                    // 全球高空探测资料
                    // 中国高空探测资料
                    // 全球地面站资料
                    // 中国国家地面站
                    // 全球船舶资料
                    // 全球浮标
                    // 全球海洋潮位

                    if (!$(this).hasClass("bsel")) {
                        $(this).siblings().removeClass("bsel");
                        !$(this).addClass("bsel");
                        isInSilkRoad = true;
                        $(".radiationList li[type='silkroad']").click();

                        $(".left li[type='globalGaokong']").click();
                        $(".left li[type='NationalWelkinStation']").click();
                        $(".left li[type='globalGroundStation']").click();
                        $(".left li[type='NationalGroundStation']").click();
                        $(".left li[type='globalShip']").click();
                        $(".left li[type='globalBuoy']").click();
                        $(".left li[type='global_sea']").click();
                        $(".left li[type='NativeSyncSatellite']").click();
                        setTimeout(function() {
                            $(".stationNumber").hide();
                            $(".IntroduceBox").hide();
                            earthRotate = true;
                            rotateToLatLngNormal(10, 110, 0, 0, 0);
                            // scaleTo(1.5);
                        }, 100)

                    } else {
                        isInSilkRoad = false;
                        $(this).removeClass("bsel");
                        $(".stationNumber").attr("style", "");
                        $(".IntroduceBox").attr("style", "");
                        removeAllTypes();
                    }


                } else if (id == "CNHotEvent") {
                    $(".radiationList li[type='CNHotEvent']").attr('trigger', true).click();
                } else if (id == "FRHotEvent") {
                    $(".radiationList li[type='FRHotEvent']").attr('trigger', true).click();
                } else if (id == "history") {

                    if (!$(this).hasClass("bsel")) {
                        !$(this).addClass("bsel");
                        isInHistory = true;
                        showHistory();
                        $(".sateNumber").show();
                        $(".IntroduceBox").hide();
                        // $(".rightLogo").hide();

                    } else {
                        $(this).removeClass("bsel");
                        isInHistory = false;
                        $(".IntroduceBox").attr("style", "");;
                        // $(".rightLogo").show();
                        $(".sateNumber").hide();
                        removeType(stationContainer, "NativeSyncSatellite");
                        removeType(stationContainer, "NativePolarSatellite");
                        removeAllTypes();
                        pause();
                    }
                } else if (id == "agriculture") {
                    if (!$(this).hasClass("bsel")) {
                        $(this).siblings().removeClass("bsel");
                        !$(this).addClass("bsel");
                        showAgri();


                    } else {
                        $(this).removeClass("bsel")
                        removeAllTypes();
                        // pause();
                    }

                } else if (id == "energy") {
                    if (!$(this).hasClass("bsel")) {
                        //   $(this.parentElement).find(".bsel").click();
                        $(this).siblings().removeClass("bsel");
                        !$(this).addClass("bsel");
                        showEnergy();
                        // showHistory();

                    } else {
                        $(this).removeClass("bsel")
                        removeAllTypes();
                        // pause();
                    }

                } else if (id == "globalMonitor") {
                    if (!$(this).hasClass("bsel")) {
                        isInGlobalMonitor = true;
                        //   $(this.parentElement).find(".bsel").click();
                        $(this).siblings().removeClass("bsel");
                        $(this).addClass("bsel");
                        showGlobalMonitor();
                        $(".tulibox").show();

                        // showHistory();

                    } else {
                        isInGlobalMonitor = false;
                        $(this).removeClass("bsel")
                        removeAllTypes();
                        $(".tulibox").hide();
                        // pause();
                    }

                }

            });


            $.getJSON("./data/temperature.json", function(data) {
                temperature = data;
            })
            $.getJSON("./data/rain.json", function(data) {
                rain = data;
            })


            // var planeSilkRoad = createPlaneSilkRoad("silkroad", datas["silkroad"], 2);

            // mapPlane.add(planeSilkRoad)


            // $("#home").click()
        })
        // 反馈按钮绑定事件
    $("#feedback").click(function() {
        $('.masker').show()
    });
});

// 显示能源专题（被去掉了） 
function showEnergy() {
    var energy = getGlobe("energy", "en")
    removeAllTypes();
    $("li[type='NationalGroundStation']").attr('trigger', true).click();
    $("li[type='214']").attr('trigger', true).click();
    $("li[type='WIND_GPS']").attr('trigger', true).click();
    $("li[type='NationalRadiationStation']").attr('trigger', true).click();
    $("li[type='duopuleRadar']").attr('trigger', true).click();
}
// 显示农业专题（被去掉了）
function showAgri() {
    removeAllTypes();
    $("li[type='NationalGroundStation']").attr('trigger', true).click();
    $("li[type='AgrometeorologicalStation']").attr('trigger', true).click();
    $("li[type='NationalRadiationStation']").attr('trigger', true).click();
    $("li[type='NativePolarSatellite']").attr('trigger', true).click();
    $("li[type='NativeSyncSatellite']").attr('trigger', true).click();
}
/***
 * 添加全球监测，实际是将对应的类型全点一遍
 */
function showGlobalMonitor() {


    removeAllTypes();
    $("li[type='globalShip']").click();
    $("li[type='aircraft']").click();
    $("li[type='ForeignSyncSatellite']").click();
    $("li[type='ForeignPolarSatellite']").click();
    $("li[type='NativeSyncSatellite']").click();

    $("li[type='globalGaokong']").click();
    $("li[type='NationalWelkinStation']").click();
    $("li[type='globalGroundStation']").click();
    // $("li[type='NationalGroundStation']").click();
    // $("li[type='NationalGroundStation']").click();
    $("li[type='AreaStation_kh']").click();
    // $("li[type='WIND_GPS']").click();
    // $("li[type='214']").click();
    // $("li[type='traffic']").click();
    // $("li[type='NEARSURF_STATION']").click();
    // $("li[type='UPAR_GPS']").click();
    $("li[type='globalBuoy']").click();
    $("li[type='global_sea']").click();
    $("li[type='globalRadiationStation']").click();
    $("li[type='NationalRadiationStation']").click();
    $("li[type='RADIATION_STATION']").click();
    // $("li[type='AgrometeorologicalStation']").click();
    // $("li[type='AGME_ASM']").click();
    // $("li[type='duopuleRadar']").click();
    // $("li[type='GAW_STATION']").click();
    // $("li[type='ANION_BR_STATION']").click();
    // $("li[type='HYDROLOGY_STATION']").click();
    $("li[type='NativePolarSatellite']").click();


    setTimeout(function() {
        earthRotate = true;
        scaleN = 0.86;
        $(".stationNumber").hide();

        $(".left ul li").on("click", stopMonitor);
    }, 2000)

    function stopMonitor(e) {


        if (!e.originalEvent) { //jq.click()触发的没有这个东西
            console.log("代码点的，不用管")

        } else {

            if (isInGlobalMonitor) {
                $("#globalMonitor").click();
                $(".left ul li").unbind("click", stopMonitor);
            }
        }


    }
}


/**
 * 丝绸之路单独显示，所以要把其他除了国内十大事件 和国外十大事件外的删掉
 * @param typeId
 */
function removeOthers(container, typeAdd) {
    // var array = $(".active1");
    sceneInShow.forEach(function(type) {
        if (type != typeAdd && typeAdd == 'silkroad') {

            removeTypeControl(container, type);
            $("[type=" + type + "]").removeClass('active1');
        } else if ((typeAdd == "CNHotEvent" || typeAdd == "FRHotEvent") && (type != "CNHotEvent" && type != "FRHotEvent")) {
            removeTypeInScene(type);
            removeTypeControl(container, type);
            $("[type=" + type + "]").removeClass('active1');
        }
    })
    changeTuceng();
    IntroduceBox();
}


/**
 * 显示历史进程，各种站点的增长， 历史沿革  点击后展示的内容
 */
function showHistory() {
    removeAllTypes();
    $("li[type='NationalWelkinStation']").attr('trigger', true).click();
    $("li[type='NationalGroundStation']").attr('trigger', true).click();
    $("li[type='NationalRadiationStation']").attr('trigger', true).click();
    // isInHistory = true;
    // gotoBegin();
    targetRotationX = -minRot; // 时间轴转到最后
    // var position = 1.678; //设置到左边的最大角度
    timeline.dial.rotation.y = minRot;

    play(4); //时间轴开始转动
}


/**
 * 移除全部站点
 */
function removeAllTypes() {
    var array = $(".active1");
    array.each(function(i, n) {
        $(this).attr('trigger', true).click()
    })
}


var notu = ["cmpas"];

/***
 * 修改图层信息
 */
function changeTuceng() {
    tuceng = [];
    var activeArray = $(".active1");
    activeArray.each(function(i, n) {
        if (n.type == "HYDROLOGY_STATION") {
            return;
        }
        var obj = {};
        obj[n.type] = n.innerText;
        // console.log(n.type)
        tuceng.push(obj);
    });
    $(".tucengListBox ul").empty();
    if (tuceng.length > 0) {
        /* if (!$(".tucengListBox").hasClass("show'")) {
             $(".tucengListBox").addClass("show");
         }*/
        var html = "";
        $("#nums").show();
        $("#nums").html(tuceng.length);
        for (var i = 0; i < tuceng.length; i++) {
            if (i == (tuceng.length - 1)) {
                for (var key in tuceng[i]) {
                    if (notu.indexOf(key) !== -1) {
                        html += "<li style='border-bottom:none;'><div class='tl'  type='" + key + "' name='" + tuceng[i][key] + "'><span>" + tuceng[i][key] + "</span></div><div class='lclose' type='" + key + "' ></div></li>";
                    } else {

                        html += "<li style='border-bottom:none;'><div class='tl'  type='" + key + "' name='" + tuceng[i][key] + "'><img src = './assets/images/earth_icon/" + key + ".png'/><span>" + tuceng[i][key] + "</span></div><div class='lclose' type='" + key + "' ></div></li>";
                    }
                    // html += "<li style='border-bottom:none;'><div class='tl'  type='" + key + "' name='" + tuceng[i][key] + "'><div class='licon'></div><span>" + tuceng[i][key] + "</span></div><div class='lclose' type='" + key + "' ></div></li>";
                }
            } else {
                for (var key in tuceng[i]) {
                    if (notu.indexOf(key) !== -1) {
                        html += "<li style='border-bottom:none;'><div class='tl'  type='" + key + "' name='" + tuceng[i][key] + "'><span>" + tuceng[i][key] + "</span></div><div class='lclose' type='" + key + "' ></div></li>";
                    } else {
                        html += "<li><div class='tl'  type='" + key + "' name='" + tuceng[i][key] + "'><img src = './assets/images/earth_icon/" + key + ".png'/><span>" + tuceng[i][key] + "</span></div><div class='lclose' type='" + key + "'></div></li>";
                    }
                }
            }
        }
        $(".tucengListBox ul").html(html);
        $(".tucengListBox .lclose").unbind();
        $(".tucengListBox .lclose").on("click", function() {
            var type = $(this).attr("type");
            var array = $(".active1");
            array.each(function(i, n) {
                if (n.type == type) {
                    $(this).attr('trigger', true).click()
                }
            });
        });
        $(".tucengListBox .tl").on("click", function() {
            var type = $(this).attr("type");
            var name = $(this).attr("name");
            dataSelMap.type = type;
            dataSelMap.name = name;
            IntroduceBox();
        });


    } else {
        $("#nums").hide();
        var liArray = $(".active3");
        if (liArray == undefined || liArray.length == 0) {
            $(".IntroduceBox").removeClass("show");
        }
        $(".tucengListBox").removeClass("show");
    }
}

/**
 * 响铃
 */
function ring() {
    var audioEle = $("#ring1")[0];
    audioEle.play(); //播放
}

/**
 * 左侧介绍栏目
 */
function IntroduceBox() {
    var dataObj = mapList[dataSelMap.type];
    if (dataObj != undefined) {
        if (!$(".IntroduceBox").hasClass("show")) {
            $(".IntroduceBox").addClass("show");
        }
        //1、初始化折线图
        var datas = dataObj["datas"];
        if (datas != undefined && datas != "") {
            var dataValue = datas.data;
            var years = datas.years;
            var addValue = [0, datas.sum];

            $(".charBox").show();
            initDataChar(dataValue, years, addValue);
        } else {
            $(".charBox").hide();
        }

        //2、完善元数据
        var digest = dataObj["digest"];
        if (digest != undefined && digest.length > 0 && digest != "") {
            $(".digestBox").show();
            $(".digestBox #content").html(digest);

            debugger
            gundongmap.height1 = $(".digestBox #content").height();
            gundongmap.top1 = 0;
            $(".digestBox #content").css("top", "0px");
            if (gundongmap.height1 > $(".digestBox .contentBox").height()) {
                $("#line1").show();
                /* if ($("#line1").hasClass("up")) {
                     $("#line1").removeClass("up");
                     $("#line1").addClass("down");
                 }*/
                $("#line1 .up").hide();
                $("#line1 .down").show();
            } else {
                $("#line1").hide();
            }
        } else {
            $(".digestBox").hide();
            //$(".digestBox #content").html("");
        }
        //3、根据选中条件显示

        changeothers(dataObj);

    } else {
        /*$(".digestBox #content").html("");
         $("#topChar").hide();
         var title=$(".cel").text();
         $(".detailBox .titles").html(title);
         $(".detailBox #content").html("");*/
        var flag = true;
        for (var i = 0; i < tuceng.length; i++) {
            for (var key in tuceng[i]) {
                if (key == "NationalWelkinStation" || key == "NationalGroundStation" || key == "NationalRadiationStation") {
                    flag = false;
                }
            }
        }
        if (flag) {
            $(".IntroduceBox").removeClass("show");
        } else {
            $(".digestBox").hide();
            $(".charBox").hide();
            $(".detailBox").hide();
        }

        //$(".digestBox").hide();
    }
};

function changeothers(dataObj) {
    if (dataObj != undefined) {
        var selDiv = "";
        for (var key in dataSelMap) {
            if (dataSelMap[key] == 1) {
                selDiv = key;
            }
        }
        var title = "";
        var content = "";
        if (selDiv == "") {
            $(".detailBox").hide();
        } else {
            title = $(".cel").text();
            if (selDiv == "guance") {
                var scale = dataObj["scale"]; //中国
                var spatialResolution = dataObj["spatialResolution"];
                var timeRange = dataObj["timeRange"];
                var timeResolution = dataObj["timeResolution"];
                var updateTimes = dataObj["updateTimes"];
                var level = dataObj["level"];
                content = "";
                if (timeRange != undefined && timeRange != "") {
                    content += timeRange + ",";
                }
                if (scale != undefined && scale != "") {
                    content += "在" + scale + "范围内"
                }
                if (spatialResolution != undefined && spatialResolution != "") {
                    content += dataSelMap.name + "的空间分辨率为" + spatialResolution;
                }
                if (level != undefined && level != "") {
                    content += ",产品级别为" + level;
                }
                if (timeResolution != undefined && timeResolution != "") {
                    content += "，时间分辨率为" + timeResolution;
                }
                if (updateTimes != undefined && updateTimes != "") {
                    content += ",更新频率为" + updateTimes;
                }
                if (content.length > 0) {
                    content = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + content;
                }
            } else if (selDiv == "yaosu") {
                if (dataObj["factorContent"] == undefined || dataObj["factorContent"].length == 0) {
                    content = "";
                } else {
                    content = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + dataObj["factorContent"];
                }
            } else if (selDiv == "ziliao") {
                if (dataObj["dataSource"] == undefined || dataObj["dataSource"].length == 0) {
                    content = "";
                } else {
                    content = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + dataObj["dataSource"];
                }
            } else if (selDiv == "huoqu") {
                if (dataObj["access"] == undefined || dataObj["access"].length == 0) {
                    content = "";
                } else {
                    content = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + dataObj["access"];
                }
            }
            /*if(content.length==0){
             $(".detailBox").hide();
             } else {
             $(".detailBox").show();
             }*/
            $(".detailBox .titles").html(title);
            $(".detailBox #content").html(content);
            var cel = $(".cel");
            if (cel.length > 0) {
                if (content.length > 0) {
                    $(".detailBox").show();
                } else {
                    $(".detailBox").hide();
                }
            } else {
                $(".detailBox").hide();
            }
            gundongmap.height2 = $(".detailBox #content").height();
            gundongmap.top2 = 0;
            $(".detailBox #content").css("top", "0px");
            if (gundongmap.height2 > $(".detailBox .contentBox").height()) {
                $("#line2").show();
                if ($("#line2").hasClass("up")) {
                    $("#line2").removeClass("up");
                    $("#line2").addClass("down");
                }
                $("#line2 .down").show();
                $("#line2 .up").hide();
            } else {
                $("#line2").hide();
            }
            /*gundongmap.height2=$(".detailBox #content").height();
             gundongmap.top2=0;*/
        }
    }
}

/**
 * 点击国家地面站的时候显示历史降水和 历史气温
 */
function initDataChar(dataArray, yearArray, addValue) {
    var myChar = echarts.init(document.getElementById('topChar'));
    var options = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '9%',
            right: '6%',
            bottom: '2%',
            top: '20%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: yearArray,
            axisTick: {
                alignWithLabel: false
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#96EFFB', //坐标值得具体的颜色
                    fontSize: 10,
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#96EFFB'

                }
            }
        }],
        yAxis: [{
            name: '资料数据量(GB)',
            nameLocation: 'end',
            nameTextStyle: {
                fontSize: 8,
                align: 'left',
                padding: 20

            },
            nameGap: 5,
            splitNumber: 4,
            type: 'value',
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#96EFFB', //坐标值得具体的颜色
                    fontSize: 8,
                }
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#96EFFB'

                }
            }
        }],
        legend: {
            data: ['增量'],
            textStyle: {
                color: '#2099fb'
            },
            top: 0,
            right: 0,
            itemHeight: 6,
            itemWidth: 12
        },
        tooltip: {
            formatter: function(params) {
                var index = params.dataIndex;
                return params.name + "<br/>年累积量:" + dataArray[index] + "GB<br/>年增量:" + addValue[index] + "GB";
            }
        },
        series: [{
                name: '年累积量',
                type: 'bar',
                barWidth: '20%',
                data: [dataArray[0], dataArray[0]],
                stack: '逐年变化',
                itemStyle: {
                    normal: {
                        color: '#0f3e64',
                        opacity: 0.7,
                    }
                }
            },
            {
                name: '增量',
                type: 'bar',
                barWidth: '20%',
                data: addValue,
                stack: '逐年变化',
                itemStyle: {
                    normal: {
                        color: '#2099fb',
                        opacity: 0.6,
                        /*label : {show: true}*/
                    }
                }

            }, {
                name: '逐年变化',
                type: 'line',
                barWidth: '30%',
                data: dataArray,
                itemStyle: {
                    normal: {
                        color: '#fbae1b',
                        label: {
                            show: true,
                            borderColor: '#2099fb',
                            borderWidth: 1
                        }
                    },
                }
            }
        ]
    };
    // 为echarts对象加载数据
    myChar.setOption(options);
    var jiantou = $(".jiantou");
    if (jiantou != undefined && jiantou.length == 1) {
        $(".jiantou").html(addValue[1]);
    } else {
        $(".charBox").append("<div class='jiantou'>" + addValue[1] + "</div>");
    }


}
/**
 * 可以滚动
 */
function initgundong() {
    lunbo.sss = window.setInterval(player, lunbo.times);
}
/**
 * 简介滚动
 */
function player() {
    var realTop = 0;
    realTop = lunbo.top - (lunbo.index);
    if (realTop >= lunbo.chazhi) {
        $('#content').css('top', realTop + 'px');
        lunbo.index++;
    } else {
        window.clearInterval(lunbo.sss);
        $('#content').css('top', lunbo.top + 'px');
        lunbo.index = 0;
        initgundong();
    }

}


smallPlan = {};

/**
 * 特殊站点  公路资料trafficArr   地基GPS/MET水汽资料UPAR_GPS  土壤水分站观测资料AGME_ASM  这三种站点数量巨大，因此需要本来才用小球展示，由于性能原因换回plan；
 * 该函数主要是提供对象的克隆
 */
function typeObjsPlane(type, datas, size, color, mode) {
    if (smallPlan.type !== type) {
        smallPlan = getPlane(type, 1);
        smallPlan.type = type
    }
    var plane = smallPlan.clone();
    return getObjBox2(plane, datas, type, mode)
}
/**
 * 特殊站点  公路资料trafficArr   地基GPS/MET水汽资料UPAR_GPS  土壤水分站观测资料AGME_ASM  这三种站点数量巨大，因此需要本来才用小球展示，由于性能原因换回plan
 * @param {*} planec 
 * @param {*} data3 
 * @param {*} type 
 * @param {*} mode 
 */
function getObjBox2(planec, data3, type, mode) {
    var objBox = new THREE.Object3D();
    objBox.name = type;
    data3.forEach(function(data) {
        var plane = planec.clone();
        plane.z = 100;
        plane.name = data.name;
        plane.code = data.code;
        // plane.lat = data.lng;
        // plane.lon = data.lat;
        plane.lat = data.lat;
        plane.lon = data.lon;
        plane.description = data.description;

        plane.disableEvent = false;
        // addShowLabel(plane)
        var height = radius * 0.01;
        setPosition23D(plane, data.lat, data.lon, height, mode); //对象、经度、纬度、距地面高度
        objBox.add(plane);

    });
    return objBox;
}



/**
 * 创建一般的平面站点 其实是和上面的 公路资料是一样的东西，只是写法有些出入罢了
 * @param {站点类型} type 
 * @param {数据} datas 
 * @param {站点大小} size 
 * @param {地图格式} mode 
 */
function typeObjs(type, datas, size, mode) {
    var siz = size || 2;
    var plane = getPlane(type, size);
    if (mode == 2) {

        return getObjBox(plane, datas, type, mode)

    } else {

        return getObjBox(plane, datas, type, mode)
    }


}

function getObjBox(planec, datas1, type, mode) {
    var objBox = new THREE.Object3D();
    objBox.name = type;
    datas1.forEach(function(data) {
        var plane = planec.clone();
        plane.z = 100;
        plane.name = data.name;
        plane.code = data.code;
        // plane.lat = data.lng;
        // plane.lon = data.lat;
        plane.lat = data.lat;
        plane.lon = data.lon;
        plane.description = data.description;
        plane.on('click', function(m) {

        });
        plane.disableEvent = false;
        // addShowLabel(plane)
        var height = radius * 0.01;
        setPosition23D(plane, data.lat, data.lon, height, mode); //对象、经度、纬度、距地面高度
        objBox.add(plane);

    });
    return objBox;
}



/**
 * 由地理坐标转化为场景中相对于自身的相对坐标
 * @param {经度} lon 
 * @param {纬度} lat 
 * @param {海拔} alt 
 * @param {坐标类型} mode  
 */
function getPosition(lon, lat, alt, mode) {


    if (mode == 3) {
        // 返回球面坐标
        return latlonToVector3(lat, lon, alt + radius)
    } else if (mode == 2) {
        // 返回平面坐标
        return latlonToplaneVector3(lat, lon, alt);
    }
}


/**
 * 创建地球 创建球体 贴底图  国界线 赤道 经纬度网格
 * @param {场景} scene 
 */
function globe(scene) {
    // 设置z轴的初始角度
    group.rotation.z = THREE.Math.degToRad(-24);
    // group.rotation.z = THREE.Math.degToRad(-20);

    // 光圈球体位置
    var geo4 = new THREE.SphereGeometry(radius, 50, 50);
    var mat4 = new THREE.MeshLambertMaterial({
        // map: new THREE.TextureLoader().load("assets/images/earth.jpg"),
        opacity: 0,
        transparent: true,
        combine: THREE.MultiplyOperation,
        side: THREE.FrontSide,
        depthWrite: false


    });
    shanderball = new THREE.Mesh(geo4, mat4);
    group.add(shanderball);

    //地球样子
    var geo = new THREE.SphereGeometry(radius, 50, 50);
    var mat1 = new THREE.MeshLambertMaterial({
        // map: new THREE.TextureLoader().load("assets/images/earth.jpg"),
        opacity: 0,
        transparent: true,
        combine: THREE.MultiplyOperation,
        side: THREE.FrontSide,

    });

    // var mat1 = new THREE.MeshBasicMaterial({
    // 	map: new THREE.TextureLoader().load("assets/images/earth.png"),
    // /* 	emissive: 0x000000,
    // 	combine : THREE.MultiplyOperation,
    // 	side:THREE.FrontSide,
    // 	wrapAround : true */
    // });


    earth = new THREE.Mesh(geo, mat1);
    var loaderEarth = new THREE.TextureLoader();
    var month = new Date().getMonth();
    // 加载对应月份的地球的图片，加载完后才会显示地球，季节轮播也是通过这种方式实现的
    loaderEarth.load(
        // 资源链接
        'assets/images/earthMap/wtb_' + (+month + 1) + '.jpg',
        // 资源加载完成后的回调函数
        function(texture) {
            // do something with the texture
            earth.material.map = texture;
            earth.material.opacity = 1;
            earth.material.needsUpdate = true;

        },
        // 资源加载过程中的回调函数
        function(xhr) {
            // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // 资源下载出错时的回调函数
        function(xhr) {
            // console.log('An error happened');
        }
    );

    // addSkyBox();

    group.add(earth);
    // renderer.render(scene, camera);

    //  国界线
    var geo = new THREE.SphereGeometry(radius + 1, 50, 50);
    var mat = new THREE.MeshLambertMaterial({
        // blending: THREE.AdditiveBlending,
        // map: new THREE.TextureLoader().load("assets/images/countryBounding.png"),
        transparent: true,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4,
        opacity: 0
    });
    earthPol = new THREE.Mesh(geo, mat);
    // earthPol.rotation.x = 0.01
    var loadPo1 = new THREE.TextureLoader();
    // 懒加载国界线
    loadPo1.load(
        // 资源链接
        'assets/images/countryBounding.png',
        // 资源加载完成后的回调函数
        function(texture) {
            // do something with the texture
            earthPol.material.map = texture;
            earthPol.material.opacity = 1;
            earthPol.material.needsUpdate = true;

        },
        // 资源加载过程中的回调函数
        function(xhr) {
            // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // 资源下载出错时的回调函数
        function(xhr) {
            // console.log('An error happened');
        }
    );
    earth.add(earthPol);
    // ep2 = earthPol.clone();    //不知道干什么的，注视了也没事
    // earth.add(ep2);  
    /* 
     leidafanshe1 = getGlobe("leidafanshe","./assets/images/leidafanshe.GIF",3,0.5);
     earth.add(leidafanshe1); */


    // 地球表面添加东西火的图层
    /* 	var geo = new THREE.SphereGeometry(radius + 0.001, 50, 50);
     fire1 = new THREE.TextureLoader().load("assets/images/countryBounding.png");
     mat = new THREE.MeshLambertMaterial({
     transparent: true,
     depthTest: true,
     depthWrite: false,
     polygonOffset: true,
     polygonOffsetFactor: -4,
     opacity: .3
     });
     earth.earthC1 = new THREE.Mesh(geo, mat);
     earth.add(earth.earthC1); */

    //经纬度网格
    var heightLL = parseInt(radius + radius * 0.1)
    var geo = new THREE.SphereGeometry(heightLL, 36, 18);
    var mat = new THREE.MeshLambertMaterial({
        transparent: true,
        color: 0xFFFFFF,
        blending: THREE.AdditiveBlending,
        opacity: .4,
    });
    var egh = new THREE.EdgesHelper(new THREE.Mesh(geo, mat), 0xFFFFFF);
    // egh.material.linewidth = 1;
    egh.material.transparent = true;
    egh.material.opacity = .08;
    earth.add(egh);

    // 赤道
    earth.ring = new THREE.Object3D();
    var r = parseInt(radius + radius * 0.35);
    var t = Math.PI / 180 * 2;
    var mat = new THREE.LineBasicMaterial({
        linewidth: .5,
        color: 0x6FD5F0,
        transparent: true,
        opacity: .4
    });

    var lineGeo = new THREE.Geometry();
    for (i = 0; i < 180; i++) {
        var x = r * Math.cos(t * i);
        var z = r * Math.sin(t * i);

        lineGeo.vertices.push(new THREE.Vector3(x * .985, 0, z * .985));
        lineGeo.vertices.push(new THREE.Vector3(x, 0, z));

        if (i % 5 == 0) {

            lineGeo.vertices.push(new THREE.Vector3(x * .965, 0, z * .965));
            lineGeo.vertices.push(new THREE.Vector3(x, 0, z));
            lineGeo.vertices.push(new THREE.Vector3(x * .965, 0, z * .965));
            lineGeo.vertices.push(new THREE.Vector3(x, 0, z));

        }


    }

    // now add all the lines as one piece of geometry
    var line = new THREE.LineSegments(lineGeo, mat);
    earth.ring.add(line);
    earth.add(earth.ring);



    //点击事件判断用的 
    ep2userData = {
        type: "earth"
    };
    earth.userData = {
        type: "earth"
    };

    objects.push(earth);
    earth.on('click', function() {
        earthRotate = false;
    })

    egh.on("click", function() {
        earthRotate = false;
    })

    earthPosition = earth.position;
}

/**
 * 创建光源
 */
function lights() {

    dirLight1 = new THREE.AmbientLight(0xeeeeeee, 0.2); // soft white light
    dirLight1.position.set(800, 800, 1600);
    dirLight1.lookAt(0, 0, 800);
    group.add(dirLight1);
    light4 = new THREE.AmbientLight(0xeeeeeee, 0.2); // soft white light
    light4.position.set(0.0, 1600);
    light4.lookAt(0, 0, 800);
    group.add(light4);


    dirLight2 = new THREE.DirectionalLight(0xeeeeeee, 0.6);
    dirLight2.position.set(400, 800, 600);

    //dirLight2.lookAt(camera);
    scene.add(dirLight2);

    dirLight3 = new THREE.DirectionalLight(0xeeeeeee, 0.6);
    dirLight3.position.set(800, 800, 0);

    //dirLight2.lookAt(camera);
    scene.add(dirLight3);


    //  var light4 = new THREE.DirectionalLight(0xffffff);
    // light4.position.set(-400,-400,-400);
    // scene.add(light4);
}

/**
 * 添加外层的星空，没有用
 */
function addSkyBox() {
    var geo = new THREE.SphereGeometry(400, 40, 40);
    var mat = new THREE.MeshLambertMaterial({
        color: 0xFFFFFF,
        map: new THREE.TextureLoader().load("assets/images/star.jpg"),
        side: THREE.BackSide,
        opacity: 1
    });
    // var skyMaterial = new THREE.MeshFaceMaterial( [mat] );


    // map: new THREE.TextureLoader().load("assets/images/star.jpg")
    skybox = new THREE.Mesh(geo, mat);
    group.add(skybox);

    // skybox = makeSkybox( [
    //     'assets/images/star.jpg', // right
    //     'assets/images/star.jpg', // right
    //     'assets/images/star.jpg', // right
    //     'assets/images/star.jpg', // right
    //     'assets/images/star.jpg', // right
    //     'assets/images/star.jpg', // right

    // ], 1000 );
    // group.add( skybox);
}
/**
 * 没有用处
 */
function makeSkybox(urls, size) {
    var skyboxCubemap = new THREE.CubeTextureLoader().load(urls);
    skyboxCubemap.format = THREE.RGBFormat;

    var skyboxShader = THREE.ShaderLib['cube'];
    skyboxShader.uniforms['tCube'].value = skyboxCubemap;
    return new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.ShaderMaterial({
            fragmentShader: skyboxShader.fragmentShader,
            vertexShader: skyboxShader.vertexShader,
            uniforms: skyboxShader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        })
    );
}






/**
 * 全球飞机探测资料添加的内容
 */
var planData, hisData;

function plane() {
    airplaneLineArr = new THREE.Object3D();
    airplaneLineArr.name = "aircraft";
    D2_airplaneLineArr = new THREE.Object3D();
    D2_airplaneLineArr.name = "aircraft";


    var airplane = new THREE.Object3D();
    //if ($.isEmptyObject(planData)) {
    $.getJSON('./data/planeData.json', function(data) {
        planData = data;
        $.each(planData, function(i, item) {
            if (item.lng && item.lat && item.his.length >= 3) {
                var airplane = addPlane(item, PLAN3D);
                if (airplane.children.length > 1) {
                    airplaneLineArr.add(airplane);
                }


                var d2airplane = addPlane(item, PLAN2D);
                if (d2airplane.children.length > 1) {
                    D2_airplaneLineArr.add(d2airplane);
                }
            }
        });
    });


}

/**
 * 创建飞机实体
 * @param {数据} item 
 * @param {地图类型} mode 
 */
function addPlane(item, mode) {
    var airplane = new THREE.Object3D();
    //if (item.lon && item.lat) {
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    hisData = item.his;
    // 旋转
    plane.rotation.z = THREE.Math.degToRad(5);
    // 定位


    var position = getPosition(item.lng, item.lat, 0.1, mode);


    plane.position.set(position.x, position.y, position.z);


    // 绘制历史轨迹
    var objMap = drawHistoryTrack(mode);
    if (objMap['line'] != undefined) {
        // airplane.add(plane);
        airplane.add(objMap['line']);
        airplane.add(objMap['movePoint']);
    }
    return airplane;
    //}
}

var tcaRemainLength, vertexArr;
// 轨迹线质
var trackMaterial = new THREE.LineBasicMaterial({
    //color: 0xf4803f,
    color: 0xfddd21,
    opacity: 0.5,
    transparent: true
});
/**
 * 绘制飞机的航线
 */
function drawHistoryTrack(mode) {
    var objMap = {};
    var dLength = hisData.length;
    if (dLength >= 2) {
        var trackCoordArr = [];
        for (var i = 0; i < dLength; i++) {
            if (hisData[i][0] && hisData[i][1]) {
                trackCoordArr.push({
                    lon: hisData[i][0],
                    lat: hisData[i][1]
                });
            }
        }
        var tcaLength = trackCoordArr.length;

        if (tcaLength >= 2) {
            var tcaHalfLength = Math.ceil(tcaLength / 2),
                tcaRemainLength = tcaLength - tcaHalfLength,
                vertexArr = [];


            // 这里只取了三个点(起点、中点、终点)
            var p1 = getPosition(trackCoordArr[0].lon, trackCoordArr[0].lat, 0, mode),
                p2 = getPosition(trackCoordArr[tcaHalfLength].lon, trackCoordArr[tcaHalfLength].lat, 0.5, mode),
                p3 = getPosition(trackCoordArr[tcaLength - 1].lon, trackCoordArr[tcaLength - 1].lat, 0, mode);

            var trackCurve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(p1.x, p1.y, p1.z),
                new THREE.Vector3(p2.x, p2.y, p2.z),
                new THREE.Vector3(p3.x, p3.y, p3.z)
            ]);


            var trackGeometry = new THREE.Geometry(),
                verticesArr = trackCurve.getPoints(tcaLength);

            trackGeometry.vertices = verticesArr;
            trackGeometry.computeLineDistances();
            var trackLine = new THREE.Line(trackGeometry, trackMaterial);
            //earth.add(trackLine);
            objMap['line'] = trackLine;
            // 动画点
            addLightPoint(p1, tcaLength, verticesArr, objMap);
        }
    }
    return objMap;
}

// 航线上的点
var pointGeometry = new THREE.SphereGeometry(0.2, 20, 20);
var pointMaterial = new THREE.MeshBasicMaterial({
    color: 0x40E0D0
});

function addLightPoint(pos, coordsNum, verArr, objMap) {
    /*
     var pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
     pointMesh.position.set(pos.x, pos.y, pos.z);
     //earth.add(pointMesh);
     objMap['movePoint'] = pointMesh;
     var index = 0;

     function pointAnimate() {
     index++;
     if (index > coordsNum) {
     index = 0;
     }
     pointMesh.position.set(verArr[index].x, verArr[index].y, verArr[index].z);
     requestAnimationFrame(pointAnimate);
     }
     pointAnimate();*/
    var curveGeometry = new THREE.Geometry();
    var curveData = new THREE.CatmullRomCurve3(verArr.slice(0, 2));
    curveGeometry.vertices = curveData.getPoints(10);
    //curveGeometry.vertices = curveData.getPoints(5);

    /*var curveMaterial = new THREE.LineBasicMaterial({color: 0xff8846,linewidth:2,opacity: 0.75,
     transparent: true});*/
    var curveMaterial = new THREE.LineBasicMaterial({
        color: 0xfddd21,
        linewidth: 2,
        opacity: 0.75,
        transparent: true
    });
    var curveLine = new THREE.Line(curveGeometry, curveMaterial);
    //group.add(curveLine);
    objMap['movePoint'] = curveLine;
    var index = 0;

    function lineAnimate() {
        index++;
        if (index > coordsNum - 2) {
            index = 0;
        }
        var offsetData = verArr.slice(index, 4 + index);
        if (offsetData.length > 0) {
            curveData = new THREE.CatmullRomCurve3(offsetData);
            curveLine.geometry.vertices = curveData.getPoints(10);
            curveLine.geometry.verticesNeedUpdate = true;
        }
        requestAnimationFrame(lineAnimate);
    }

    lineAnimate();
}



















/**
 * 创建球体坐标的船舶航线
 */
function getBoatLine() {
    boatArr = new THREE.Object3D();
    boatArr.name = "globalShip";

    var length1 = 0;
    var boatObj = getPlane("globalShip", 3);
    $.getJSON('./data/boatData.json' + "?Time=" + Date.now(), function(datas) {
        datas.forEach(function(data) {

            if (data.his.length > 10) {
                length1++;
                var boatship = new THREE.Object3D();


                var boatHis = data.his;

                var vertexArr = [];

                var trackCoordArr = [];
                for (var i = 0; i < boatHis.length; i++) {
                    if (boatHis[i][0] && boatHis[i][1]) {
                        trackCoordArr.push({
                            lon: boatHis[i][1],
                            lat: boatHis[i][0]
                        });
                    }
                }

                if (trackCoordArr.length > 10) {
                    var tcaLength = trackCoordArr.length;

                    for (var k = tcaLength; k > 0; k--) { //全部的
                        var p2 = getPosition(trackCoordArr[tcaLength - k].lon, trackCoordArr[tcaLength - k].lat, 0.01, PLAN3D);
                        vertexArr.push(new THREE.Vector3(p2.x, p2.y, p2.z));


                    }
                    var trackGeometry = new THREE.Geometry();
                    trackGeometry.vertices = vertexArr;
                    trackGeometry.computeLineDistances();
                    var trackLine = new THREE.Line(trackGeometry, new THREE.LineDashedMaterial({
                        color: 0x08f5c0,
                        dashSize: 2,
                        gapSize: 1,
                        linewidth: 1,
                        opacity: 0.8,
                        transparent: true
                    }));
                    //boatship.add(plane);
                    boatship.add(trackLine);
                    boatArr.add(boatship);


                }

            }

        });

    });

}


/**
 * 创建平面坐标的船舶行线
 */
function getBoatLine1() {

    D2_boatArr = new THREE.Object3D();
    D2_boatArr.name = "globalShip";

    var length1 = 0;
    var boatObj = getPlane("globalShip", 3);
    $.getJSON('./data/boatData.json' + "?Time=" + Date.now(), function(datas) {

        datas.forEach(function(data) {

            if (data.his.length > 10) {
                length1++;

                var boatship2 = new THREE.Object3D();


                var boatHis = data.his;


                var D2_vertexArr = [];
                var trackCoordArr = [];
                for (var i = 0; i < boatHis.length; i++) {
                    if (boatHis[i][0] && boatHis[i][1]) {

                        trackCoordArr.push({
                            lon: boatHis[i][1],
                            lat: boatHis[i][0]
                        });
                    }
                }

                var prelon = undefined;
                var prelat = 0;
                if (trackCoordArr.length > 10) {
                    var tcaLength = trackCoordArr.length;

                    for (var k = tcaLength; k > 0; k--) { // 后一半
                        if (prelon == undefined) {
                            prelon = +trackCoordArr[tcaLength - k].lon;
                            prelon = lon2lon(prelon);
                            prelat = +trackCoordArr[tcaLength - k].lat;
                        }
                        var curlon = +trackCoordArr[tcaLength - k].lon;
                        var curlat = +trackCoordArr[tcaLength - k].lat;
                        curlon = lon2lon(curlon)

                        if ((Math.abs(prelon - curlon) > 20) || Math.abs(prelat - curlat) > 60) {
                            // console.log(prelon, " ", curlon)
                            prelon = curlon;
                            break;
                            // return;
                        }
                        prelon = curlon;
                        prelat = curlat;
                        var p2 = getPosition(trackCoordArr[tcaLength - k].lon, trackCoordArr[tcaLength - k].lat, 0.15, PLAN2D);

                        D2_vertexArr.push(new THREE.Vector3(p2.x, p2.y, p2.z));

                    }
                    var trackGeometry = new THREE.Geometry();
                    trackGeometry.vertices = D2_vertexArr;
                    trackGeometry.computeLineDistances();
                    var trackLine = new THREE.Line(trackGeometry, new THREE.LineDashedMaterial({
                        color: 0x03f0ff,
                        // vertexColors: THREE.VertexColors,
                        opacity: 0.6,
                        transparent: true
                    }));


                    boatship2.add(trackLine);
                    D2_boatArr.add(boatship2);
                }

            }

        });
    });

}

/**
 * 初始化 场景、相机、光照、 添加地球、时间轴、并添加该实体的姿态控制事件
 */
function init() {


    container = document.getElementById('globe_container');
    //设置场景
    scene = new THREE.Scene();
    scene.rotation.set(0, 0, 0);

    // 添加相机
    camera = new THREE.PerspectiveCamera(50, winWth / winHgt, 1, 2000);
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 400;
    camera.lookAt(0, 0, 0);


    // 渲染器
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setClearColor(0x00000f, 1);
    // renderer.setClearAlpha(0);
    renderer.setSize(winWth, winHgt);
    container.appendChild(renderer.domElement);

    //缩放控制， 需要修改，以后再说
    // orbitControls = new THREE.OrbitControls(camera);
    // orbitControls.autoRotate = false
    // clock = new THREE.Clock();

    //事件插件
    var threeOnEvent = new THREE.onEvent(scene, camera);

    // group = new THREE.Group();
    // scene.add(group);
    // addSkyBox();
    // addOuterRing();
    // 地球    
    globe(scene);

    toggleEarthMap();

    //城市为点，向外发射光的部分
    // addCityLines();
    // addStation(data);
    // addStation1(data);

    // updateStation(data, ["countryGround", "space", "radar", "weixin"], 1999);

    // setTimeout(function(){
    //     pdateStation(data,["countryGround","space","weixin"],1999);
    // },5000)

    // 看不太懂 冲突事件好像是
    // createHotSpot();
    // createAltHotSpot(hotspot_alt1, IDR.alt_events[0]);
    // createAltHotSpot(hotspot_alt2, IDR.alt_events[1]);

    // add close button 对应上面的东西，点击后就会回到全图，
    // createCloseButton();

    // add timeline

    // earth.add(getBarList(geoCood));
    /***
     * 添加时间轴
     */
    addTimeline2();

    // add detailViewScreen
    // addDetailViewScreen();

    // add event listners

    //已经添加外部的背景
    // addSkyBox();

    // 飞机
    // plane();
    // addShips() ;

    // 星点
    // stars();

    // 半球光
    lights();
    composer = new THREE.EffectComposer(renderer);

    var renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);

    outlinePass.edgeStrength = 5;
    outlinePass.edgeGlow = 2;
    outlinePass.edgeThickness = 1;
    outlinePass.pulsePeriod = 0;
    outlinePass.visibleEdgeColor.set("#1c3c3d");
    outlinePass.hiddenEdgeColor.set("#1c3c3d");

    composer.addPass(outlinePass);

    // loader.load( 'assets/images/tri_pattern.jpg', onLoad );
    effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    effectFXAA.renderToScreen = true;
    composer.addPass(effectFXAA);


    outlinePass.selectedObjects = [shanderball];
    // outlinePass.selectedObjects = [earth];


    addEventListeners();
    // showGlobal();

    /*        // 盘旋控制
     var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
     orbitControl.minDistrance = 20;
     orbitControl.maxDistrance = 50;
     orbitControl.maxPolarAngle = Math.PI/2; */

    // resize事件
    // window.addEventListener('resize', onWindowResize, false);
}

/**
 * 循环渲染
 * 通过targetEarthRotationX 来控制地球正面的的经度
 */
function animate() {

    // outlinePass.selectedObjects = [earth];
    requestAnimationFrame(animate);
    if (earthRotate) {
        if (earthRotateSP != undefined) {
            targetEarthRotationX += earthRotateSP;
        } else {
            targetEarthRotationX += 0.01;
        }

    }
    // if (skybox && earth) {
    //     skybox.rotation.x = earth.rotation.x * .25;
    //     skybox.rotation.y = earth.rotation.y - Math.PI / 180 * 30 * .25;
    //     skybox.rotation.z = earth.rotation.z * .25;
    // }

    if (earth) {
        //console.log("here");
        // radius++;
        // console.log(group.rotation.y);
        earth.rotation.y += (targetEarthRotationX - earth.rotation.y) * 0.2;
        // console.log(earth.rotation.y);
        earth.rotation.x += (targetEarthRotationY - earth.rotation.x) * 0.2;
        group.scale.set(scaleN, scaleN, scaleN);
        // skybox.scale.set(1 / scaleN, 1 / scaleN, 1 / scaleN);
        // console.log(1/scaleN);

        // if(scaleN>1&&scaleN<1.5){
        //     earth.children.forEach(element => {
        //         //  element.scale.set(1/scaleN,1/scaleN,1/scaleN );
        //         element.children.forEach(function(item){
        //             item.scale.set(1/(scaleN),1/(scaleN),1/(scaleN));
        //         })
        //     });
        // }else{

        // }
    }

    mapPlane.scale.set(scaleM, scaleM, scaleM)


    if (timeline) {
        // console.log(timeline.dial.rotation.y);

        timeline.dial.rotation.y += (-targetRotationX - timeline.dial.rotation.y) * 0.05;
        // console.log(timeline.dial.rotation.y);

        /**
         *   自动播放
         */

        if (State.play) {
            // deltaTime = (Date.now() - lastTime) / 1000;
            deltaTime = (Date.now() - lastTime) / 1000;
            lastTime = Date.now();
            timeline.dial.rotation.y += playSpeed * deltaTime;
            var rota = timeline.dial.rotation.y;


            if (playSpeed < 0 && rota < minPlayRad) {
                pause();
            }
            if (playSpeed > 0 && rota > maxPlayRad) {
                pause();
            }
            targetRotationX = -timeline.dial.rotation.y;
        } else {
            lastTime = Date.now();
            // targetRotationX = -timeline.dial.rotation.y;
        }


        // add clamping or tweaks to speed etc here
        //if(timeline.dial.rotation.y>maxRot) { timeline.dial.rotation.y = maxRot;}
        //if(timeline.dial.rotation.y<minRot) { timeline.dial.rotation.y = minRot;}
        if (-targetRotationX < minRot) {
            // console.log(targetRotationX)
            targetRotationX = -minRot;
        }
        if (-targetRotationX > maxRot) {
            // console.log(targetRotationX)
            targetRotationX = -maxRot;
        }

        // targetRotationX = -maxRot; 
        // console.log(timeline.dial.rotation.y)
        timeline.outerDial.rotation.y = .5 * timeline.dial.rotation.y;
        //console.log(timeline.dial.rotation.y);
        //console.log(timeline.dial.rotation.y);

        newRot = Math.round(timeline.dial.rotation.y * 180 / Math.PI * 10) / 10;
        if (State.timeLineRot != newRot) {


            State.timeLineRot = newRot;
            onTimeLineUpdated()

        }

    }
    // renderer.autoClear = false;
    renderer.render(scene, camera);
    // composer.render();

    TWEEN.update();
    //stats.update();
}

/* END ANIMATION LOOP */

var loader = new THREE.TextureLoader();

/**
 * 添加站点
 * @param {*} data
 */
// function addStation(data){
//      var matEarth = new 

// }

// function mountDate(data){
//     var 
// }

function scaleTo(size) {
    // console.log("scaleN")
    var tween3 = new TWEEN.Tween({
            scale: scaleN
        }) // Create a new tween that modifies 'coords'.
        .to({
            scale: size
        }, 2000) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(function() { // Called after tween.js updates 'coords'.
            scaleN = this.scale;
            // console.log(scaleN + "scaleN")
            // group.scale.set(scaleN, scaleN, scaleN)
        })
        .start(); // Start the tween immediately.
}


/**
 * 经纬度转化为球的向量
 * @param {*} lat
 * @param {*} lon
 * @param {*} radius
 */
function latlonToVector3(lat, lon, radius) {
    var phi = (lat) * Math.PI / 180;
    var theta = (lon - 180) * Math.PI / 180;

    var x = -(radius) * Math.cos(phi) * Math.cos(theta);
    var y = (radius) * Math.sin(phi);
    var z = (radius) * Math.cos(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
}

/**
 * 转到相应的经纬度
 * @param {*} lat
 * @param {*} lon
 * @param {*} offsetY
 */
function rotateToLatLng(lat, lng, offsetY) {
    locked = true;
    if (!offsetY) {
        offsetY = 0;
    }

    //记录当前坐标
    var rotX = earth.rotation.x;
    var rotY = earth.rotation.y;
    var rotZ = earth.rotation.z;


    var c = earth.rotation.y; //  crotationY
    var d = -lng * (Math.PI / 180) % (2 * Math.PI); // -lng
    var f = Math.PI / (2 + offsetY) * -1; //  - PI/2;
    earth.rotation.y = c % (2 * Math.PI); // croationY%2PI
    earth.rotation.x = (lat * (Math.PI / 180) % Math.PI) + Math.PI / 12; //lat%PI -PI/6;
    earth.rotation.y = d + f; // -lng-PI/2;
    var newRotX = earth.rotation.x;
    var newRotY = earth.rotation.y;
    var newRotZ = earth.rotation.z;
    earth.rotation.x = rotX;
    earth.rotation.y = rotY;
    earth.rotation.z = rotZ;
    // TWEEN.removeAll();
    var tween7 = new TWEEN.Tween(earth.rotation).to({
        x: newRotX,
        y: newRotY,
        z: newRotZ
    }, 500).start();
    tween7.easing(TWEEN.Easing.Quadratic.InOut);
    tween7.onComplete(function() {
        locked = false;
        targetEarthRotationX = earth.rotation.y;
        targetEarthRotationY = earth.rotation.x
    });
}


function rotateToLatLngNormal(lat, lng, offsetY, zrotate, timeout) {
    var nativeTimeout = !timeout ? 500 : timeout;

    zrotate = zrotate || 0;
    locked = true;
    if (!offsetY) {
        offsetY = 0;
    }
    // console.log(earth)
    //记录当前坐标
    var rotX = earth.rotation.x;
    var rotY = earth.rotation.y;
    var rotZ = earth.rotation.z;


    var c = earth.rotation.y; //  crotationY
    var d = -lng * (Math.PI / 180) % (2 * Math.PI); // -lng
    var f = Math.PI / (2 + offsetY) * -1; //  - PI/2;
    earth.rotation.y = c % (2 * Math.PI); // croationY%2PI
    earth.rotation.x = (lat * (Math.PI / 180) % Math.PI) - 0.001; //lat%PI -PI/6;
    earth.rotation.y = d + f; // -lng-PI/2;

    var newRotX = earth.rotation.x;
    var newRotY = earth.rotation.y;
    var newRotZ = zrotate;
    earth.rotation.x = rotX;
    earth.rotation.y = rotY;
    earth.rotation.z = rotZ;
    // TWEEN.removeAll();
    var tween7 = new TWEEN.Tween(earth.rotation).to({
        x: newRotX,
        y: newRotY,
        z: newRotZ
    }, nativeTimeout).start();
    tween7.easing(TWEEN.Easing.Quadratic.InOut);
    tween7.onComplete(function() {
        locked = false;
        targetEarthRotationX = earth.rotation.y;
        targetEarthRotationY = earth.rotation.x;
    });
}

/**
 * 自动播放
 */
function playProgress() {
    playSpeed = 0;
}

/* ADD EVENT LISTENERS */
function addEventListeners() {

    // listen for resize
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        // console.log("got resize event")
        renderer.setSize($("body").width(), $("body").height());
        camera.aspect = $("body").width() / $("body").height();
        camera.updateProjectionMatrix();

        if (window.innerWidth < window.innerHeight) {
            // IDR.isPortrait = true;
            camera.position.z = 700;
            // adjust timeline
            if (timeline) {
                timeline.position.z = 670 - window.innerWidth * .01;
                if (!showingDetail) {
                    timeline.position.y = -60 - window.innerWidth * .003;
                }
            }
        } else {
            // IDR.isPortrait = false;
            camera.position.z = 550;
            if (timeline) {
                // adjust timeline
                timeline.position.z = 530 - window.innerWidth * .01;
                if (!showingDetail) {
                    timeline.position.y = -55 - window.innerWidth * .003;
                }
            }
        }

    }

    onWindowResize();

    // mouse click
    window.addEventListener('mousedown', onDocumentMouseDown, false);

    function onDocumentMouseDown(event) {
        // console.log('mousedown')
        document.addEventListener('mouseup', onDocumentMouseUp, false);
        document.addEventListener('mouseout', onDocumentMouseOut, false);


        mouseXOnMouseDown = event.clientX - windowHalfX;
        mouseYOnMouseDown = event.clientY - windowHalfY;


        // check for clicks
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(objects, true);

        grabbedEarth = false;
        grabbedTimeline = false;

        if (intersects.length > 0) {

            if (intersects[0].object.userData.type == 'earth' || intersects[0].object.parent.userData.type == 'earth' || intersects[0].object.parent.parent.userData.type == 'earth') {
                targetEarthRotationOnMouseDownX = targetEarthRotationX;
                targetEarthRotationOnMouseDownY = targetEarthRotationY;
                grabbedEarth = true;
                /* 		console.log("earth grabbed");
                //  console.log(intersects) */
                click1th.time = Date.now();
                click1th.x = mouseXOnMouseDown;
                click1th.y = mouseYOnMouseDown;
                click0th = click1th;
            }

            if (intersects[0].object.userData.type == 'timeline' || intersects[0].object.parent.userData.type == 'timeline' || intersects[0].object.parent.parent.userData.type == 'timeline') {
                targetRotationOnMouseDownX = targetRotationX;
                //targetRotationOnMouseDownY = targetRotationY;
                grabbedTimeline = true;
                // if (IDR.mode == "play" && IDR.speechPlaying) {
                //     pauseSpeech();
                // }
                // console.log("timeline grabbed");
            }

        }
    }

    // touch click
    document.addEventListener('touchstart', onDocumentTouchStart, false);

    function onDocumentTouchStart(event) {
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
        document.addEventListener('touchend', onDocumentMouseUp, false);

        if (event.touches.length == 1) {
            //console.log("touch");
            //event.preventDefault();

            mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
            mouseYOnMouseDown = event.touches[0].pageY - windowHalfY;

            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;

            mouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects(objects, true);

            grabbedEarth = false;
            grabbedTimeline = false;

            if (intersects.length > 0) {
                if (intersects[0].object.userData.type == 'earth' || intersects[0].object.parent.userData.type == 'earth' || intersects[0].object.parent.parent.userData.type == 'earth') {
                    click1th.time = Date.now();
                    click1th.x = mouseX;
                    click1th.y = mouseY;
                    click0th = click1th;
                    targetEarthRotationOnMouseDownX = targetEarthRotationX;
                    targetEarthRotationOnMouseDownY = targetEarthRotationY;
                    grabbedEarth = true;
                    //console.log("earth grabbed");

                }

                if (intersects[0].object.userData.type == 'timeline' || intersects[0].object.parent.userData.type == 'timeline' || intersects[0].object.parent.parent.userData.type == 'timeline') {
                    targetRotationOnMouseDownX = targetRotationX;
                    //targetRotationOnMouseDownY = targetRotationY;
                    grabbedTimeline = true;
                    if (IDR.mode == "play" && IDR.speechPlaying) {
                        pauseSpeech();
                    }
                    //console.log("timeline grabbed");
                }
            }

        }

    }

    // drag with touch
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    function onDocumentTouchMove(event) {

        if (event.touches.length == 1) {

            //event.preventDefault();

            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
            click2th.time = Date.now();
            click2th.x = mouseX;
            click2th.y = mouseY;
            if (grabbedTimeline) {
                targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.002;
                targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.003;
            }

            var touchspeed1 = touchspeed(click1th.time, click1th.x, click1th.y, click2th.time, click2th.x, click2th.y)
            if (touchspeed1 > 0.8) { //测试出来的额滑动效果
                // targetEarthRotationY = targetEarthRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.01;
                targetEarthRotationX = targetEarthRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.005;
            } else {
                targetEarthRotationY = targetEarthRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.005;
                targetEarthRotationX = targetEarthRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.005;
            }
            click1th = click2th;
            click2th = {};

        }

    }

    // drag with mouse
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    var i = 1;

    function touchspeed(t1, x1, y1, t2, x2, y2) {
        try {
            return Math.pow(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2), 0.5) / (t2 - t1);
        } catch (e) {}

    }

    function onDocumentMouseMove(event) {
        // console.log(i++);
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
        var hotFont = parseInt($("html").css("fontSize"));


        click2th.time = Date.now();
        click2th.x = mouseX;
        click2th.y = mouseY;


        // console.log(event.clientX)
        nameBox.css('left', event.clientX / hotFont + 0.15 + 'rem');
        nameBox.css('top', event.clientY / hotFont - 0.4 + 'rem');
        // console.log(event.clientY / hotFont + 0.54)

        if (grabbedTimeline) {
            targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.002;
            targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.003;
        }

        if (grabbedEarth) {
            var touchspeed1 = touchspeed(click1th.time, click1th.x, click1th.y, click2th.time, click2th.x, click2th.y)
            if (touchspeed1 > 0.6) { //测试出来的额滑动效果
                // targetEarthRotationY = targetEarthRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.01;
                targetEarthRotationY = targetEarthRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.001;
                targetEarthRotationX = targetEarthRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.003;
            } else {
                targetEarthRotationY = targetEarthRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.001;
                targetEarthRotationX = targetEarthRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.002;
            }
            click1th = click2th;
            click2th = {};

        }

        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(objects, true);

        document.body.style.cursor = "default";

        if (intersects.length > 0) {

            //console.log(intersects[0].object.userData.type);

            if (intersects[0].object.userData.type == "earth" || intersects[0].object.parent.userData.type == "earth") {
                document.body.style.cssText = "cursor: -moz-grab; cursor: -webkit-grab; cursor: grab;";
                // console.log('earth move')
            }

            if (intersects[0].object.userData.type == 'timeline' || intersects[0].object.parent.userData.type == 'timeline' || intersects[0].object.parent.parent.userData.type == 'timeline') {
                // console.log('timeline move')
                document.body.style.cssText = "cursor: -moz-grab; cursor: -webkit-grab; cursor: grab;";
            }

        }

    }

    // onmousewheel
    var addEvent = (function(window, undefined) {
        var _eventCompat = function(event) {
            var type = event.type;
            if (type == 'DOMMouseScroll' || type == 'mousewheel') {
                event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
            }
            //alert(event.delta);
            if (event.srcElement && !event.target) {
                event.target = event.srcElement;
            }
            if (!event.preventDefault && event.returnValue !== undefined) {
                event.preventDefault = function() {
                    event.returnValue = false;
                };
            }
            /* 
             ......其他一些兼容性处理 */
            return event;
        };
        if (window.addEventListener) {
            return function(el, type, fn, capture) {
                if (type === "mousewheel" && document.mozFullScreen !== undefined) {
                    type = "DOMMouseScroll";
                }
                el.addEventListener(type, function(event) {
                    fn.call(this, _eventCompat(event));
                }, capture || false);
            }
        } else if (window.attachEvent) {
            return function(el, type, fn, capture) {
                el.attachEvent("on" + type, function(event) {
                    event = event || window.event;
                    fn.call(el, _eventCompat(event));
                });
            }
        }
        return function() {};
    })(window);
    addEvent(document, "mousewheel", onMousewheel);


    function onMousewheel(event) {

        var delta = event.delta;
        if (delta > 0) {
            if (scaleN >= 1.7) {
                scaleN = 1.7;

            } else {
                scaleN += 0.05
            }

        } else if (delta < 0) {
            if (scaleN <= 0.7) {
                scaleN = 0.7;

            } else {
                scaleN -= 0.05
            }

        }


        if (delta > 0) {
            if (scaleM >= 2.4) {
                scaleM = 2.4;

            } else {
                scaleM += 0.05
            }

        } else if (delta < 0) {
            if (scaleM <= 0.7) {
                scaleM = 0.7;

            } else {
                scaleM -= 0.05
            }

        }


    }

    // mouse / touch up
    function onDocumentMouseUp(event) {

        // document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener('mouseup', onDocumentMouseUp, false);
        document.removeEventListener('mouseout', onDocumentMouseOut, false);
        if (grabbedTimeline) {
            finishedDrift = false;
        }
        grabbedEarth = false;
        grabbedTimeline = false;
        document.removeEventListener('touchend', onDocumentMouseUp, false);
    }

    // mouse / touch out
    function onDocumentMouseOut(event) {

        // document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener('mouseup', onDocumentMouseUp, false);
        document.removeEventListener('mouseout', onDocumentMouseOut, false);
        if (grabbedTimeline) {
            finishedDrift = false;
        }
        grabbedEarth = false;
        grabbedTimeline = false;

    }

    window.onDocumentMouseMoveDetail = function(event) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
        // if showing detail view add some parrllax
        if (showingDetail) {
            targetSceneRotationY = -mouseX * .00007;
            targetSceneRotationX = -mouseY * .0001;
        }

    }

    // need gyro equivelent for mobile

}

/**
 * 设置显示内容的函数
 * @param {*number} year 截止时间
 * @param {*arr<string>} type 站点类型
 * @param {*arr} range  [min,max]
 */

function getSeries(year, type, range) {
    var date = !!year ? year : (new Date().getFullYear());
    var data = filterDate(datas, date);
    var series = [];
    if (typeof type == 'undefined') {
        type = []
        for (var i = 0, len = types.length; i < len; i++) {
            // console.log(i)
            type.push(i)
        }

    }

    for (var i = 0, len = type.length; i < len; i++) {
        var tmp = [];
        tmp = data.map(function(item) {
                if (item[2] == type[i]) {
                    return [item[3], item[4]]
                } else {
                    return null
                }
            }).filter(function(item) {
                return !!item;
            })
            // console.log(types[type[i]])
        series.push({
            type: 'scatter3D',
            coordinateSystem: 'globe',
            symbol: types[type[i]],
            symbolSize: 10,
            markPoint: types[type[i]],
            data: tmp,
            blendMode: 'source-over', // source-over
            zlevel: 20
        })

    }

    return series;
}

/**
 * 外部的光圈
 */
function addOuterRing() {
    var geo = new THREE.PlaneGeometry(800, 800, 1, 1);
    var mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("assets/images/radial_layers_medium.jpg"),
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending
    });
    outerRing = new THREE.Mesh(geo, mat);
    outerRing.position.z = 0;
    outerRing.position.y = 0;
    outerRing.rotation.z = 0;
    group.add(outerRing)

    //动画效果
    /* 	outerRing.show = function () {
     //console.log("showing outer ring");
     scene.add(outerRing);
     var tween = new TWEEN.Tween(this.material).to({
     opacity: .4
     }, 1500).start();
     tween.easing(TWEEN.Easing.Bounce.Out);
     //var tween = new TWEEN.Tween(this.material).to({ opacity:.4 }, 500).delay(500).start();
     //tween.easing(TWEEN.Easing.Bounce.InOut);
     } */

}

/**
 * 时间轴更新的是时候触发的函数
 */
function onTimeLineUpdated(data) {
    // console.log(State.timeLineRot)     // 80 开始的， 刻度 1995 在 120处

    var r = Math.round((State.timeLineRot - 90) * 100) / 100; //减少90度

    var cYear = State.year;
    // console.log(cYear);
    var oldYear = cYear;

    var ra = Math.round(r);
    cYear = 1950 + Math.floor(ra / 4);
    // console.log(cYear + "  " + oldYear + "  " + ra)
    if (oldYear !== cYear) {
        State.year = cYear;

        if (State.slider) {

            $("#slider-range-max").slider({
                range: true,
                min: 0,
                max: 110,
                values: [0, 110],
                slide: function(event, ui) {

                    if (State.year != now) {
                        // targetRotationX = 0;
                        /*     var position = 6.30; //设置到右边的最大距离
                            timeline.dial.rotation.y = 6.30; */
                        targetRotationX = -maxRot;
                        // var position = 6.30; //设置到右边的最大距离
                        timeline.dial.rotation.y = maxRot

                    }
                    // console.log(ui.values)
                    var end1 = now - ui.values[0];
                    var begin1 = now - ui.values[1];
                    if (begin1 < 1909) {
                        begin1 = 1900;
                    }
                    State.slider = true;
                    State.sliderValue = [begin1, end1]
                    timeRelateStation(State.types, begin1, end1);
                }
            });
            State.slider = false;
        }


        // updateStation.tid = setTimeout(function () {
        // TimeRelateStation(State.types, State.year, 0);
        if (State.year > now) {
            State.year = now;
        }
        if (State.year < 1950) {
            State.year = 1950;
        }
        timeRelateStation(State.types, 1900, State.year);
        // console.log(State);
        // }, 100);
        if (State.types.length == 0) {
            $(".stationNumber").hide();
        } else {
            //if (playSpeed != 0) {
            if (isInSilkRoad || isInGlobalMonitor) {
                $(".stationNumber").hide();
            } else {
                $(".stationNumber").show();
            }

            //}
        }


        if (isInHistory) {
            if (State.year > 1987) {
                addSatelliteClick(nativeSyncSatellites);
                addComenStation(stationContainer, nativeSyncSatellites);
                addSatelliteClick(nativePolarSatellites);
                addComenStation(stationContainer, nativePolarSatellites);
            } else {
                removeType(stationContainer, "NativeSyncSatellite");
                removeType(stationContainer, "NativePolarSatellite");

            }

            if (+State.year > 2017) {
                $('.stationNumber .station').append('<div id="areaStation" class="singleType " style="height: 0.45rem; font-size: 0.25rem; line-height: 0.45rem;"><div class="year">60955</div><div class="type">站（区域站<span></span>）</div></div>')
            } else {
                if ($('#areaStation').length > 0) {
                    $("#areaStation").remove();
                }
            }

            setSateNumber(State.year);
        }
        State.types.forEach(function(type) {
            var num = 0;
            stationContainer.getObjectByName(type).children.forEach(function(year) {
                num += year.children.length
            })


            $(".singleType." + type + " .year").html(num);
        })
        $(".stationNumber>.year>.num").html(State.year);


        if (State.hotEventTypes.length != 0) {
            updateHotEvent(State.hotEventTypes, State.year, stationContainer, mapMode);
        }


    }


}

/***
 * 创建年份数组
 */
function createYearArr(start, end) {
    var years = [];
    for (var i = start; i <= end; i++) {
        years.push(i);
    }
    return years;
}

/**
 * 添加时间轴
 */
function addTimeline2() {
    timeline = new THREE.Object3D();
    timeline.dial = new THREE.Object3D();
    timeline.outerDial = new THREE.Object3D();
    timeline.pointer = new THREE.Object3D();
    timeline.add(timeline.dial);
    timeline.add(timeline.outerDial);
    timeline.add(timeline.pointer);

    r = 120;

    var mat = new THREE.LineBasicMaterial({
        linewidth: 1,
        color: 0x6FD5F0,
        transparent: true,
        opacity: .7
    });


    var years = createYearArr(1950, now);
    var y = 0;
    var yr = years[y]

    var t = 2 * Math.PI / 360; //   1度 对应的   弧度

    psize = 3.0;
    py = 1.9;

    var lineGeo = new THREE.Geometry();
    for (i = 0; i < 360; i++) {

        //注意本来是应该和设定的  t * i来进行；但是生成图片的方法有些问题，所以进行了小调整
        var x = r * Math.cos(t * (i + 3.5));
        var z = r * Math.sin(t * (i + 3.5));

        //  365 个刻度
        lineGeo.vertices.push(new THREE.Vector3(x * .985, 0, z * .985));
        lineGeo.vertices.push(new THREE.Vector3(x, 0, z));

        //第二层刻度
        var geo = new THREE.Geometry();
        lineGeo.vertices.push(new THREE.Vector3(x * .96, 0, z * .96));
        lineGeo.vertices.push(new THREE.Vector3(x * .965, 0, z * .965));

        //日期贴片
        var rats = 4 * (now - 1950); //修改now值会自动添加最新的年份的贴片，now在conf.js中定义；显示最大的年份

        if ((i % 4 === 0 && i >= 0 && i <= rats)) {
            // console.log(yr);
            // var pgeo = new THREE.PlaneGeometry(psize * 2, psize);
            // var pmat = new THREE.MeshPhongMaterial({
            //     map: new THREE.TextureLoader().load("assets/images/years/" + yr + ".png"),
            //     transparent: true,
            //     opacity: 1
            // });
            // p = new THREE.Mesh(pgeo, pmat);


            var canvas1 = document.createElement("canvas");
            canvas1.setAttribute("width", "256px");
            canvas1.setAttribute('height', "32px")
            var ctx = canvas1.getContext("2d");
            ctx.fillStyle = "#c0fcfc";
            ctx.font = "28px Arial";
            ctx.fillText(yr, 8, 20, 200);
            var texture = new THREE.Texture(canvas1);
            texture.needsUpdate = true;
            //使用plane显示文字
            var material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide,
                depthWrite: false
            });
            // var textObj = new THREE.Sprite(material);
            var geo = new THREE.PlaneGeometry(24, 3, 1, 1);
            p = new THREE.Mesh(geo, material);

            p.position.x = x * 1;
            p.position.z = z * 1;
            p.position.y = py;
            p.lookAt(new THREE.Vector3(0, 60, 0));
            timeline.dial.add(p); //添加日期
            // console.log(yr)
            yr = years[++y];

            //加长日期刻度
            var geo = new THREE.Geometry();
            geo.vertices.push(new THREE.Vector3(x * .96, 0, z * .96));
            geo.vertices.push(new THREE.Vector3(x * .99, 0, z * .99));
            var line = new THREE.Line(geo, mat);
            timeline.dial.add(line);

        }

    }

    // now add all the lines as one piece of geometry
    var line = new THREE.LineSegments(lineGeo, mat);
    timeline.dial.add(line); //这里有了日期和部分点

    // timeline 内部的面用来赋值拖拽
    // invisilbe shape inside timeline to help with dragging
    geo = new THREE.PlaneGeometry(250, 35, 1, 1);
    material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        color: 0x6FD5F0
    });
    circle = new THREE.Mesh(geo, material);
    circle.position.z = -150;
    circle.position.y = -10;
    timeline.add(circle);

    // outer dial 外部的圈
    geo = new THREE.CylinderGeometry(r + 12, r + 12, 1, 200, 1, true);
    material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: .1,
        color: 0x6FD5F0,
        side: THREE.DoubleSide
    });
    circle = new THREE.Mesh(geo, material);
    timeline.outerDial.add(circle);
    geo = new THREE.CylinderGeometry(r + 14, r + 14, 1, 200, 1, true);
    material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: .2,
        color: 0x6FD5F0,
        side: THREE.DoubleSide
    });
    circle = new THREE.Mesh(geo, material);
    timeline.outerDial.add(circle);

    // add some radial lines to this   外部的刻度
    var lineGeo = new THREE.Geometry();
    mat = new THREE.LineBasicMaterial({
        linewidth: 2,
        transparent: true,
        opacity: .4,
        color: 0x6FD5F0
    });
    for (i = 0; i < 360; i += 4) {
        var x = (r + 12) * Math.cos(t * i);
        var z = (r + 12) * Math.sin(t * i);
        //var geo = new THREE.Geometry();
        lineGeo.vertices.push(new THREE.Vector3(x * 1.07, 0, z * 1.07));
        lineGeo.vertices.push(new THREE.Vector3(x, 0, z));
        //var line = new THREE.Line(geo, mat);
        //line.rotation.y=Math.PI/180 * 90;
        //timeline.outerDial.add(line);
    }

    // now add all the lines as one piece of geometry
    var line = new THREE.LineSegments(lineGeo, mat);
    timeline.outerDial.add(line);

    // pointer object

    var s = new THREE.Shape();

    // 内部的环
    s.absarc(0, 0, r, Math.PI / 180 * 85, Math.PI / 180 * -280.5, false);
    s.lineTo((r - 10) * Math.cos(t * 90), (r - 10) * Math.sin(t * 90));
    s.lineTo((r) * Math.cos(t * 94.7), (r) * Math.sin(t * 94.7));
    //s.lineTo((r)*Math.cos(t*95),(r)*Math.sin(t*95));
    var geo = new THREE.ShapeGeometry(s);
    var mat = new THREE.LineBasicMaterial({
        linewidth: 1,
        transparent: true,
        opacity: .3,
        color: 0x6FD5F0
    });
    var tp = new THREE.Line(geo, mat);
    timeline.pointer.add(tp);
    timeline.pointer.rotation.x = Math.PI / 180 * -90;

    // add arrows to pointer
    var s = new THREE.Shape();
    s.moveTo(-.7, 0);
    s.lineTo(0, -1.8);
    s.lineTo(.7, 0);
    s.lineTo(-.7, 0);
    var geo = new THREE.ShapeGeometry(s);
    mat = new THREE.MeshLambertMaterial({
        transparent: true,
        opacity: .6,
        color: 0x7efaff,
        side: THREE.DoubleSide
    });
    var arrow = new THREE.Mesh(geo, mat);
    arrow.position.y = 121;
    var arrow2 = arrow.clone();
    arrow2.rotation.z = Math.PI / 180 * 180;
    arrow2.position.z -= 4;
    arrow.position.z -= .2;
    timeline.pointer.add(arrow);
    timeline.pointer.add(arrow2);

    // add curved arorws below pointer

    var s2 = new THREE.Shape();
    s2.absarc(0, 0, r, Math.PI / 180 * 75, Math.PI / 180 * 87, false);
    s2.moveTo((r) * Math.cos(t * 75), (r) * Math.sin(t * 75))
    s2.lineTo((r) * Math.cos(t * 75) - 2, (r) * Math.sin(t * 75) - 1);
    var geo = new THREE.ShapeGeometry(s2);
    var mat = new THREE.LineBasicMaterial({
        linewidth: 2,
        transparent: true,
        opacity: .2,
        color: 0x7efaff
    });
    var tp2 = new THREE.Line(geo, mat);
    tp2.position.z -= 7;

    var s2 = new THREE.Shape();
    s2.absarc(0, 0, r, Math.PI / 180 * 105, Math.PI / 180 * 93, false);
    s2.moveTo((r) * Math.cos(t * 105), (r) * Math.sin(t * 105))
    s2.lineTo((r) * Math.cos(t * 105) + 2, (r) * Math.sin(t * 105) - 1);
    var geo = new THREE.ShapeGeometry(s2);
    var mat = new THREE.LineBasicMaterial({
        linewidth: 2,
        transparent: true,
        opacity: .2,
        color: 0x7efaff
    });
    var tp3 = new THREE.Line(geo, mat);
    tp3.position.z -= 7;

    timeline.pointer.add(tp2);
    timeline.pointer.add(tp3);

    // timeline.position.z = 660 - window.innerWidth * .01;
    // timeline.position.y = -55 - window.innerWidth * .003;
    // timeline.rotation.x = THREE.Math.degToRad(90);

    // position the whole timeline object
    timeline.position.z = 530 - window.innerWidth * .01;
    timeline.position.y = -55 - window.innerWidth * .003;
    timeline.rotation.x = Math.PI / 180 * 5;

    // adjust the rotation of the dial to start
    // timeline.dial.rotation.y = Math.PI / 180 * 80;
    // timeline.dial.rotation.y = THREE.Math.degToRad(360);

    // timeline.outerDial.rotation.y = Math.PI / 180 * 80;

    scene.add(timeline);

    timeline.userData = {
        type: "timeline"
    };
    timeline.dial.rotation.y = maxRot;
    timeLinePosition = timeline.position.clone();

    objects.push(timeline);

}


/**
 * 获取雪碧图
 * @param {图标类型} type 
 * @param {大小} size 
 */
function getSprite(type, size) {
    var mat = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load("./assets/images/earth_icon/" + type + ".png"),
        transparent: true,
        opacity: 0.8,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4
    });
    var plane = new THREE.Sprite(mat);
    plane.scale.set(size, size, size);
    return plane;
}


/**
 * 获取图片形式的站点图标
 * @param {站点类型} type 
 * @param {图标大小} size 
 */
function getPlane(type, size) {
    var mat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4
    })
    var planeG = new THREE.PlaneGeometry(size, size);
    var plane = new THREE.Mesh(planeG, mat);
    // 加载一个资源
    new THREE.TextureLoader().load(
        // 资源链接
        "./assets/images/earth_icon/" + type + ".png?ver=1",
        // 资源加载完成后的回调函数
        function(texture) {
            // do something with the texture
            plane.material.map = texture;
            plane.material.opacity = 1;
            plane.material.needsUpdate = true;

        },
        // 资源加载过程中的回调函数
        function(xhr) {
            // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // 资源下载出错时的回调函数
        function(xhr) {
            // console.log('An error happened');
        }
    );
    return plane;
}


/**
 * 增加时间相关的站点用，主要是取出arr上的对象添加到earth上
 * @param beginIndex
 * @param endIndex
 * @param object
 * @param type
 * @param addsType
 */
function addTimelineStation(beginIndex, endIndex, object, type) {
    switch (type) {
        case "NationalGroundStation":
            if (mapMode == 3) {
                addDetailTimeStation(beginIndex, endIndex, object, NationalGroundStationArr, type);
            } else {
                addDetailTimeStation(beginIndex, endIndex, object, D2_NationalGroundStationArr, type);
            }


            break;
        case "NationalRadiationStation":

            if (mapMode == 3) {
                addDetailTimeStation(beginIndex, endIndex, object, NationalRadiationStationArr, type);
            } else {
                addDetailTimeStation(beginIndex, endIndex, object, D2_NationalRadiationStationArr, type);
            }
            break;
        case "NationalWelkinStation":

            if (mapMode == 3) {
                addDetailTimeStation(beginIndex, endIndex, object, NationalWelkinStationArr, type);
            } else {
                addDetailTimeStation(beginIndex, endIndex, object, D2_NationalWelkinStationArr, type);
            }
            break;

    }
}

/**
 * 移除站点相关的数组
 * @param {*} beginIndex 
 * @param {*} endIndex 
 * @param {*} object 
 * @param {*} type 
 */
function removeTimelineStation(beginIndex, endIndex, object, type) {
    switch (type) {
        case "NationalGroundStation":
            removeDetailTimeStation(lastIndex, clastIndex, object, NationalGroundStationArr, type);
            break;
        case "NationalRadiationStation":
            removeDetailTimeStation(lastIndex, clastIndex, object, NationalRadiationStationArr, type);
            break;
        case "NationalWelkinStation":
            removeDetailTimeStation(lastIndex, clastIndex, object, NationalWelkinStationArr, type);
            break;
    }
}


/**
 * 通用函数，添加什么由外面调用者决定，添加时间相关的函数
 * @param beginIndex
 * @param endIndex
 * @param object
 * @param arr
 * @param type
 */
function addDetailTimeStation(beginIndex, endIndex, object, arr, type) {

    for (var i = beginIndex; i < endIndex + 1; i++) {
        // console.log(arr[i])
        var tmpcs = arr[i];
        if (arr[i].children == undefined) continue;
        if (type == "NationalGroundStation") {
            addNGClick(arr[i]);
            addNGHover(arr[i]);
            arr[i].children.forEach(function(plane) {
                plane.disableEvent = false;
            })
        } else {
            addNGHover(arr[i])
            arr[i].children.forEach(function(plane) {
                plane.disableEvent = false;
            })
        }


        object.add(arr[i])
    }
    // earth.add(object);
}
/**
 * 移除时间相关的函数
 * @param {*} lastIndex 
 * @param {*} clastIndex 
 * @param {*} object 
 * @param {*} arr 
 * @param {*} type 
 */
function removeDetailTimeStation(lastIndex, clastIndex, object, arr, type) {

    var children = object.children;
    var len = clastIndex - lastIndex;
    for (var i = 0; i < len; i++) {
        if (children[clastIndex - 1].children == undefined) continue;
        if (type == "NationalGroundStation") {
            removeNGClick(children[clastIndex - 1]);
            removeNGHover(children[clastIndex - 1]);
            children[clastIndex - 1].children.forEach(function(plane) {
                plane.disableEvent = true;
            });
        } else {
            removeNGHover(children[clastIndex - 1]);
            children[clastIndex - 1].children.forEach(function(plane) {
                plane.disableEvent = true;
            })
        }

        object.remove(children[clastIndex]);
        --clastIndex;
    }
}


/**
 * 删除地图上显示的对应的站点信息
 */

function removeType(container, type) {

    var child = container.getObjectByName(type);
    if (child != undefined) {
        if (timeTypes.indexOf(type) !== -1) {
            if (type == "NationalGroundStation") {
                child.children.forEach(function(year) {
                    removeNGClick(year);
                    removeNGHover(year);
                })
            } else {
                child.children.forEach(function(year) {
                    if (year.children == undefined) return;
                    removeNGHover(year);
                    year.children.forEach(function(plane) {
                        plane.disableEvent = true;
                    })
                })
            }

        } else if (hotEventTypes.indexOf(type) !== -1) {
            if (child.children == "undefined") return;
            child.children.forEach(function(i) {
                i.disableEvent = true;
            })
            removerHotEvent2(child);


        } else {
            // console.log("removetype")
            if (type == "ForeignSyncSatellite" || type == "ForeignPolarSatellite" || type == "NativeSyncSatellite" || type == "NativePolarSatellite") {
                removeSatelliteClick(child);
            }
            removeSimpleHover(child);
            child.children.forEach(function(m) {
                m.disableEvent = true;
            })
        }
        container.remove(child)
    }
}

/**
 * 显示中国
 * @param {delay} timeout 
 */
function showChina(timeout) {
    isLastRotate = false;
    earthRotate = false;
    rotateToLatLngNormal(34, 110, 0, 0, timeout);
    scaleTo(1.5);
}

/**
 * 显示全球
 */
function showGlobal() {
    scaleTo(1);
    earthRotate = true;
    targetEarthRotationY = 0.4;
}

/**
 * 一般的类型添加过程
 */

function addComenType(fatherMode, type, mode) {
    console.log(fatherMode)
    if (mode == 3) {
        var container = earth;
        switch (type) {
            case "ForeignSyncSatellite":
                scaleTo(1);
                earthRotate = true;
                targetEarthRotationY = 0.4;

                addSatelliteClick(foreignSyncSatellites);
                addComenStation(container, foreignSyncSatellites);
                break;
            case "NativeSyncSatellite":

                scaleTo(1);
                earthRotate = true;
                // rotateToLatLngNormal(5, 112.33, 0);

                targetEarthRotationY = 0.4;
                addSatelliteClick(nativeSyncSatellites);
                addComenStation(container, nativeSyncSatellites);
                break;
            case "ForeignPolarSatellite":
                scaleTo(1);
                earthRotate = true;
                targetEarthRotationY = 0.4;
                addSatelliteClick(foreignPolarSatellites);
                addComenStation(container, foreignPolarSatellites);
                break;
            case "NativePolarSatellite":
                scaleTo(1);
                earthRotate = true;
                targetEarthRotationY = 0.4;

                addSatelliteClick(nativePolarSatellites);
                addComenStation(container, nativePolarSatellites);
                break;
            case "aircraft":
                scaleTo(1);
                earthRotate = true;
                targetEarthRotationY = 0.4;
                addComenStation(container, airplaneLineArr);
                break;
            case "globalShip":
                scaleTo(1);
                earthRotate = true;
                targetEarthRotationY = 0.4;
                addComenStation(container, boatArr);
                break;
            case "AreaStation_kh":
                showChina();
                if (!AreaStation_kh) {
                    AreaStation_kh = getGlobe('AreaStation_kh', './assets/images/AreaStation_kh.png', 1, 1);
                }
                addComenStation(container, AreaStation_kh);
                break;
            case "AreaStation_fkh":
                showChina();
                if (!AreaStation_fkh) {
                    AreaStation_fkh = getGlobe('AreaStation_fkh', './assets/images/AreaStation_fkh.png', 1, 1);
                }
                addComenStation(container, AreaStation_fkh);
                break;
            case "cldas":
                showChina();
                if (!cldas) {
                    cldas = getGlobe('cldas', "./assets/images/cldas.png", 1, 1);
                }
                addComenStation(container, cldas);
                break;
            case "cmpas":
                showChina();
                if (!cmpas) {
                    cmpas = getGlobe('cmpas', "./assets/images/cmpas.png", 1, 1);
                }
                addComenStation(container, cmpas);
                break;
            case "globalGroundStation":
                showGlobal();
                if (!globalGroundStation) {
                    globalGroundStation = getGlobe("globalGroundStation", "./assets/images/globalGroundStation.png", 1, 1);

                }
                addComenStation(container, globalGroundStation);
                break;
            case "globalGaokong":
                scaleTo(1);
                earthRotate = true;
                targetEarthRotationY = 0.4;
                if (!globalGaokong) {
                    globalGaokong = typeObjs("globalGaokong", datas["globalGaokong"], 2);

                }
                addComenStation(container, globalGaokong);
                break;
            case "shuzhimoshi":

                showChina()

                if (!shuzhimoshi) {
                    shuzhimoshi = getGlobe('shuzhimoshi', "./assets/images/shuzhimoshi.png", 1, 1);

                }
                addComenStation(container, shuzhimoshi);
                break;
            case "duopuleRadar":
                showChina();

                if (!duopuleRadar) {
                    duopuleRadar = typeObjs("duopuleRadar", datas["duopuleRadar"], 2);
                    var duopuleArea = getGlobe("duopuleRada", "./assets/images/duopuleRadaArea.png", 0, 0);
                    duopuleRadar.add(duopuleArea);
                }
                addComenStation(container, duopuleRadar);
                break;
            case "WIND_GPS":

                showChina();

                if (!windGisArr) {
                    windGisArr = typeObjs("WIND_GPS", datas["WIND_GPS"], 2);

                }
                addComenStation(container, windGisArr);
                break;
            case "214":

                showChina();

                if (!data214Arr) {
                    data214Arr = typeObjs("214", datas["214"], 2);
                }
                addComenStation(container, data214Arr);
                break;
            case "AgrometeorologicalStation":

                showChina();

                if (!AgrometeorologicalStationArr) {
                    AgrometeorologicalStationArr = typeObjs("AgrometeorologicalStation", datas["AgrometeorologicalStation"], 2);
                }
                addComenStation(container, AgrometeorologicalStationArr);
                break;
            case "GAW_STATION":

                showChina();

                if (!GAWSTATIONArr) {
                    GAWSTATIONArr = typeObjs("GAW_STATION", datas["GAW_STATION"], 2);

                }
                addComenStation(container, GAWSTATIONArr);
                break;
            case "traffic":

                showChina();

                if (!trafficArr) {
                    trafficArr = typeObjsPlane("traffic", datas["traffic"], 2, 0xf38900);

                }
                addComenStation(container, trafficArr);
                break;
            case "NEARSURF_STATION":

                showChina();

                if (!NEARSURFSTATIONArr) {
                    NEARSURFSTATIONArr = typeObjs("NEARSURF_STATION", datas["NEARSURF_STATION"], 2);

                }
                addComenStation(container, NEARSURFSTATIONArr);
                break;
            case "RADIATION_STATION":

                showChina();

                if (!RADIATIONSTATIONArr) {
                    RADIATIONSTATIONArr = typeObjs("RADIATION_STATION", datas["RADIATION_STATION"], 2);

                }
                addComenStation(container, RADIATIONSTATIONArr);
                break;
            case "AGME_ASM":

                showChina();

                if (!AGMEASMArr) {
                    AGMEASMArr = typeObjsPlane("AGME_ASM", datas["AGME_ASM"], 2, 0xd7aa41);

                }
                addComenStation(container, AGMEASMArr);
                break;
            case "silkroad":
                scaleTo(1);
                earthRotate = false;
                showChina();
                addSilkRoad(container, silkroad);
                break;
            case "UPAR_GPS":

                showChina();

                if (!UPAR_GPSArr) {
                    UPAR_GPSArr = typeObjsPlane("UPAR_GPS", datas["UPAR_GPS"], 2, 0x4dfdfd);

                }
                addComenStation(container, UPAR_GPSArr);
                break;
            case "ANION_BR_STATION":

                showChina();

                if (!ANIONBRSTATIONArr) {
                    ANIONBRSTATIONArr = typeObjs("ANION_BR_STATION", datas["ANION_BR_STATION"], 2);

                }
                addComenStation(container, ANIONBRSTATIONArr);
                break;
            case "HYDROLOGY_STATION":

                showChina();

                if (!HYDROLOGYSTATIONArr) {
                    HYDROLOGYSTATIONArr = getGlobe('HYDROLOGY_STATION', './assets/images/ChinaRiver.png', 1, 1);

                }
                addComenStation(container, HYDROLOGYSTATIONArr);
                break;
            case "globalBuoy":

                showGlobal();

                if (!globalBuoyArr) {
                    globalBuoyArr = typeObjs("globalBuoy", datas["globalBuoy"], 2);

                }
                addComenStation(container, globalBuoyArr);
                break;
            case "global_sea":

                showGlobal();

                if (!globalseaArr) {
                    globalseaArr = typeObjs("global_sea", datas["global_sea"], 2);

                }
                addComenStation(container, globalseaArr);
                break;
            case "transport":

                showChina();

                if (!transportArr) {
                    transportArr = typeObjs("transport", datas["transport"], 2);

                }
                addComenStation(container, transportArr);
                break;
            case "globalRadiationStation":
                scaleTo(1);
                earthRotate = true;
                targetEarthRotationY = 0.4;
                if (!globalRadiationStationArr) {
                    globalRadiationStationArr = typeObjs("globalRadiationStation", datas["globalRadiationStation"], 2);

                }
                addComenStation(container, globalRadiationStationArr);
                break;
            case "turang":

                showChina();

                if (!turangArr) {
                    turangArr = typeObjs("turang", datas["turang"], 2);

                }
                addComenStation(container, turangArr);
                break;
            case "hedaoshuiqing":

                showChina();

                if (!hedaoshuiqing) {
                    hedaoshuiqing = typeObjs("hedaoshuiqing", datas["hedaoshuiqing"], 2);

                }
                addComenStation(container, hedaoshuiqing);
                break;
            case "jiangshui":

                showChina();

                if (!jiangshui) {
                    jiangshui = getGlobe("jiangshui", "./assets/images/jiangshui.png", 1, 1);

                }
                addComenStation(container, jiangshui);
                break;

            case "cloud":
                if (!cloud) {
                    cloud = getGlobe("jiangshui", "./assets/images/cloud.png", 1, 1);
                }
                addComenStation(container, cloud)
                break;

        }
    } else if (mode == 2) {
        var container = mapPlane;
        switch (type) {
            case "ForeignSyncSatellite":
                scaleTo(1);
                earthRotate = true;
                targetEarthRotationY = 0.4;

                addSatelliteClick(foreignSyncSatellites);
                addComenStation(container, D2_foreignSyncSatellites);
                break;
            case "NativeSyncSatellite":

                scaleTo(1);
                earthRotate = true;
                // rotateToLatLngNormal(5, 112.33, 0);

                targetEarthRotationY = 0.4;
                addSatelliteClick(D2_nativeSyncSatellites);
                addComenStation(container, D2_nativeSyncSatellites);
                break;
            case "ForeignPolarSatellite":
                scaleTo(1);
                earthRotate = true;
                targetEarthRotationY = 0.4;
                addSatelliteClick(foreignPolarSatellites);
                addComenStation(container, foreignPolarSatellites);
                break;
            case "NativePolarSatellite":
                scaleTo(1);
                earthRotate = true;
                targetEarthRotationY = 0.4;

                addSatelliteClick(nativePolarSatellites);
                addComenStation(container, nativePolarSatellites);
                break;
            case "aircraft":
                scaleTo(1);
                earthRotate = true;
                targetEarthRotationY = 0.4;
                addComenStation(container, D2_airplaneLineArr);
                break;
            case "globalShip":
                scaleTo(1);
                earthRotate = true;
                targetEarthRotationY = 0.4;
                addComenStation(container, D2_boatArr);
                break;
            case "AreaStation_kh":
                showChina();
                if (!D2_AreaStation_kh) {
                    D2_AreaStation_kh = getGlobe('AreaStation_kh', './assets/images/AreaStation_kh.png', 1, 1, PLAN2D);
                }
                addComenStation(container, D2_AreaStation_kh);
                break;
            case "AreaStation_fkh":
                showChina();
                if (!D2_AreaStation_fkh) {
                    D2_AreaStation_fkh = getGlobe('AreaStation_fkh', './assets/images/AreaStation_fkh.png', 1, 1, PLAN2D);
                }
                addComenStation(container, D2_AreaStation_fkh);
                break;

            case "globalGroundStation":
                showGlobal();
                if (!D2_globalGroundStation) {
                    D2_globalGroundStation = getGlobe("globalGroundStation", "./assets/images/globalGroundStation.png", 1, 1, PLAN2D);

                }
                addComenStation(container, D2_globalGroundStation);
                break;
            case "globalGaokong":
                scaleTo(1);
                earthRotate = true;
                targetEarthRotationY = 0.4;
                if (!D2_globalGaokong) {
                    D2_globalGaokong = typeObjs("globalGaokong", datas["globalGaokong"], 2, PLAN2D);

                }
                addComenStation(container, D2_globalGaokong);
                break;
            case "shuzhimoshi":

                showChina()

                if (!D2_shuzhimoshi) {
                    D2_shuzhimoshi = getGlobe('shuzhimoshi', "./assets/images/shuzhimoshi.png", 1, 1, PLAN2D);

                }
                addComenStation(container, D2_shuzhimoshi);
                break;
            case "duopuleRadar":
                showChina();

                if (!D2_duopuleRadar) {
                    D2_duopuleRadar = typeObjs("duopuleRadar", datas["duopuleRadar"], 2, PLAN2D);
                    var duopuleArea = getGlobe("duopuleRada", "./assets/images/duopuleRadaArea1.png", 0, 0, PLAN2D);
                    D2_duopuleRadar.add(duopuleArea);
                }
                addComenStation(container, D2_duopuleRadar);
                break;
            case "WIND_GPS":

                showChina();

                if (!D2_windGisArr) {
                    D2_windGisArr = typeObjs("WIND_GPS", datas["WIND_GPS"], 2, PLAN2D);

                }
                addComenStation(container, D2_windGisArr);
                break;
            case "214":

                showChina();

                if (!D2_data214Arr) {
                    D2_data214Arr = typeObjs("214", datas["214"], 2, PLAN2D);
                }
                addComenStation(container, D2_data214Arr);
                break;
            case "AgrometeorologicalStation":

                showChina();

                if (!D2_AgrometeorologicalStationArr) {
                    D2_AgrometeorologicalStationArr = typeObjs("AgrometeorologicalStation", datas["AgrometeorologicalStation"], 2, PLAN2D);
                }
                addComenStation(container, D2_AgrometeorologicalStationArr);
                break;
            case "GAW_STATION":

                showChina();

                if (!D2_GAWSTATIONArr) {
                    D2_GAWSTATIONArr = typeObjs("GAW_STATION", datas["GAW_STATION"], 2, PLAN2D);

                }
                addComenStation(container, D2_GAWSTATIONArr);
                break;
            case "traffic":

                showChina();

                if (!D2_trafficArr) {
                    D2_trafficArr = typeObjsPlane("traffic", datas["traffic"], 2, 0xf38900, PLAN2D);

                }
                addComenStation(container, D2_trafficArr);
                break;
            case "NEARSURF_STATION":

                showChina();

                if (!D2_NEARSURFSTATIONArr) {
                    D2_NEARSURFSTATIONArr = typeObjs("NEARSURF_STATION", datas["NEARSURF_STATION"], 2, PLAN2D);

                }
                addComenStation(container, D2_NEARSURFSTATIONArr);
                break;
            case "RADIATION_STATION":

                showChina();

                if (!D2_RADIATIONSTATIONArr) {
                    D2_RADIATIONSTATIONArr = typeObjs("RADIATION_STATION", datas["RADIATION_STATION"], 2, PLAN2D);

                }
                addComenStation(container, D2_RADIATIONSTATIONArr);
                break;
            case "AGME_ASM":

                showChina();

                if (!D2_AGMEASMArr) {
                    D2_AGMEASMArr = typeObjsPlane("AGME_ASM", datas["AGME_ASM"], 2, 0xd7aa41, PLAN2D);

                }
                addComenStation(container, D2_AGMEASMArr);
                break;
            case "silkroad":
                scaleTo(1);
                earthRotate = false;
                showChina();
                addSilkRoad(container, D2_silkroad);
                break;
            case "UPAR_GPS":

                showChina();

                if (!D2_UPAR_GPSArr) {
                    D2_UPAR_GPSArr = typeObjsPlane("UPAR_GPS", datas["UPAR_GPS"], 2, 0x4dfdfd, PLAN2D);

                }
                addComenStation(container, D2_UPAR_GPSArr);
                break;
            case "ANION_BR_STATION":

                showChina();

                if (!D2_ANIONBRSTATIONArr) {
                    D2_ANIONBRSTATIONArr = typeObjs("ANION_BR_STATION", datas["ANION_BR_STATION"], 2, PLAN2D);

                }
                addComenStation(container, D2_ANIONBRSTATIONArr);
                break;
            case "HYDROLOGY_STATION":

                showChina();

                if (!D2_HYDROLOGYSTATIONArr) {
                    D2_HYDROLOGYSTATIONArr = getGlobe('HYDROLOGY_STATION', './assets/images/ChinaRiver.png', 1, 1, PLAN2D);

                }
                addComenStation(container, D2_HYDROLOGYSTATIONArr);
                break;
            case "globalBuoy":

                showGlobal();

                if (!D2_globalBuoyArr) {
                    D2_globalBuoyArr = typeObjs("globalBuoy", datas["globalBuoy"], 2, PLAN2D);

                }
                addComenStation(container, D2_globalBuoyArr);
                break;
            case "global_sea":

                showGlobal();

                if (!D2_globalseaArr) {
                    D2_globalseaArr = typeObjs("global_sea", datas["global_sea"], 2, PLAN2D);

                }
                addComenStation(container, D2_globalseaArr);
                break;
            case "transport":

                showChina();

                if (!D2_transportArr) {
                    D2_transportArr = typeObjs("transport", datas["transport"], 2, PLAN2D);

                }
                addComenStation(container, D2_transportArr);
                break;
            case "globalRadiationStation":
                scaleTo(1);
                earthRotate = true;
                targetEarthRotationY = 0.4;
                if (!D2_globalRadiationStationArr) {
                    D2_globalRadiationStationArr = typeObjs("globalRadiationStation", datas["globalRadiationStation"], 2, PLAN2D);

                }
                addComenStation(container, D2_globalRadiationStationArr);
                break;
            case "turang":

                showChina();

                if (!D2_turangArr) {
                    D2_turangArr = typeObjs("turang", datas["turang"], 2, PLAN2D);

                }
                addComenStation(container, D2_turangArr);
                break;
            case "hedaoshuiqing":

                showChina();

                if (!D2_hedaoshuiqing) {
                    D2_hedaoshuiqing = typeObjs("hedaoshuiqing", datas["hedaoshuiqing"], 2, PLAN2D);

                }
                addComenStation(container, D2_hedaoshuiqing);
                break;
            case "jiangshui":

                showChina();

                if (!D2_jiangshui) {
                    D2_jiangshui = getGlobe("jiangshui", "./assets/images/jiangshui.png", 1, 1, PLAN2D);

                }
                addComenStation(container, D2_jiangshui);
                break;
            case "cloud":
                if (!cloud) {
                    cloud = getGlobe("jiangshui", "./assets/images/cloud.png", 1, 1, PLAN2D);

                }
                addComenStation(container, cloud);
                break;

        }
    }

}

/**
 * 添加丝绸之路
 * @param {底图类型} container 
 * @param {要被添加的对象} obj 
 */
function addSilkRoad(container, obj) {
    addIntroduceHover(obj);
    obj.children.forEach(function(m) {
        m.disableEvent = false;
    })
    container.add(obj);
}

/**
 * 添加一般类型的站点
 * @param {*} container 
 * @param {*} obj 
 */
function addComenStation(container, obj) {
    addSimpleHover(obj);
    obj.children.forEach(function(m) {
        m.disableEvent = false;
    })
    container.add(obj);
}


//创建时间相关的东西的数组

function TimeReStations(type, data, func, key23d) {
    var resultArr = [];
    var years = Object.keys(data);
    for (var i = 0, len = years.length; i < len; i++) {
        var CYStations = new THREE.Object3D();
        CYStations.name = years[i];
        CYStationsData = data[years[i]]; //这里获取到每年的 新增的站点的数组  
        CYStationsData.forEach(function(value, index) {
            var plane = func(type, value, key23d);
            CYStations.add(plane);
            // earthStationObject.add(plane);
        })
        resultArr.push(CYStations);
    }
    return resultArr;
}


// 创建热点事件的数组
function hotEvents(type, data, func, mode) {
    var resultArr = [];
    var years = Object.keys(data);
    for (var i = 0, len = years.length; i < len; i++) {
        var CYStations = new THREE.Object3D();
        CYStations.name = type;

        CYStationsData = data[years[i]]; //这里获取到每年的 新增的站点的数组  
        CYStations.datas = CYStationsData;
        CYStationsData.forEach(function(value, index) {
            var plane = func(type, value, years[i], mode);
            CYStations.add(plane);
        })
        resultArr.push(CYStations);
    }
    return resultArr;
}


/**
 *  创建实体的国家地面站
 */

var smallBall = SmallGlobe(0xc4164b);

function createNationalGroundStation1(type, data) {
    var item = data;
    // var plane = getSprite(type, 2);
    var plane = smallBall.clone()

    plane.z = 100;

    plane.name = item[4];
    plane.code = item[0];
    //Lat/Lon 就是latitude/ longitude 纬度/经度
    plane.lat = item[3];
    plane.lon = item[2];
    plane.disableEvent = false;
    /*     plane.on("click", function (m) {
            if (m.disableEvent) {
                return;
            }
            // console.log('hah')
            // console.log(m.name);

            var code = m.code;
            // console.log(code);
            $('.tab').css('display', 'block');
            $('.juxing').css('display', 'block');
            $('#echart2').css('display', 'block');
            $('#title').css('display', 'block');
            var html = '',
                htmls = '';

            html += '<span class="country">' + m.name + '</span>' +
                '<span class="year">1951年~2016年</span>' +
                '<span class="rain">的年降水量</span>'
            htmls += '<span class="country">' + m.name + '</span>' +
                '<span class="year">1951年~2016年</span>' +
                '<span class="rain">的平均气温</span>'

            $('#title').html(htmls);
            $('#title').html(html);
            $('.tab  .rain span').attr('class', 'active2');
            $('.tab  .temperature span').attr('class', 'click');
            getRain();
            $('.tab  .rain').on('click', function () {
                if ($('.tab  .rain span').attr('class') != "active2") {
                    $('.tab  .rain span').attr('class', 'active2');
                    $('.tab  .temperature span').attr('class', 'click');
                    $('#title').html(html);
                    getRain();

                }
                // console.log(this.className)
            })
            $('.tab  .temperature').on('click', function () {
                //			alert(123456)
                if ($('.tab  .temperature span').attr('class') != "active2") {
                    $('.tab  .temperature span').attr('class', 'active2');
                    $('.tab  .rain span').attr('class', 'click');
                    $('#title').html(htmls);
                    getTemperature();

                }
                // console.log(this.className)
            })

            function getRain() {
                $.ajax({
                    //			url:'./data/echarts2.json',

                    url: "/cimiss-web/api?userId=usr_sjw&pwd=usr_sjw_150706&interfaceId=getSurfEleByTimeRangeAndStaID&dataCode=SURF_CHN_MUL_YER&elements=Year,PRE_Time_2020&timeRange=[19500929000000,20170929010000]&staIds=" + code + "&orderBy=Year&dataFormat=json",
                    //				url: "http://10.1.64.154/cimiss-web/api?userId=usr_sjw&pwd=usr_sjw_150706&interfaceId=getSurfEleByTimeRangeAndStaID&dataCode=SURF_CHN_MUL_YER&elements=Year,PRE_Time_2020&timeRange=[19500929000000,20170929010000]&staIds=" + code + "&orderBy=Year&dataFormat=json",
                    type: "get",
                    getType: 'json',
                    success: function (data) {
                        var data = JSON.parse(data);
                        var datas = data.DS;
                        // console.log(datas);
                        var arr = [];
                        var arr1 = [];
                        if(datas!=undefined){
                            for (var i = 0; i < datas.length; i++) {
                                if (datas[i].PRE_Time_2020 < 900000) {
                                    arr.push(datas[i].PRE_Time_2020);
                                    arr1.push(datas[i].Year);
                                }
                            }
                        }

                        //				console.log(arr);
                        var myCharts2 = echarts.init(document.getElementById('echart2'));
                        option = {
                            backgroundColor: 'rgba(4, 18, 31, 0.6)',
                            color: ['#3398DB'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '1%',
                                //      top"5%",
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                data: arr1,
                                splitLine: {
                                    lineStyle: {
                                        type: 'dashed'
                                    }
                                },
                                axisTick: {
                                    alignWithLabel: true
                                },
                                axisLabel: {
                                    interval: 3,
                                    textStyle: {
                                        color: '#96EFFB', //坐标值得具体的颜色
                                        fontSize: 10,
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#96EFFB',

                                    }
                                }
                            }],
                            yAxis: [{
                                name: '降水量(mm)',
                                nameLocation: 'end',
                                nameTextStyle: {
                                    fontSize: 8,
                                    align: 'center',
                                },
                                nameGap: 5,
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        type: 'dashed',
                                        color: '#2da3a6',
                                        opacity: 0.3

                                    }
                                },
                                splitNumber: 4,
                                type: 'value',
                                axisLabel: {
                                    interval: 0,
                                    textStyle: {
                                        color: '#96EFFB', //坐标值得具体的颜色
                                        fontSize: 8,
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#96EFFB'

                                    }
                                }
                            }],
                            series: [{
                                name: '降水量',
                                type: 'bar',
                                barWidth: '60%',
                                data: arr,
                                itemStyle: {
                                    normal: {
                                        color: '#2a96ec',
                                        opacity: 0.38,
                                    }
                                }
                            }]
                        };
                        // 为echarts对象加载数据
                        myCharts2.setOption(option);

                    }
                })
            }

            function getTemperature() {
                $.ajax({
                    //			url:'./data/echarts1.json',
                    //				url: "http://10.1.64.154/cimiss-web/api?userId=usr_sjw&pwd=usr_sjw_150706&interfaceId=getSurfEleByTimeRangeAndStaID&dataCode=SURF_CHN_MUL_YER&elements=Year,TEM_Avg&timeRange=[19500929000000,20170929010000]&staIds=" + code + "&orderBy=Year&dataFormat=json",
                    url: "/cimiss-web/api?userId=usr_sjw&pwd=usr_sjw_150706&interfaceId=getSurfEleByTimeRangeAndStaID&dataCode=SURF_CHN_MUL_YER&elements=Year,TEM_Avg&timeRange=[19500929000000,20170929010000]&staIds=" + code + "&orderBy=Year&dataFormat=json",
                    //			url:"/cimiss-web/api?userId=usr_sjw&pwd=usr_sjw_150706&interfaceId=getSurfEleByTimeRangeAndStaID&dataCode=SURF_CHN_MUL_YER&elements=Year,PRE_Time_2020&timeRange=[19500929000000,20170929010000]&staIds="+code+"&orderBy=Year&dataFormat=json",
                    type: "get",
                    getType: 'json',
                    success: function (data) {
                        var data = JSON.parse(data);
                        var datas = data.DS;
                        // console.log(datas);
                        var arr = [];
                        var arr1 = [];
                        if(datas!=undefined){
                            for (var i = 0; i < datas.length; i++) {

                                if (datas[i].TEM_Avg < 900000) {
                                    arr.push(datas[i].TEM_Avg);
                                    arr1.push(datas[i].Year);

                                }

                            }
                        }
                        

                        var myCharts2 = echarts.init(document.getElementById('echart2'));
                        options = {
                            backgroundColor: 'rgba(4, 18, 31, 0.6)',
                            color: ['#3398DB'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '1%',
                                //      top"5%",
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                data: arr1,
                                axisTick: {
                                    alignWithLabel: true
                                },
                                axisLabel: {
                                    interval: 3,
                                    textStyle: {
                                        color: '#96EFFB', //坐标值得具体的颜色
                                        fontSize: 8,
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#96EFFB'

                                    }
                                }
                            }],
                            yAxis: [{
                                name: '平均气温(℃)',
                                nameLocation: 'end',
                                nameTextStyle: {
                                    fontSize: 8,
                                    align: 'left',
                                    padding: 20

                                },
                                nameGap: 5,
                                splitNumber: 4,
                                type: 'value',
                                axisLabel: {
                                    interval: 0,
                                    textStyle: {
                                        color: '#96EFFB', //坐标值得具体的颜色
                                        fontSize: 8,
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#96EFFB'

                                    }
                                }
                            }],
                            series: [{
                                name: '平均气温',
                                type: 'bar',
                                barWidth: '60%',
                                data: arr,
                                itemStyle: {
                                    normal: {
                                        color: '#2a96ec',
                                        opacity: 0.38,
                                    }
                                }

                            }]
                        };
                        // 为echarts对象加载数据
                        myCharts2.setOption(options);
                    }
                })
            }

        })

        addShowLabel(plane); */
    var height = parseInt(radius * 0.01);
    setPosition(plane, item[3], item[2], height);
    // earthStationObject.add(plane);
    return plane;
}


/**
 * hover的时候显示站点的经纬度信息
 * @param {plane对象} obj 
 */
function addShowLabel(obj) {
    if (obj.name)
        obj.on('hover', function(m) {
            debugger
            //   console.log(e)
            if (m.disableEvent) {
                return;
            }
            document.body.style.cssText = "cursor: pointer";
            obj.scale.set(2, 2, 2);
            if (m instanceof THREE.Mesh && m.name != undefined) {
                // console.log('hover in mmm ' + m.name)

                nameBox.addClass("show");
                var lon = m.lon;

                var lat = m.lat;
                if (lon == null || lon == "") {
                    lon = "";
                } else {
                    lon = parseFloat(lon).toFixed(2);
                }
                if (lat == null || lat == "") {
                    lat = "";
                } else {
                    lat = parseFloat(lat).toFixed(2);
                }
                var html = "<span>站名: " + m.name + "</span>" +
                    "<span>站号: " + m.code + "</span>" +
                    "<span>经度: " + lon + "</span>" +
                    "<span>纬度: " + lat + "</span>";
                nameBox.html(html)
            }
            return;
        }, function(m) {

            if (m.disableEvent) {
                return;
            }
            document.body.style.cursor = "default";
            obj.scale.set(1, 1, 1);
            if (m instanceof THREE.Mesh && m.name != undefined) {
                nameBox.removeClass("show");
            }
        })
}

/**
 * 添加hover事件
 * @param {*} arr 
 */
function addNGHover(arr) {
    arr.children.forEach(function(child) {
        addShowLabel(child);
    })
}


/***
 * 移除hover事件
 */
function removeNGHover(arr) {
    arr.children.forEach(function(child) {
        child.off("hover");
    })
}

/**
 * 国家地面站的hover事件
 * @param {*} arr 
 */
function addNGClick(arr) {
    arr.children.forEach(function(plane) {
        plane.on("click", function(m) {
            if (m.disableEvent) {
                return;
            }


            var code = m.code;
            try {
                if (!temperature[code] || temperature[code].length == 0) {
                    return;
                }
            } catch (e) {

            }
            // console.log(code);
            $('.tab').css('display', 'block');
            $('.juxing').css('display', 'block');
            $('#echart2').css('display', 'block');
            $('#title').css('display', 'block');
            var html = '',
                htmls = '';

            html += '<span class="country">' + m.name + '</span>' +
                '<span class="year">1951年~2016年</span>' +
                '<span class="rain">的年降水量</span>'
            htmls += '<span class="country">' + m.name + '</span>' +
                '<span class="year">1951年~2016年</span>' +
                '<span class="rain">的平均气温</span>'

            $('.tab  .rain').unbind();
            $('.tab  .temperature').unbind();
            $('#title').html(html);
            $('.tab  .rain span').attr('class', 'active2');
            $('.tab  .temperature span').attr('class', 'click');
            getRain(code);
            $('.tab  .rain').on('click', function() {


                if ($('.tab  .rain span').attr('class') != "active2") {
                    $('.tab  .rain span').attr('class', 'active2');
                    $('.tab  .temperature span').attr('class', 'click');
                    $('#title').html(html);
                    getRain(code);

                }
                // console.log(this.className)
            })
            $('.tab  .temperature').on('click', function() {
                //			alert(123456)

                if ($('.tab  .temperature span').attr('class') != "active2") {
                    $('.tab  .temperature span').attr('class', 'active2');
                    $('.tab  .rain span').attr('class', 'click');
                    $('#title').html(htmls);
                    getTemperature(code);

                }
                // console.log(this.className)
            })

            function getRain(code) {
                var datas = rain[code];
                // console.log(datas);
                // console.log(datas);
                var arr = [];
                var arr1 = [];
                if (datas != undefined) {
                    for (var i = 0; i < datas.length; i++) {
                        if (datas[i].PRE_Time_2020 < 900000) {
                            arr.push(datas[i].PRE_Time_2020);
                            arr1.push(datas[i].Year);
                        }
                    }
                }

                //				console.log(arr);
                var myCharts2 = echarts.init(document.getElementById('echart2'));
                option = {
                    backgroundColor: 'rgba(4, 18, 31, 0.6)',
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '1%',
                        //      top"5%",
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: arr1,
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            interval: 3,
                            textStyle: {
                                color: '#96EFFB', //坐标值得具体的颜色
                                fontSize: 10,
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#96EFFB',

                            }
                        }
                    }],
                    yAxis: [{
                        name: '降水量(mm)',
                        nameLocation: 'end',
                        nameTextStyle: {
                            fontSize: 8,
                            align: 'center',
                        },
                        nameGap: 5,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'dashed',
                                color: '#2da3a6',
                                opacity: 0.3

                            }
                        },
                        splitNumber: 4,
                        type: 'value',
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: '#96EFFB', //坐标值得具体的颜色
                                fontSize: 8,
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#96EFFB'

                            }
                        }
                    }],
                    series: [{
                        name: '降水量',
                        type: 'bar',
                        barWidth: '60%',
                        data: arr,
                        itemStyle: {
                            normal: {
                                color: '#2a96ec',
                                opacity: 0.38,
                            }
                        }
                    }]
                };
                // 为echarts对象加载数据
                myCharts2.setOption(option);


            }

            function getTemperature(code) {

                var datas = temperature[code];
                // console.log(datas);
                // console.log(typeof datas)
                var arr = [];
                var arr1 = [];
                if (datas != undefined) {
                    for (var i = 0; i < datas.length; i++) {

                        if (datas[i].TEM_Avg < 900000) {
                            arr.push(datas[i].TEM_Avg);
                            arr1.push(datas[i].Year);

                        }

                    }
                }
                // console.log(arr)

                var myCharts2 = echarts.init(document.getElementById('echart2'));
                options = {
                    backgroundColor: 'rgba(4, 18, 31, 0.6)',
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '1%',
                        //      top"5%",
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: arr1,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            interval: 3,
                            textStyle: {
                                color: '#96EFFB', //坐标值得具体的颜色
                                fontSize: 8,
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#96EFFB'

                            }
                        }
                    }],
                    yAxis: [{
                        name: '平均气温(℃)',
                        nameLocation: 'end',
                        nameTextStyle: {
                            fontSize: 8,
                            align: 'left',
                            padding: 20

                        },
                        nameGap: 5,
                        splitNumber: 4,
                        type: 'value',
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: '#96EFFB', //坐标值得具体的颜色
                                fontSize: 8,
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#96EFFB'

                            }
                        }
                    }],
                    series: [{
                        name: '平均气温',
                        type: 'bar',
                        barWidth: '60%',
                        data: arr,
                        itemStyle: {
                            normal: {
                                color: '#2a96ec',
                                opacity: 0.38,
                            }
                        }

                    }]
                };
                // 为echarts对象加载数据
                myCharts2.setOption(options);

            }


        })
    })


}

/**
 * 移除国家地面站的hover事件
 * @param {*} arr 
 */
function removeNGClick(arr) {
    arr.children.forEach(function(child) {
        child.off("click");
        $('.tab  .rain').unbind();
        $('.tab  .temperature').unbind();

    })
}

/**
 * 创建国家高空站
 * @param {类型} type 
 * @param {数据} data 
 * @param {地图类型} key23d 
 */
function createNationalWelkinStation(type, data, key23d) {
    var item = data;
    // var plane = getSprite(type, 2);
    var plane = getPlane(type, 2)

    plane.z = 100;

    plane.name = item[4]
    plane.code = item[0]
    plane.lat = item[3];
    plane.lon = item[2];
    plane.disableEvent = false;
    /*   plane.on('click', function (m) {
        //   console.log(m.code);
      })
      addShowLabel(plane); */

    var height = parseInt(radius * 0.015);
    setPosition23D(plane, item[3], item[2], 2, key23d);
    return plane;
}


/**
 * 获取透明的plan
 * @param {*} size 
 */
function getTransparentPlane(size) {
    var mat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false
    })
    var planeG = new THREE.PlaneGeometry(size, size);
    var plane = new THREE.Mesh(planeG, mat);
    return plane;
}

groundStationPlane = null;


/**
 * 创建国家地面站的实体
 * @param {站点类型} type 
 * @param {单个站点的数据} data 
 * @param {指定坐标体系} key23d 
 */
function createNationalGroundStationPlane(type, data, key23d) {
    var item = data;
    if (!groundStationPlane) {
        groundStationPlane = getPlane(type, 1);
    }
    var plane = groundStationPlane.clone();
    if (+item[1].slice(0, 4) < 1950) {
        plane = getTransparentPlane(6).add(plane);
        // plane.add();
    }

    plane.z = 100;

    plane.name = item[4]
    plane.code = item[0]
    plane.lat = item[3];
    plane.lon = item[2];
    plane.disableEvent = false;
    /*   plane.on('click', function (m) {
        //   console.log(m.code);
      })
      addShowLabel(plane); */

    var height = parseInt(radius * 0.015);
    setPosition23D(plane, item[3], item[2], height, key23d);
    return plane;
}


/**
 * 设置点的位置，坐标转化为位置的方法
 * @param plane
 * @param lat
 * @param lon
 * @param height
 * @param key23D
 */

function setPosition23D(plane, lat, lon, height, key23D) {
    if (key23D == 2) {
        setPlanePosition(plane, lat, lon, height);
    } else {
        setPosition(plane, lat, lon, height);

    }
}

/**
 * 3d的时候如何添加站点
 * @param {*} obj 
 * @param {*} lat 
 * @param {*} lon 
 * @param {*} height 
 */
function setPosition(obj, lat, lon, height) {
    if (!height) {
        height = 0;
    }
    var pos = latlonToVector3(lat, lon, radius + height);

    obj.position.set(pos.x, pos.y, pos.z);
    var v = new THREE.Vector3();
    v.subVectors(obj.position, earth.position).add(obj.position);
    obj.lookAt(v);
}

/**
 * 2d的时候添加站点位置
 * @param {*} obj 
 * @param {*} lat 
 * @param {*} lon 
 * @param {*} height 
 */
function setPlanePosition(obj, lat, lon, height) {
    if (!height) {
        height = 0;
    }
    var pos = latlonToplaneVector3(lat, lon, 0);
    obj.position.set(pos.x, pos.y, pos.z);
    var v = new THREE.Vector3();
    v.subVectors(obj.position, mapPlane.position).add(mapPlane.position);
    obj.lookAt(v);
}


/**
 * 经纬度转化为uv贴图对应的坐标
 * @param {*} lat
 * @param {*} lon
 * @param {*} height
 */
function latlonToplaneVector3(lat, lon, height) {
    var xper = earthPlaneWidth / (earthUVscale.x * 360);
    var yper = earthPlaneHeight / (earthUVscale.y * 180);


    var centerLon = (180 - earthUVcenter.x * 360);

    if (+lon > (centerLon - 180)) {
        lon = +lon - centerLon;
    } else {

        lon = +lon + 360 - centerLon;


    }
    // if(Math.abs(+lat)>90||Math.abs(+lon)>180){
    //     return null;
    // }
    x1 = xper * lon;
    y1 = yper * +lat;
    //    console.log(x1,y1,height)
    return new THREE.Vector3(x1, y1, height);
}


function lon2lon(lon) {
    var centerLon = (180 - earthUVcenter.x * 360);

    if (+lon > (centerLon - 180)) {
        lon = +lon - centerLon;
    } else {
        lon = +lon + 360 - centerLon;
    }
    return lon;
}

function createNationalGroundStation2d(type, data, positionFn, height) {
    var plane = createNationalGroundStation(type, data);
    positionFn(plane, data[3], data[2], height);
    return plane;

}

function createNationalGroundStation(type, data) {
    var item = data;
    if (!groundStationPlane) {
        groundStationPlane = getPlane(type, 1);
    }
    var plane = groundStationPlane.clone();
    if (+item[1].slice(0, 4) < 1950) {
        plane = getTransparentPlane(6).add(plane);
        // plane.add();
    }


    plane.z = 100;

    plane.name = item[4]
    plane.code = item[0]
    plane.lat = item[3];
    plane.lon = item[2];
    plane.disableEvent = false;
    /*   plane.on('click', function (m) {
        //   console.log(m.code);
      })
      addShowLabel(plane); */

    var height = parseInt(radius * 0.015);

    return plane;
}


/**
 * 创建国家辐射站
 */

function createNationalRadiationStation(type, data, key23d) {
    var item = data;
    // var plane = getSprite(type, 2);
    var plane = getPlane(type, 2);

    plane.z = 100;

    plane.name = item[4]
    plane.code = item[0]
    plane.lat = item[3];
    plane.lon = item[2];

    /*  plane.on('click', function (m) {
        //  console.log(m.name);
     })
     addShowLabel(plane) */
    var height = parseInt(radius * 0.01);
    setPosition23D(plane, item[3], item[2], height, key23d);
    return plane;
}


/**
 *   创建同步卫星群
 */
function SyncSatellites(type, data, mode) {
    var syncSatellites = new THREE.Object3D();
    syncSatellites.name = type;

    for (var i = 0, len = data.length; i < len; i++) {
        var item = data[i];
        var syncSatellite = SingleSyncSatellite(type, item, mode);
        syncSatellites.add(syncSatellite);
    }

    return syncSatellites;
}


/**
 * 创建单独的同步卫星
 */
function SingleSyncSatellite(type, item, mode) {
    var singleSync = new THREE.Object3D();
    var country = item[5];
    var imgName = item[4];


    //卫星图标
    var mat = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load("./assets/images/syncSate/" + imgName + ".png"),
        transparent: true,
        opacity: 1,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4
    });
    var plane1 = new THREE.Sprite(mat);

    var size = item[6];
    plane1.name = item[4];
    plane1.lat = item[3];
    plane1.lon = item[2];
    plane1.scale.set(size, size, size);

    var plane = new THREE.Object3D();
    plane.add(plane1);


    // //描述图标

    var label = makeTextSprite(item[4], {
        fontsize: 24,
        borderColor: {
            r: 255,
            g: 0,
            b: 0,
            a: 1.0
        },
        backgroundColor: {
            r: 192,
            g: 252,
            b: 252,
            a: 0.8
        }
    });


    label.position.x = 25;
    label.position.y = 10;
    label.name = item[4];
    label.lat = item[3];
    label.lon = item[2];
    plane.add(label);


    // var sphere = new THREE.Mesh(geometry, material);
    plane.name = "satellite"

    plane.z = 80;


    var height = 1.01 * radius;


    setPosition23D(plane, item[3], item[2], height, mode)
    singleSync.add(plane)

    if (mode != 2) {
        //光滑的轨道线
        var curve = new THREE.EllipseCurve(
            0, 0, // ax, aY
            2 * radius, 2 * radius, // xRadius, yRadius
            0, 2 * Math.PI, // aStartAngle, aEndAngle
            false, // aClockwise
            0 // aRotation
        );

        var path = new THREE.Path(curve.getPoints(80));
        var geometry = path.createPointsGeometry(80);
        var material = new THREE.LineBasicMaterial({
            color: 0x6FD5F0
        });

        // Create the final object to add to the scene
        var ellipse = new THREE.Line(geometry, material);
        ellipse.rotation.z = Math.PI / 2;
        ellipse.rotation.x = Math.PI / 2;

        singleSync.add(ellipse);


        // 覆盖范围线

        var position1 = latlonToVector3(0, item[2] + 60, radius);
        var position2 = latlonToVector3(0, item[2], radius + height);
        var position3 = latlonToVector3(0, item[2] - 60, radius);

        // var material = new THREE.LineBasicMaterial({transparent:true,
        // 	color:0x6FD5F0});

        var material = new THREE.LineDashedMaterial({
            transparent: true,
            vertexColors: false,
            dashSize: 4,
            gapSize: 2,
            color: 0x6FD5F0,
            opacity: 0.4
        });
        // 空几何体，里面没有点的信息,不想BoxGeometry已经有一系列点，组成方形了。
        var geometry = new THREE.Geometry();
        // 给空白几何体添加点信息，这里写3个点，geometry会把这些点自动组合成线，面。
        geometry.vertices.push(new THREE.Vector3(position1.x, position1.y, position1.z));
        geometry.vertices.push(new THREE.Vector3(position2.x, position2.y, position2.z));
        geometry.vertices.push(new THREE.Vector3(position3.x, position3.y, position3.z));
        //线构造
        geometry.computeLineDistances();
        var line = new THREE.Line(geometry, material);
        singleSync.add(line)
        var sateArea = getGlobe('syncSate', "./assets/images/earth_icon/" + type + "SyncArea.png", 0, 0.3, mode)
    } else {

        var sateArea = getGlobe('syncSate', "./assets/images/earth_icon/D2_" + type + "SyncArea.png", 0, 0.3, mode)
    }


    // //    覆盖范围面
    // var geo = new THREE.SphereGeometry(radius, 50, 50);
    // var mat = new THREE.MeshLambertMaterial({
    //     map: new THREE.TextureLoader().load("./assets/images/earth_icon/" + type + "SyncArea.png"),
    //     transparent: true,
    //     depthTest: true,
    //     depthWrite: false,
    //     polygonOffset: true,
    //     polygonOffsetFactor: -4,
    //     opacity: .3
    // });
    // var sateArea = new THREE.Mesh(geo, mat);
    // // var sateArea = getGlobe('sateArea',"./assets/images/earth_icon/" + type + "SyncArea.png",0,.9)

    //覆盖范围面 直接用的话，导致不能拖动了

    singleSync.add(sateArea);
    return singleSync;
}


// 极地卫星群

function PolarSatellite(type, data) {
    var polarSatellites = new THREE.Object3D();
    polarSatellites.name = type;
    for (var i = 0, len = data.length; i < len; i++) {
        var item = data[i];
        var polarSatellite = SinglePolarSatellite(type, item);
        polarSatellites.add(polarSatellite);
    }
    return polarSatellites;
}


// 极地卫星
function SinglePolarSatellite(type, item) {
    var singleSync = new THREE.Object3D();
    var country = item[5];
    var imgName = 'jigui';
    var imgName = item[4];
    var mat = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load("./assets/images/polarSate/" + imgName + ".png"),
        transparent: true,
        opacity: 1,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4

    });
    var plane1 = new THREE.Sprite(mat);
    plane1.name = item[4];
    plane1.scale.set(15, 15, 15)
    var plane = new THREE.Object3D();
    plane.add(plane1);
    // 192,252,252
    // //文字
    // var canvas1 = document.createElement("canvas");
    // canvas1.setAttribute("width", "256px");
    // canvas1.setAttribute('height', "32px")
    // var ctx = canvas1.getContext("2d");
    // ctx.fillStyle = "#c0fcfc";
    // ctx.font = "24px Arial";
    // ctx.fillText(item[9], 8, 20, 200);
    // var texture = new THREE.Texture(canvas1);
    // texture.needsUpdate = true;
    // //使用plane显示文字
    // var material = new THREE.SpriteMaterial({
    //     map: texture,

    //     polygonOffsetFactor: -4
    // });
    // var label = new THREE.Sprite(material);
    // label.scale.set(45, 15, 15);
    var label = makeTextSprite(item[9], {
        fontsize: 22,
        borderColor: {
            r: 255,
            g: 0,
            b: 0,
            a: 1.0
        },
        backgroundColor: {
            r: 192,
            g: 252,
            b: 252,
            a: 0.8
        }
    });

    label.name = item[4];
    label.position.y = 30;
    label.position.x = 15;

    plane.add(label);


    plane.name = "satellite";
    plane.z = 200;


    var heightRatio = 0.4;
    var height = heightRatio * radius;

    plane.position.set(1.4 * radius * Math.cos(1), 0, 1.4 * radius * Math.sin(1))


    var deg = item[8]

    function StateMove() {
        deg += THREE.Math.degToRad(0.05);
        plane.position.set(1.4 * radius * Math.cos(deg), 0, 1.4 * radius * Math.sin(deg));
        requestAnimationFrame(StateMove)
    }

    StateMove()
        // addObjectAtLatlon(plane, item[3], item[2], height);

    // 轨道
    /* 	geo = new THREE.CylinderGeometry(radius * (1 + heightRatio), radius * ((1 + heightRatio)), 1, 200, 1, true);
     material = new THREE.MeshBasicMaterial({
     transparent: true,
     opacity: .2,
     color: 0x6FD5F0,
     side: THREE.DoubleSide
     });
     circle = new THREE.Mesh(geo, material); */

    var curve = new THREE.EllipseCurve(
        0, 0, // ax, aY
        1.4 * radius, 1.4 * radius, // xRadius, yRadius
        0, 2 * Math.PI, // aStartAngle, aEndAngle
        false, // aClockwise
        0 // aRotation
    );

    var path = new THREE.Path(curve.getPoints(80));
    var geometry = path.createPointsGeometry(80);
    var material = new THREE.LineBasicMaterial({
        color: 0x6FD5F0
    });

    // Create the final object to add to the scene
    var circle = new THREE.Line(geometry, material);
    circle.rotation.x = Math.PI / 2;


    // circle.rotation.z = THREE.Math.degToRad(item[7]);
    var groupPolar = new THREE.Object3D();
    groupPolar.add(circle);
    groupPolar.add(plane)
    groupPolar.rotation.z = THREE.Math.degToRad(item[7]);


    // earth.add(groupPolar);
    return groupPolar;

}

function makeTextSprite(message, parameters) {
    if (parameters === undefined) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface") ?
        parameters["fontface"] : "Arial";

    var fontsize = parameters.hasOwnProperty("fontsize") ?
        parameters["fontsize"] : 18;

    var borderThickness = parameters.hasOwnProperty("borderThickness") ?
        parameters["borderThickness"] : 4;

    var borderColor = parameters.hasOwnProperty("borderColor") ?
        parameters["borderColor"] : {
            r: 0,
            g: 0,
            b: 0,
            a: 1.0
        };

    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
        parameters["backgroundColor"] : {
            r: 255,
            g: 255,
            b: 255,
            a: 1.0
        };


    var canvas1 = document.createElement("canvas");
    canvas1.setAttribute("width", "256px");
    canvas1.setAttribute('height', "32px");
    var ctx = canvas1.getContext("2d");
    ctx.fillStyle = "#c0fcfc";
    // ctx.font = "Bold 24px Arial";

    ctx.font = "Bold " + fontsize + "px " + fontface;
    ctx.fillText(message, 8, 8 + fontsize, 200);
    var texture = new THREE.Texture(canvas1);
    texture.needsUpdate = true;
    //使用plane显示文字
    var material = new THREE.SpriteMaterial({
        map: texture,

        polygonOffsetFactor: -4
    });
    var label = new THREE.Sprite(material);
    label.scale.set(45, 10, 14);

    return label;
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function addSatelliteClick(group) {
    group.children.forEach(function(m) {

        var satellite = m.getObjectByName("satellite");
        // console.log(satellite);
        satellite.children.forEach(function(pl) {
            // console.log(pl)
            pl.on("click", function(target) {
                if (target.lat) {
                    rotateToLatLngNormal(target.lat, target.lon);
                }
                var targetName;
                //点击事件的获取因为有的合并了有的没有用了case来处理
                switch (target.name) {
                    case "METEOSAT_9":
                    case "METEOSAT_10":
                        targetName = "METEOSAT_9_10";
                        break;
                    case "GOES_13":
                    case "GOES_15":
                        targetName = "GOES_13_15";
                        break;
                    case "Himawari_8":

                    case "FY_2E":

                    case "FY_2F":

                    case "FY_2G":

                    case "FY_4A":

                    case "EOS_TERRA":

                    case "EOS_AQUA":
                    case "Suomi_NPP":
                    case "JASON_2":
                    case "FY_3A":

                    case "FY_3B":

                    case "FY_3C":

                    case "FY_3D":

                    case "HY_2A":


                    case "gaofenweixing":


                    case "huanjingweixing":
                        targetName = target.name;
                        break;


                    case "METOP_A":
                    case "METOP_B":
                        targetName = "METOP_A_B";
                        break;


                    case "NOAA_15":
                    case "NOAA_18":
                    case "NOAA_19":
                        targetName = "NOAA_15_18_19";
                        break;


                        break;
                    case "DMSP_16":
                    case "DMSP_17":
                    case "DMSP_18":
                    case "DMSP_19":
                        targetName = "DMSP_16_17_18_19";
                        break;
                }

                $(".level3 [type=" + targetName + "]").attr('trigger', true).click()
            })
            pl.on("hover", function(m) {
                // console.log(m.id);

                document.body.style.cssText = "cursor: pointer";
            }, function(m) {
                document.body.style.cssText = "cursor: default";
            })
        })
    })
}

function removeSatelliteClick(group) {
    group.children.forEach(function(m) {
        var satellite = m.getObjectByName("satellite");
        satellite.children.forEach(function(pl) {
            pl.off();

        })
    })
}

//丝绸之路的球的图·
function getSilkRoadGlobe(type, imgPath, height, opacity) {
    var hgh = height || 1;
    var opc = opacity || 0.4;
    var geo = new THREE.SphereGeometry(radius + hgh, 50, 50);

    var mat = new THREE.MeshBasicMaterial({
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: opc,
        depthWrite: false,
        map: new THREE.TextureLoader().load(imgPath),
    });
    var globe = new THREE.Mesh(geo, mat);
    globe.name = type;
    return globe;
}

//单纯的球面贴图
function getGlobe(type, imgPath, height, opacity, mode) {
    if (mode == 2) {
        var otherCommonPlane = new THREE.PlaneGeometry(earthPlaneWidth / 2, earthPlaneHeight, earthPlaneF.x / 2, earthPlaneF.y);
        var P_countryBoundingTexture = mapLoader.load(imgPath)
        P_countryBoundingTexture.wrapS = P_countryBoundingTexture.wrapT = THREE.RepeatWrapping;
        P_countryBoundingTexture.matrixAutoUpdate = false;
        var P_countryBoundingMaterial = new THREE.MeshBasicMaterial({
            map: P_countryBoundingTexture,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            opacity: opacity

        });

        P_countryBoundingMaterial.map.matrix
            .identity()
            .translate(0, 0)
            .rotate(0)
            .scale(1, 1)
            .translate(0, 0)
            .translate(0.3, 0);
        var P_countryBoundingMesh = new THREE.Mesh(otherCommonPlane.clone(), P_countryBoundingMaterial);
        P_countryBoundingMesh.position.set(0, 0, 2);
        P_countryBoundingMesh.name = type;
        return P_countryBoundingMesh;


    } else {
        var hgh = height || 1;
        var opc = opacity || 0.4;
        console.log(opc)
        var geo = new THREE.SphereGeometry(radius + hgh, 50, 50);

        var mat = new THREE.MeshLambertMaterial({
            transparent: true,

            blending: THREE.AdditiveBlending,
            opacity: opc,
            depthWrite: false,
            map: new THREE.TextureLoader().load(imgPath),
            depthTest: true,
            polygonOffset: true,
            polygonOffsetFactor: -4,

        });
        var globe = new THREE.Mesh(geo, mat);
        globe.name = type;
        return globe;
    }
}


/**
 * 播放
 * @param {*播放的速度} speed   可正向反向；
 */
function play(speed) {
    State.play = true;
    playSpeed = speed * 0.1;
}

var cspeed = 0;

/**
 * 停止播放
 */
function pause() {
    var lastSpeed = playSpeed;
    if (isInHistory) {
        playSpeed = 0;
        cspeed = 0;
        setTimeout(function() {
            playSpeed = -lastSpeed;
            cspeed = -lastSpeed;
        }, 1500)

    } else {
        State.play = false;
        playSpeed = 0;
        cspeed = 0;
    }

    //$(".stationNumber").hide()
}

function pauseForClike() {
    State.play = false;
    playSpeed = 0;
    cspeed = 0;
}

$(".stop .pre ").click(function(e) {
    // console.log(this.className)
    cspeed--;
    if (cspeed == 0) {
        pause();
        return;
    }
    if (State.types.length != 0) {
        //if (playSpeed != 0) {
        if (isInSilkRoad || isInGlobalMonitor) {
            $(".stationNumber").hide();
        } else {
            $(".stationNumber").show();
        }
    }
    play(cspeed);
    e.preventDefault()
})
$(".stop .play").click(function(e) {
    // console.log(cspeed)
    // console.log(this.className)
    cspeed++;
    if (cspeed == 0) {
        pause();
        return;
    }
    if (State.types.length) {

        //if (playSpeed != 0) {
        if (isInSilkRoad || isInGlobalMonitor) {
            $(".stationNumber").hide();
        } else {
            $(".stationNumber").show();
        }
    }
    play(cspeed);

    e.preventDefault()
})
$(".stop .sto").click(function(e) {
    // console.log(this.className)
    cspeed = 0;
    e.preventDefault();
    // isInHistory = false;
    // pause();
    pauseForClike();
})


function removeSimpleHover(obj) {

    obj.children.forEach(function(child) {
        // console.log(child.id)
        child.off("hover");
    })
}

function addSimpleHover(obj) {
    obj.children.forEach(function(child) {
        if (!child.lat) {
            return;
        }
        child.on('hover', function(m) {
            //   console.log(e)
            // console.log("hover")
            if (m.disableEvent) {
                return;
            }
            document.body.style.cssText = "cursor: pointer";
            m.scale.set(1.5, 1.5, 1.5);
            var html = '';
            if (m instanceof THREE.Mesh && m.name != undefined) {
                // console.log('hover in' + m.name)
                nameBox.toggleClass("show");
                var lon = m.lon;
                var lat = m.lat;
                if (lon == null || lon == "") {
                    lon = "";
                } else {
                    lon = parseFloat(lon).toFixed(2);
                }
                if (lat == null || lat == "") {
                    lat = "";
                } else {
                    lat = parseFloat(lat).toFixed(2);
                }
                if (m.name != undefined && m.name.trim() != '') {
                    html += ("<span>站名: " + m.name + "</span>");
                }
                if (m.code != undefined && m.code.trim() != '') {
                    // console.log(m.code)
                    html += ("<span>站号: " + m.code + "</span>");
                }
                html += ("<span>经度: " + lon + "</span>" + "<span>纬度: " + lat + "</span>");
                nameBox.html(html)
            }
            return;
        }, function(m) {
            if (m.disableEvent) {
                return;
            }
            document.body.style.cursor = "default";
            m.scale.set(1, 1, 1);
            if (m instanceof THREE.Mesh && m.name != undefined) {
                // console.log('hoverout' + m.name)
                nameBox.toggleClass("show");
            }
        })
    })
}

/**
 * 简介
 * @param {*} obj
 */

function addIntroduceHover(obj) {

    var nameBox = $('#showName');
    obj.children.forEach(function(child) {
        if (!child.description) {
            return;
        }
        child.on('hover', function(m) {
            // console.log(m)
            if (m.disableEvent) {
                return;


            }
            document.body.style.cssText = "cursor: pointer";
            nameBox.empty();
            if (m instanceof THREE.Mesh && m.name != undefined) {
                // console.log('hover in' + m.name)
                // nameBox.
                m.scale.set(1.5, 1.5, 1.5);
                nameBox.addClass("showIntroduce");

                var html =

                    "<h3>" + m.name + "简介</h3>" +

                    "<article>" + m.description + "</article>";
                nameBox.html(html)
            }

        }, function(m) {
            if (m.disableEvent) {
                return;
            }
            // document.body.style.cursor = "default";
            m.scale.set(1, 1, 1);
            nameBox.empty()
            if (m instanceof THREE.Mesh && m.name != undefined) {
                nameBox.removeClass("showIntroduce")
            }
        });
        child.on('click', function(m) {
            $('#introduce').removeClass('show');
            window.clearInterval(lunbo.sss);
            var fixedHeight = $(".contentBox").height();
            lunbo.top = fixedHeight - 20;
            lunbo.index = 0;
            $('#content').css('top', '0px');
            $('#introduce').css('display', 'block');
            $('#introduce').addClass('show');
            $('#content').html(m.description);
            $('#titles').html(m.name)
            var height = $('#content').height();
            if (height > fixedHeight) {
                lunbo.lines = Math.ceil(height / 20);
                //lunbo.top=236;
                lunbo.chazhi = -height;
                $('#content').css('top', lunbo.top + 'px');
                initgundong();
            }
        })
    })
}


// function add

// home();

$("#home").on('click', function(e) {
    home();
    e.preventDefault();
})

//返回初始效果
function home() {
    /* targetEarthRotationX = THREE.Math.degToRad(160);;
     targetEarthRotationY = 0.2; */
    // rotateToLatLng(16.83,112.33)

    rotateToLatLngNormal(16.83, 112.33, 0)
        // group.rotation.z = ;
    scaleN = 1.2;
}

function SmallGlobe(color1) {
    var cir = new THREE.CircleGeometry(2.5, 20);
    var cirMat = new THREE.MeshBasicMaterial({

        transparent: true,
        opacity: 0,
        // depthTest:false,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4
    });
    var ballPlane = new THREE.Mesh(cir, cirMat);
    var cir1 = new THREE.CircleGeometry(0.5, 20);
    var cirMat1 = new THREE.MeshBasicMaterial({
        color: color1,
        // transparent: true,
        opacity: 1,
        // depthTest:false,
        depthWrite: true,
        polygonOffset: true,
        polygonOffsetFactor: -4
    });

    var ballPlane1 = new THREE.Mesh(cir1, cirMat1);

    // var geo = new THREE.SphereGeometry(0.5, 8, 8);

    // var mat = new THREE.MeshLambertMaterial({
    //     transparent: true,
    //     color: color1,
    //     blending: THREE.AdditiveBlending,
    //     opacity: 1
    // });
    // var globe = new THREE.Mesh(geo, mat);
    // // globe.name = type;
    ballPlane.add(ballPlane1);
    return ballPlane;
}

$(".goToBegin").on("click", function(e) {
    // console.log("点我到最前")
    // console.log(timeline.dial.rotation.y)
    gotoBegin();
    // console.log(timeline.dial.rotation.y)
    e.preventDefault()
});

function gotoBegin() {
    pause();
    targetRotationX = -minRot;
    // var position = 1.678; //设置到左边的最大角度
    timeline.dial.rotation.y = minRot;
}

$(".goToEnd").on("click", function(e) {
    // console.log("到最后")
    pause();
    // console.log(timeline.dial.rotation.y)
    targetRotationX = -maxRot;
    // var position = 6.30; //设置到右边的最大距离
    timeline.dial.rotation.y = maxRot;
    // console.log(timeline.dial.rotation.y)
    e.preventDefault()
})

function HotSport(color) {
    return HotSport3(color);
}

function HotSport3(color1) {
    // hotspot = new THREE.Object3D();
    var type = "B";
    var geo = new THREE.PlaneGeometry(30, 30, 1, 1);
    var mat = new THREE.MeshBasicMaterial({
        color: color1,
        transparent: true,
        opacity: 0,

        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4
    });
    var hotspot = new THREE.Mesh(geo, mat);


    var bottomGeo = new THREE.PlaneGeometry(10, 10);
    var bottomMat = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        color: color1,
        depthWrite: false,
        map: new THREE.TextureLoader().load("assets/images/hotevent/hotsport" + type + "1.png"),
        transparent: true,
        opacity: 1
    });
    hotspot.bottom = new THREE.Mesh(bottomGeo, bottomMat);
    hotspot.add(hotspot.bottom);
    hotspot.bottom.position.z = 3;


    var geo2 = new THREE.PlaneGeometry(24, 24);
    var mat2 = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        color: color1,
        depthWrite: false,
        map: new THREE.TextureLoader().load("assets/images/hotevent/hotsport" + type + "2.png"),
        transparent: true,
        opacity: 1
    });
    hotspot.mesh2 = new THREE.Mesh(geo2, mat2);
    hotspot.add(hotspot.mesh2);
    hotspot.mesh2.position.z = 9;


    var geo3 = new THREE.PlaneGeometry(40, 40);
    var mat3 = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        color: color1,
        depthWrite: false,
        map: new THREE.TextureLoader().load("assets/images/hotevent/hotsport" + type + "3.png"),
        transparent: true,
        opacity: 1
    });
    hotspot.mesh3 = new THREE.Mesh(geo3, mat3);
    hotspot.add(hotspot.mesh3);
    hotspot.mesh3.position.z = 14;

    var geo4 = new THREE.PlaneGeometry(42, 42);
    var mat4 = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        color: color1,
        depthWrite: false,
        map: new THREE.TextureLoader().load("assets/images/hotevent/hotsport" + type + "4.png"),
        transparent: true,
        opacity: 1
    });
    hotspot.mesh4 = new THREE.Mesh(geo4, mat4);
    hotspot.add(hotspot.mesh4);
    hotspot.mesh4.position.z = 18;


    var mat = new THREE.LineBasicMaterial({
        blending: THREE.AdditiveBlending,
        linewidth: 2,
        color: color1,
        transparent: true,
        opacity: .9
    });
    var plus = new THREE.Shape();
    plus.moveTo(0, 3);
    plus.lineTo(0, -3);
    plus.moveTo(0, 0);
    plus.lineTo(3, 0);
    plus.lineTo(-3, 0);
    var geo = new THREE.ShapeGeometry(plus);
    hotspot.plus = new THREE.Line(geo, mat);
    hotspot.add(hotspot.plus);
    hotspot.plus.position.z = 12;
    hotspot.plus.position.x = 0;


    hotspot.scale.set(0.5, 0.5, 0.5);

    return hotspot;
}

function HotSport1(color1) {
    // hotspot = new THREE.Object3D();
    var type = "A";
    var geo = new THREE.PlaneGeometry(30, 30, 1, 1);
    var mat = new THREE.MeshBasicMaterial({
        color: color1,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4
    });
    var hotspot = new THREE.Mesh(geo, mat);


    var bottomGeo = new THREE.PlaneGeometry(30, 30);
    var bottomMat = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        color: color1,
        map: new THREE.TextureLoader().load("assets/images/hotevent/hotsport" + type + "1.png"),
        transparent: true,
        opacity: 1
    });
    hotspot.bottom = new THREE.Mesh(bottomGeo, bottomMat);
    hotspot.add(hotspot.bottom);
    hotspot.bottom.position.z = 3;


    var geo2 = new THREE.PlaneGeometry(20, 20);
    var mat2 = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        color: color1,
        map: new THREE.TextureLoader().load("assets/images/hotevent/hotsport" + type + "2.png"),
        transparent: true,
        opacity: 1
    });
    hotspot.mesh2 = new THREE.Mesh(geo2, mat2);
    hotspot.add(hotspot.mesh2);
    hotspot.mesh2.position.z = 9;


    var geo3 = new THREE.PlaneGeometry(50, 50);
    var mat3 = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        color: color1,
        map: new THREE.TextureLoader().load("assets/images/hotevent/hotsport" + type + "3.png"),
        transparent: true,
        opacity: 1
    });
    hotspot.mesh3 = new THREE.Mesh(geo3, mat3);
    hotspot.add(hotspot.mesh3);
    hotspot.mesh3.position.z = 14;


    var mat = new THREE.LineBasicMaterial({
        blending: THREE.AdditiveBlending,
        linewidth: 2,
        color: color1,
        transparent: true,
        opacity: .9
    });
    var plus = new THREE.Shape();
    plus.moveTo(0, 3);
    plus.lineTo(0, -3);
    plus.moveTo(0, 0);
    plus.lineTo(3, 0);
    plus.lineTo(-3, 0);
    var geo = new THREE.ShapeGeometry(plus);
    hotspot.plus = new THREE.Line(geo, mat);
    hotspot.add(hotspot.plus);
    hotspot.plus.position.z = 12;
    hotspot.plus.position.x = 0;


    hotspot.scale.set(0.5, 0.5, 0.5);

    return hotspot;
}

function HotSport2(color1) {
    // hotspot = new THREE.Object3D();

    var geo = new THREE.PlaneGeometry(30, 30, 1, 1);
    var mat = new THREE.MeshBasicMaterial({
        color: color1,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4
    });
    var hotspot = new THREE.Mesh(geo, mat);

    var mat = new THREE.MeshBasicMaterial({
        blending: THREE.AdditiveBlending,
        color: color1,
        transparent: true,
        opacity: 1
    });

    var hexShape = new THREE.Shape();
    hexShape.moveTo(0, 10);
    hexShape.lineTo(9, 5);
    hexShape.lineTo(9, -5);
    hexShape.lineTo(0, -10);
    hexShape.lineTo(0, -6);
    hexShape.lineTo(5, -3);
    hexShape.lineTo(5, 3);
    hexShape.lineTo(0, 6);
    //hexShape.lineTo(0,10);

    var geo = new THREE.ShapeGeometry(hexShape);


    hotspot.hexSeg1 = new THREE.Mesh(geo, mat);
    hotspot.hexSeg2 = new THREE.Mesh(geo, mat);

    hotspot.add(hotspot.hexSeg1);
    hotspot.add(hotspot.hexSeg2);

    hotspot.hexSeg1.rotation.z = (Math.PI / 180) * -60;
    hotspot.hexSeg2.rotation.z = (Math.PI / 180) * 120;
    hotspot.hexSeg2.position.z = 3;
    hotspot.hexSeg1.position.z = 1;


    var hexShape3 = new THREE.Shape();
    hexShape3.moveTo(0, 10);
    hexShape3.lineTo(9, 5);
    hexShape3.lineTo(9, -5);
    hexShape3.lineTo(0, -10);
    hexShape3.lineTo(-9, -5);
    hexShape3.lineTo(-9, 5);
    hexShape3.lineTo(0, 10);
    //hexShape3.lineTo(9,5);

    var geo = new THREE.ShapeGeometry(hexShape3);
    var mat = new THREE.LineBasicMaterial({
        blending: THREE.AdditiveBlending,
        linewidth: 2,
        color: color1,
        transparent: true,
        opacity: .8
    });
    hotspot.hexSeg3 = new THREE.Line(geo, mat);
    hotspot.add(hotspot.hexSeg3);
    hotspot.hexSeg3.position.z = 6;
    hotspot.hexSeg3.position.x = .25;

    hotspot.hexSeg3.scale.set(1.2, 1.2, 1.2);


    var mat = new THREE.MeshBasicMaterial({
        blending: THREE.AdditiveBlending,
        color: color1,
        transparent: true,
        opacity: .8,
        side: THREE.DoubleSide
    });
    var hexShape4 = new THREE.Shape();
    hexShape4.moveTo(0, 10);
    hexShape4.lineTo(9, 5);
    hexShape4.lineTo(9, -5);
    hexShape4.lineTo(0, -10);
    hexShape4.lineTo(-9, -5);
    hexShape4.lineTo(-8, -4.5);
    hexShape4.lineTo(0, -9);
    hexShape4.lineTo(8, -4.5);
    hexShape4.lineTo(8, 4.5);
    hexShape4.lineTo(0, 9);
    //hexShape4.lineTo(0,10);

    var geo = new THREE.ShapeGeometry(hexShape4);

    hotspot.hexSeg4 = new THREE.Mesh(geo, mat);
    hotspot.hexSeg4.scale.set(1.5, 1.5, 1.5)

    hotspot.add(hotspot.hexSeg4);

    hotspot.hexSeg4.position.z = 9;
    hotspot.hexSeg4.position.x = .4;


    // consider rebuilding this as 2 lines later
    // mght be 1 efficient than a shape??

    var mat = new THREE.LineBasicMaterial({
        blending: THREE.AdditiveBlending,
        linewidth: 2,
        color: color1,
        transparent: true,
        opacity: .9
    });
    var plus = new THREE.Shape();
    plus.moveTo(0, 3);
    plus.lineTo(0, -3);
    plus.moveTo(0, 0);
    plus.lineTo(3, 0);
    plus.lineTo(-3, 0);
    var geo = new THREE.ShapeGeometry(plus);
    hotspot.plus = new THREE.Line(geo, mat);
    hotspot.add(hotspot.plus);
    hotspot.plus.position.z = 12;
    hotspot.plus.position.x = 0;

    // merge to single geo later!!!!  几条线段
    var mat = new THREE.LineBasicMaterial({
        blending: THREE.AdditiveBlending,
        linewidth: 3,
        color: color1,
        transparent: true,
        opacity: .5
    });
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3(0, 0, 0));
    geo.vertices.push(new THREE.Vector3(5, 0, 0));
    hotspot.line = new THREE.Line(geo, mat);
    hotspot.add(hotspot.line);
    hotspot.line.position.z = 9;
    hotspot.line.position.x = 15;

    hotspot.line2 = new THREE.Line(geo, mat);
    hotspot.add(hotspot.line2);
    hotspot.line2.position.z = 9;
    hotspot.line2.position.x = -15;
    hotspot.line2.rotation.z = (Math.PI / 180) * -180;

    hotspot.line3 = new THREE.Line(geo, mat);
    hotspot.add(hotspot.line3);
    hotspot.line3.position.z = 9;
    hotspot.line3.position.x = -10;
    hotspot.line3.position.y = 15;
    hotspot.line3.rotation.z = (Math.PI / 180) * -60;

    hotspot.line4 = new THREE.Line(geo, mat);
    hotspot.add(hotspot.line4);
    hotspot.line4.position.z = 9;
    hotspot.line4.position.x = -10;
    hotspot.line4.position.y = -15;
    hotspot.line4.rotation.z = (Math.PI / 180) * 240;


    /* 	// add the big line
     var geo = new THREE.Geometry();
     geo.vertices.push(new THREE.Vector3(0, 0, 0));
     geo.vertices.push(new THREE.Vector3(0, 0, 600));
     var mat = new THREE.LineBasicMaterial({
     blending: THREE.AdditiveBlending,
     color: color1,
     transparent: true,
     opacity: .5
     });
     var line = new THREE.Line(geo, mat);
     hotspot.add(line); */

    /* 	var geo = new THREE.PlaneGeometry(30,30,1,1);
     var mat = new THREE.MeshBasicMaterial( { color:0xff8340 , transparent:true, opacity:1} );
     hotspot.detector = new THREE.Mesh(geo, mat);
     hotspot.detector.position.z=20;
     hotspot.add(hotspot.detector); */

    hotspot.scale.set(0.5, 0.5, 0.5);

    return hotspot;
}

$('#closeHotEvent').on("click", function(e) {
    isInHotEvent = false;
    $('#closeHotEvent').animate({
        bottom: "-30rem"
    }, 2000);
    // console.log(timeLinePosition)
    // timeline.position=timeLinePosition;
    timeline.position.set(timeLinePosition.x, timeLinePosition.y, timeLinePosition.z)


    var tween2 = new TWEEN.Tween(earth.position) // Create a new tween that modifies 'coords'.
        .to({
            x: 0,
            y: 0,
            z: 0
        }, 2000) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(function() { // Called after tween.js updates 'coords'.
            // Move 'box' to the position described by 'coords' with a CSS translation.
            // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
        })
        .start(); // Start the tween immediately.

    var tween5 = new TWEEN.Tween(shanderball.position) // Create a new tween that modifies 'coords'.
        .to({
            x: 0,
            y: 0,
            z: 0
        }, 2000) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(function() { // Called after tween.js updates 'coords'.
            // Move 'box' to the position described by 'coords' with a CSS translation.
            // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
        })
        .start(); // Start the tween immediately.

    var tween3 = new TWEEN.Tween({
            scale: scaleN
        }) // Create a new tween that modifies 'coords'.
        .to({
            scale: 1
        }, 2000) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(function() { // Called after tween.js updates 'coords'.
            scaleN = this.scale;
            // group.scale.set(scaleN, scaleN, scaleN)
        })
        .start(); // Start the tween immediately.

    resetHotEvent();
    $(".event_list_container").eq(0).hide().empty();
    $(".container").show();
    $("#tucengBox").show();
    $("#home").show();
    $(".hotEvent").eq(0).animate({
        bottom: "-30rem"
    }, 2000, function() {
        $("#hotEventSlider").empty();
        $(".eventDetail").eq(0).empty();
    })
})


function resetHotEvent() {
    if (State.hotEventTypes.length == 0) {
        return
    };
    State.hotEventTypes.forEach(function(type) {
        var objs = earth.getObjectByName(type);

        objs.children.forEach(function(obj, index) {
            if (index < 2) {
                obj.getObjectByName("hotspot").scale.set(0.6, 0.6, 0.6);
                return;

            }
            obj.getObjectByName("hotspot").scale.set(0.3, 0.3, 0.3);
        })
    })

}

var hotSpot1 = HotSport(0xff8340);
var hotSpot2 = HotSport(0x4cffc2)

function HotEvent(type, data, year, mode) {

    if (type == "FRHotEvent") {
        var color1 = 0x4cffc2;
        var color2 = "#71ff40";
        var color3 = 0x71ff40;
        var hotspot = hotSpot2.clone();
    } else {
        var hotspot = hotSpot1.clone();
        var color1 = 0xff8340;
        var color2 = "#ff8340";
        var color3 = 0xff8340;
    }
    hotspot.name = "hotspot";
    var line = new THREE.Object3D();


    var lineMatOrange = new THREE.MeshBasicMaterial({
        color: color1,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
    });
    var hexMat = new THREE.MeshBasicMaterial({
        color: color1,
        transparent: true,
        opacity: 0.5
    });
    //画圈
    hexGeo = new THREE.CircleGeometry(2, 6, 5);
    hexGeo.vertices.shift();
    line.hex = new THREE.Line(hexGeo, hexMat);
    line.hex.z = 40;
    line.add(line.hex);
    line.name = data.name;


    // add line 画线
    h = Math.random() * 60;
    geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3(0, 0, 0));
    geo.vertices.push(new THREE.Vector3(0, 0, h));
    line.lineBlue = new THREE.LineSegments(geo, lineMatOrange);
    line.add(line.lineBlue);

    // add label 贴标签
    /* 	labelGeo = new THREE.PlaneGeometry(32,8);
     labelMat = new THREE.MeshBasicMaterial({side:THREE.DoubleSide, blending: THREE.AdditiveBlending, map: new THREE.TextureLoader().load("assets/images/city_labels/"+data.EName+".png"), transparent:true , opacity:1});
     line.label = new THREE.Mesh(labelGeo,labelMat); */

    if (data.index <= 2) {
        // add the big line
        var geo = new THREE.Geometry();
        geo.vertices.push(new THREE.Vector3(0, 0, 0));
        geo.vertices.push(new THREE.Vector3(0, 0, 100));
        var mat = new THREE.LineBasicMaterial({
            blending: THREE.AdditiveBlending,
            color: color3,
            transparent: true,
            opacity: .5
        });
        var line2 = new THREE.Line(geo, mat);
        hotspot.add(line2);

        line.label = createSpriteText(data.date, data.title, color2);

        // line.label.rotation.z = THREE.Math.degToRad(20);
        line.label.h = h;
        line.label.name = "label";
        line.label.year = year;
        line.year = data.year;
        line.index = data.index;
        line.type = type;


        line.add(line.label);
        console.log(mode)
        setPosition23D(line, data.lat, data.lon, 15, mode);

        line.lat = data.lat;
        line.lon = data.lon;
        line.description = data.description;
        line.name = data.name;
        line.index = data.index;
        line.hotspot = hotspot;
        line.title = data.title;
        // line.hotSpotIn = false;
        line.disableEvent = false;

        line.label.scale.set(60, 12, 12);
        line.label.position.z = h;
        line.label.position.x = 3;
        line.label.position.y = 16;
        line.hotspot.scale.set(0.6, 0.6, 0.6);

        line.add(line.hotspot)


    } else {
        line.label = createSpriteText(data.date, data.title);
        line.label.position.z = h;
        line.label.position.x = 20;
        line.label.position.y = 10;
        line.label.name = "label";
        line.label.h = h;
        line.label.scale.set(40, 8, 8);
        line.label.year = year;
        line.year = data.year;
        line.index = data.index;
        line.type = type;


        line.add(line.label);

        setPosition23D(line, data.lat, data.lon, 15, mode);
        line.lat = data.lat;
        line.lon = data.lon;
        line.description = data.description;
        line.name = data.name;
        line.index = data.index;
        line.hotspot = hotspot;
        line.title = data.title;
        // line.hotSpotIn = false;
        line.disableEvent = false;


        line.hotspot.scale.set(0.3, 0.3, 0.3);

        line.add(line.hotspot)
    }


    return line;

}


/**
 * hotEvent的点击事件和hover事件
 */
function addHotEvent2(group) {
    group.children.forEach(function(child) {
        var hotspot = child.getObjectByName("hotspot");
        var label = child.getObjectByName("label");
        var timer = null;
        hotspot.on("click", function(m) {
            // console.log(line.disableEvent)
            if (child.disableEvent) {
                return;
            };
            // scaleN = 0.6;
            $(".container").hide();
            $("#home").hide();
            $("#tucengBox").hide();
            timeline.position.set(0, 0, 2000);
            isInHotEvent = true;
            showSlider(child.year, child.index, child.type, group.datas);
        });


        label.on("click", function(m) {
            // console.log(line.disableEvent)
            if (child.disableEvent) {
                return;
            };
            // scaleN = 0.6;
            $(".container").hide();
            $("#home").hide();
            $("#tucengBox").hide();
            isInHotEvent = true;
            timeline.position.set(0, 0, 2000);
            showSlider(child.year, child.index, child.type, group.datas);
        });
        label.on("hover", function(m) {
            console.log("hover in")
            if (child.disableEvent) {
                return;
            }
            document.body.style.cssText = "cursor: pointer";
            if (child.index > 2) {
                m.scale.set(48, 10, 10);
            } else {
                m.scale.set(68, 14, 14);
            }
            rotating(hotspot)


        }, function(m) {
            if (child.disableEvent) {
                return;
            }
            document.body.style.cssText = "cursor: pointer";
            if (child.index > 2) {

                m.scale.set(40, 8, 8);
            } else {
                m.scale.set(60, 12, 12);
            }
            rotateControl = false;

        })


        hotspot.on("hover", function(m) {
            if (child.disableEvent) {
                return;
            }
            document.body.style.cssText = "cursor: pointer";
            if (child.index > 2) {
                label.scale.set(48, 10, 10);
            } else {
                label.scale.set(68, 14, 14);
            }
            rotating(m)


        }, function(m) {
            if (child.disableEvent) {
                return;
            }
            document.body.style.cssText = "cursor: pointer";
            if (child.index > 2) {

                label.scale.set(40, 8, 8);
            } else {
                label.scale.set(60, 12, 12);
            }
            rotateControl = false;

        })


    })
}

function rotating(obj) {
    rotateControl = true;
    setTimeout(function() {
        //do something
        // console.log(obj.rotation)
        obj.rotation.z += 0.05;
        if (rotateControl) {
            setTimeout(arguments.callee, 16);
        }
    }, 16);
}


/**
 * 删除hotevent上的事件
 * @param {*} group
 */
function removerHotEvent2(group) {
    group.children.forEach(function(child) {
        var hotspot = child.getObjectByName("hotspot");
        var label = child.getObjectByName("label");
        hotspot.off();
        label.off()
    })
}


function createSpriteText(date, title, color) {
    //先用画布将文字画出

    if (!color) {
        color = "#c0fcfc";
    }
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", "512px");
    canvas.setAttribute('height', "64px")

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.font = "800 20px Arial";
    ctx.lineWidth = 4;
    ctx.fillText(date, 8, 20, 1600);
    ctx.font = "800 24px Arial";
    ctx.fillText(title, 8, 50, 1600);


    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;


    //使用Sprite显示文字
    var material = new THREE.SpriteMaterial({
        map: texture,
        side: THREE.DoubleSide
    });
    var textObj = new THREE.Sprite(material);

    return textObj;
}


function updateHotEvent(types, year, container, mode) {

    var now = (new Date()).getFullYear();
    if (year < 1950 || year > now) {
        return;
    }


    var cIndex = year - 1950;
    // console.log(cIndex)
    types.forEach(function(type) {
        var childHE = container.getObjectByName(type);

        if (childHE != undefined) {
            childHE.children.forEach(function(child) {
                child.disableEvent = true;
            })
            removerHotEvent2(childHE);
            container.remove(childHE);
        }

        switch (type) {
            case "CNHotEvent":
                var cnh = CNHotEventArr;
                if (mode == 2) {
                    cnh = D2_CNHotEventArr;
                }
                cnh[cIndex].children.forEach(function(child) {
                    child.disableEvent = false;
                });
                addHotEvent2(cnh[cIndex]);
                container.add(cnh[cIndex]);
                if (cnh[cIndex].children != undefined && cnh[cIndex].children.length > 0) {
                    // rotateToLatLngNormal(CNHotEventArr[cIndex].children[0].lat - 10, CNHotEventArr[cIndex].children[0].lon + 15, 0, THREE.Math.degToRad(23.4));
                    // rotateToLatLngNormal(16.83, 112.33, 0, THREE.Math.degToRad(23.43))
                    showChina();
                }
                // console.log("why no rotate")
                break;

            case "FRHotEvent":
                var frh = FRHotEventArr;
                if (mode == 2) {
                    frh = D2_FRHotEventArr;
                }
                frh[cIndex].children.forEach(function(child) {
                    child.disableEvent = false;
                });
                addHotEvent2(frh[cIndex]);
                container.add(frh[cIndex]);
                if (frh[cIndex].children != undefined && frh[cIndex].children.length > 0) {
                    rotateToLatLngNormal(frh[cIndex].children[0].lat, frh[cIndex].children[0].lon + 15, 0, THREE.Math.degToRad(23.4));
                }
                break;
        }
    })
}


function silkRoad(type, datas, size, mode) {
    var siz = size || 2
    var objBox = new THREE.Object3D();
    objBox.name = type;
    datas.forEach(function(data) {
        objBox.add(createSinglePoint(type, data, size, mode));
    });
    // var area = getGlobe()
    return objBox;
}


/**
 * 一带一路
 *
 * @param {*} type
 * @param {*} data
 * @param {*} size
 */
function createSinglePoint(type, data, size, mode) {

    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", "500px")

    var canvas1 = document.createElement("canvas");
    canvas1.setAttribute("width", "256px");
    canvas1.setAttribute('height', "32px")
    var ctx = canvas1.getContext("2d");
    ctx.fillStyle = "#c0fcfc";
    ctx.font = "24px Arial";
    ctx.fillText(data.name, 8, 20, 200);
    var texture = new THREE.Texture(canvas1);
    texture.needsUpdate = true;
    //使用plane显示文字
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    // var textObj = new THREE.Sprite(material);
    var geo = new THREE.PlaneGeometry(24, 3, 1, 1);
    var label = new THREE.Mesh(geo, material);
    label.rotation.z = THREE.Math.degToRad(20);
    label.position.z = 0;
    label.position.x = 14;
    label.position.y = 5;
    label.h = h;
    // lineBlue.add(label)

    // lineOrange.add(label);


    // var plane = SmallGlobe();

    if (data.important == undefined) {
        var plane = getPlane("silkroad1", 3); //2为图片大
        label.visible = false;

    } else {
        var plane = getPlane("silkroadBig", 5); //2为图片大小

        // plane.material.color = new THREE.Color(0xFF0000);

    }
    plane.add(label);


    plane.z = 100;
    plane.name = data.name;
    plane.code = data.code;
    // plane.lat = data.lng;
    // plane.lon = data.lat;
    plane.lat = data.lat;
    plane.lon = data.lon;
    plane.description = data.description;

    plane.disableEvent = false;

    plane.on("hover", function(m) {
            document.body.style.cssText = "cursor: pointer";

            // label.visible = true;
        }, function(m) {
            // document.body.style.cursor = "default";
            // label.visible = false;
        })
        // addShowLabel(plane)
    var height = radius * 0.03;
    setPosition23D(plane, data.lat, data.lon, height, mode); //对象、经度、纬度、距地面高度

    return plane;
}


function rotateToLatLng2(lat, lng, offsetY) {
    if (!showingDetail) {
        locked = true;
        if (!offsetY) {
            offsetY = 0;
        }

        //记录当前坐标
        var rotX = earth.rotation.x;
        var rotY = earth.rotation.y;
        var rotZ = earth.rotation.z;


        var c = earth.rotation.y; //  crotationY
        var d = -lng * (Math.PI / 180) % (2 * Math.PI); // -lng
        var f = Math.PI / (2 + offsetY) * -1; //  - PI/2;
        earth.rotation.y = c % (2 * Math.PI); // croationY%2PI
        earth.rotation.x = (lat * (Math.PI / 180) % Math.PI) + (Math.PI / 180 * -30); //lat%PI -PI/6;
        earth.rotation.y = d + f; // -lng-PI/2;
        var newRotX = earth.rotation.x;
        var newRotY = earth.rotation.y;
        var newRotZ = earth.rotation.z;
        earth.rotation.x = rotX;
        earth.rotation.y = rotY;
        earth.rotation.z = rotZ;
        TWEEN.removeAll();
        var tween = new TWEEN.Tween(earth.rotation).to({
            x: newRotX,
            y: newRotY,
            z: newRotZ
        }, 500).start();
        tween.easing(TWEEN.Easing.Quadratic.InOut);
        tween.onComplete(function() {
            locked = false;
            targetEarthRotationX = earth.rotation.y;
            targetEarthRotationY = earth.rotation.x
        });


    }

}


$('#swiperScene').click(function(e) {
    // console.log(e.target.id)
    $(e.target)
        .children("div")
        .hide();
    e.stopPropagation();
    startShowAll();
})

$("#swiperScene").hover(function(e) {
    $(e.target)
        .children("div")
        .show();

}, function(e) {
    $(e.target)
        .children("div")
        .hide();
})


$("#slider-range-max").slider({
    range: true,
    min: 0,
    max: 110,
    values: [0, 110],
    slide: function(event, ui) {

        if (State.year != now) {
            // console.log(timeline.dial.rotation.y)
            targetRotationX = -maxRot;
            // var position = 6.30; //设置到右边的最大距离
            timeline.dial.rotation.y = maxRot;


        }
        // console.log(ui.values)
        var end1 = now - ui.values[0];
        var begin1 = now - ui.values[1];
        if (begin1 < 1917) {
            begin1 = 1900;
        }
        State.slider = true;
        timeRelateStation(State.types, begin1, end1);
    }
});


/**
 * iframe 关闭
 */
$("#iframeBox .close").click(function(e) {
    e.preventDefault();
    $(".iframe").eq(0).animate({
        bottom: "-32rem"
    }, 2000);
    $(".stop").show();
    $("#home").show();
    $("#tucengBox").show();
    $("#planeGlobe").show();

    $(".tucengListBox").attr("style", "")

    $(".leftLogo").show();
    $(".rightLogo").show();
    $(".recommendBox").show();
    $(".filterTime").show();
    // $(".tab").show();


    timeline.position.set(timeLinePosition.x, timeLinePosition.y, timeLinePosition.z)


    var tween2 = new TWEEN.Tween(earth.position) // Create a new tween that modifies 'coords'.
        .to({
            x: 0,
            y: 0,
            z: 0
        }, 2000) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(function() { // Called after tween.js updates 'coords'.
            // Move 'box' to the position described by 'coords' with a CSS translation.
            // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
        })
        .start(); // Start the tween immediately.
    var tween4 = new TWEEN.Tween(shanderball.position) // Create a new tween that modifies 'coords'.
        .to({
            x: 0,
            y: 0,
            z: 0
        }, 2000) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(function() { // Called after tween.js updates 'coords'.
            // Move 'box' to the position described by 'coords' with a CSS translation.
            // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
        })
        .start(); // Start the tween immediately.

    var tween3 = new TWEEN.Tween({
            scale: scaleN
        }) // Create a new tween that modifies 'coords'.
        .to({
            scale: 1
        }, 2000) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(function() { // Called after tween.js updates 'coords'.
            scaleN = this.scale;
            // group.scale.set(scaleN, scaleN, scaleN)
        })
        .start(); // Start the tween immediately. 
    var tween4 = new TWEEN.Tween({
            scale: scaleM
        }) // Create a new tween that modifies 'coords'.
        .to({
            scale: 1
        }, 2000) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(function() { // Called after tween.js updates 'coords'.
            scaleM = this.scale;
            // group.scale.set(scaleN, scaleN, scaleN)
        })
        .start(); // Start the tween immediately.
    $("#iframeBox iframe").attr("src", "");
    isInIframe = false;

    if ($(".left li a").parent("li").hasClass("active1")) {
        $(".left li a").parent("li").removeClass("active1");
    }

})


/**
 * 更新每年的所存在的站点的函数   要显示的年份和已经存在的年份来增减球体上的数量,增加只在当前存在的上面有添加，所以可以省略最外层载体，但是保持样子一样还是加上吧
 * @param types
 * @param beginyear1
 * @param endyear1
 */
function timeRelateStation(types, beginyear1, endyear1, container) {
    container = container || stationContainer;
    // console.log(beginyear1 + "hahhha " + endyear1);
    var beginyear = beginyear1;

    var endyear = endyear1;

    types.forEach(function(type) {
        var cbegin = 1900;
        var cend = 1900;
        var arr = [];


        var object = container.getObjectByName(type);
        if (object == undefined) {
            object = new THREE.Object3D();
            object.name = type;
            container.add(object);
        } else {
            clastIndex = object.children.length;

            object.children.forEach(function(m) {
                arr.push(m.name);
            });
            cbegin = Math.min.apply(Math, arr); //算出已经添加的最大和最小年份
            cend = Math.max.apply(Math, arr);
        }


        if (beginyear < cbegin) { //当开始年份小于已经存在的年份的时候，是要添加的  
            var beginIndex = beginyear - 1900;
            var endIndex = cbegin - 1900;
            addTimelineStation(beginIndex, endIndex, object, type); //添加两个开始间的对象

            if (endyear < cbegin) { //删除实际结束年到已经存在年的对象
                removeBegin(endyear + 1, beginyear + 1, object, type);
            } else if (endyear >= cbegin && endyear < cend) {
                removeBegin(endyear + 1, cend + 1, object, type); //伤处
            } else if (endyear >= cend) {
                var endIndex1 = endyear - 1900;
                var cendIndex1 = cend - 1900;
                addTimelineStation(cendIndex1, endIndex1, object, type);
            }
        } else if (beginyear >= cbegin && beginyear <= cend) {
            var lastIndex = beginyear - 1900;
            var clastIndex = cbegin - 1900;
            removeBegin(cbegin, beginyear, object, type);
            if (endyear < cend) {
                removeBegin(endyear + 1, cend + 1, object, type)
            } else if (endyear >= cend) {
                var endIndex1 = endyear - 1900;
                var cendIndex1 = cend - 1900;
                addTimelineStation(cendIndex1, endIndex1, object, type);
            }
        } else if (beginyear > cend) {
            removeAllBegin(cbegin, beginyear, object, type);
            var beginIndex = beginyear - 1900;
            var endIndex = endyear - 1900;
            //    addTimelineStation(beginIndex,endIndex,object,type)
            addTimelineStation(beginIndex, endIndex, object, type)

        }


    })
}


function removeBegin(cbegin, beginyear, object, type) {
    for (var i = cbegin; i < beginyear; i++) {
        // var rm =  object.getObjectByName(""+i);
        var rm = object.getObjectByName("" + i);
        rm.children.forEach(function(m) {
            m.disableEvent = true;
        })
        object.remove(rm);
    }
}

function removeAllBegin(cbegin, beginyear, object, type) {
    object.children.forEach(function(m) {
        m.children.forEach(function(mi) {
            mi.disableEvent = true;
        })
        object.remove(m);
    })
}


/**
 * 获取柱状图的分布
 * @param {*} data
 */
function getBarList(data) {
    // var height = data.value;
    var allObjs = new THREE.Object3D();
    data.forEach(function(item, index) {
        var barColor = 0xFFD994
        var height = Math.random() * 100;
        if (height > 80) {
            barColor = 0xffd994;
        } else if (height > 60) {
            barColor = 0xFFB52E;
        } else if (height > 40) {
            barColor = 0xE79500;
        } else if (height > 20) {
            barColor = 0xB47400;
        }
        var cood = item.geoCoord;
        var geometry = new THREE.BoxGeometry(2, 2, height);
        var material = new THREE.MeshBasicMaterial({
            color: barColor,
            opacity: .5
        });
        var cube = new THREE.Mesh(geometry, material);
        setPosition(cube, cood[1], cood[0], 0);
        allObjs.add(cube);
    })
    return allObjs;
}


/**
 * 切换底图的功能
 */
var earthMapInt = null;
var cMonth = +(new Date().getMonth()) + 1;
var loadedArr = {};
$('.swiperMap li[data-index="' + cMonth + '"]').addClass("chosed");
$("#swiperMap").on("click", "li", function(e, index) {
    if ($(this).hasClass("chosed")) {
        return;
    }
    $(this).siblings().removeClass("chosed");
    $(this).addClass("chosed");
    var index = $(this).attr("data-index");
    var mapName = "earth.png";

    if (index == 100) {
        var curIndex = 0;

        earthMapInt = setInterval(function() {
            if (curIndex < 12) {
                curIndex++;
            } else {
                curIndex = 1;
            }

            mapName = getMapName(curIndex);
            setMapChange(mapName, curIndex);
            // composer.addPass(effectFXAA);
        }, 1000)
    } else {
        clearInterval(earthMapInt);
        earthMapInt = null;
        switch (+index) {
            case 0:
                resetToOrigin(mapName);
                composer.removePass(effectFXAA);
                break;
            default:
                mapName = getMapName(index);
                resetToOrigin(mapName);
                composer.addPass(effectFXAA);
                break;

        }
    }

});

function getMapName(index) {
    return "wtb_" + index + ".jpg";
}

var loaderEarth = new THREE.TextureLoader();

function resetToOrigin(name) {

    console.log("换皮肤")
        // 加载一个资源
    loaderEarth.load(
        // 资源链接
        'assets/images/earthMap/' + name,
        // 资源加载完成后的回调函数
        function(texture) {
            console.log("getYou")
                // do something with the texture
            earth.material.map = texture;
            // earth.material.opacity = 1;
            earth.material.needsUpdate = true;
            // var newTexture = texture.clone();

            var newTexture = new THREE.Texture(texture.image);
            newTexture.needsUpdate = true;
            newTexture.wrapS = newTexture.wrapT = THREE.RepeatWrapping;
            newTexture.matrixAutoUpdate = false; // 设置纹理属性matrixAutoUpdate为false以后，纹理将通过matrix属性设置的矩
            mapPlane.material.map = newTexture;
            mapPlane.material.map.matrix
                .identity() //矩阵重置
                .translate(-earthUVcenter.x, -earthUVcenter.y) //设置中心点
                .rotate(earthUVrotate.rotate) // 旋转
                .scale(earthUVscale.x, earthUVscale.y) // 设置repeat
                .translate(earthUVcenter.x, earthUVcenter.y) //设置中心点
                .translate(earthUVoffset.x, earthUVcenter.y); //偏移

            mapPlane.material.needsUpdate = true;

        },
        // 资源加载过程中的回调函数
        function(xhr) {
            // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // 资源下载出错时的回调函数
        function(xhr) {
            // console.log('An error happened');
        }
    );
}

function setMapChange(name, index) {
    if (loadedArr[index]) {

        earth.material.map = loadedArr[index];
        earth.material.needsUpdate = true;




        var newTexture = new THREE.Texture(loadedArr[index].image);
        newTexture.needsUpdate = true;
        newTexture.wrapS = newTexture.wrapT = THREE.RepeatWrapping;
        newTexture.matrixAutoUpdate = false; // 设置纹理属性matrixAutoUpdate为false以后，纹理将通过matrix属性设置的矩
        mapPlane.material.map = newTexture;
        mapPlane.material.map.matrix
            .identity() //矩阵重置
            .translate(-earthUVcenter.x, -earthUVcenter.y) //设置中心点
            .rotate(earthUVrotate.rotate) // 旋转
            .scale(earthUVscale.x, earthUVscale.y) // 设置repeat
            .translate(earthUVcenter.x, earthUVcenter.y) //设置中心点
            .translate(earthUVoffset.x, earthUVcenter.y); //偏移

        mapPlane.material.needsUpdate = true;


    } else {
        loaderEarth.load(
            // 资源链接
            'assets/images/earthMap/' + name,
            // 资源加载完成后的回调函数
            function(texture) {
                loadedArr[index] = texture;
                // do something with the texture
                earth.material.map = texture;
                // earth.material.opacity = 1;
                earth.material.needsUpdate = true;



                var newTexture = new THREE.Texture(texture.image);
                newTexture.needsUpdate = true;
                newTexture.wrapS = newTexture.wrapT = THREE.RepeatWrapping;
                newTexture.matrixAutoUpdate = false; // 设置纹理属性matrixAutoUpdate为false以后，纹理将通过matrix属性设置的矩
                mapPlane.material.map = newTexture;
                mapPlane.material.map.matrix
                    .identity() //矩阵重置
                    .translate(-earthUVcenter.x, -earthUVcenter.y) //设置中心点
                    .rotate(earthUVrotate.rotate) // 旋转
                    .scale(earthUVscale.x, earthUVscale.y) // 设置repeat
                    .translate(earthUVcenter.x, earthUVcenter.y) //设置中心点
                    .translate(earthUVoffset.x, earthUVcenter.y); //偏移

                mapPlane.material.needsUpdate = true;

            },
            // 资源加载过程中的回调函数
            function(xhr) {
                // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // 资源下载出错时的回调函数
            function(xhr) {
                // console.log('An error happened');
            }
        );

    }

}

/**
 * 历史沿革中的卫星变化
 * @param {} year
 */
function setSateNumber(year) {
    if (!!datas) {
        var sates = datas.timelineSate;
        var html = "";
        sates.forEach(function(item) {
            if (+item.start < +year && +item.end > +year) {
                html += "<span>" + item.name + "(" + item.start + ")</span>";
            }
        })
        $("#sateNumber").html(html);
    }
}


/**
 * 生成全球监测的图例
 */
function createTuliBox() {
    var tuliList = [{
            name: "AreaStation",
            cname: "中国地面气象自动站",
            icon: "./assets/images/earth_icon/AreaStation_kh.png",
            number: "65000站"
        },
        {
            name: "NationalWelkinStation",
            cname: "中国高空站资料",
            icon: "./assets/images/earth_icon/NationalWelkinStation.png",
            number: "120站"
        },
        {
            name: "NationalRadiationStation",
            cname: "国家辐射站资料",
            icon: "./assets/images/earth_icon/NationalRadiationStation.png",
            number: "99站"
        },
        {
            name: "RADIATION_STATION",
            cname: "基准辐射站资料",
            icon: "./assets/images/earth_icon/RADIATION_STATION.png",
            number: "7站"
        },
        {
            name: "NativeSyncSatellite",
            cname: "国内静止气象卫星",
            icon: "./assets/images/earth_icon/NativeSyncSatellite.png",
            number: "累计发射8颗"
        },
        {
            name: "NativePolarSatellite",
            cname: "国内极轨气象卫星",
            icon: "./assets/images/earth_icon/NativePolarSatellite.png",
            number: "累计发射9颗"
        },
        {
            name: "globalGroundStation",
            cname: "全球地面站资料",
            icon: "./assets/images/earth_icon/globalGroundStation.png",
            number: "7000站"
        },


        {
            name: "globalGaokong",
            cname: "全球高空探测资料",
            icon: "./assets/images/earth_icon/globalGaokong.png",
            number: "1200站"
        },
        {
            name: "aircraft",
            cname: "全球飞机观测资料",
            icon: "./assets/images/earth_icon/aircraft.png",
            number: "5800架"
        },
        {
            name: "globalRadiationStation",
            cname: "全球辐射站资料",
            icon: "./assets/images/earth_icon/globalRadiationStation.png",
            number: "1412站"
        },
        {
            name: "globalShip",
            cname: "全球船舶观测资料",
            icon: "./assets/images/earth_icon/globalShip.png",
            number: "2100艘船"
        },
        {
            name: "globalBuoy",
            cname: "全球浮标观测资料",
            icon: "./assets/images/earth_icon/globalBuoy.png",
            number: "3500站"
        },

        {
            name: "global_sea",
            cname: "全球海洋潮位观测资料",
            icon: "./assets/images/earth_icon/global_sea.png",
            number: "600站"
        },

        {
            name: "ForeignSyncSatellite",
            cname: "国外静止气象卫星",
            icon: "./assets/images/earth_icon/ForeignSyncSatellite.png",
            number: "5颗"
        },
        {
            name: "ForeignPolarSatellite",
            cname: "国外极轨气象卫星",
            icon: "./assets/images/earth_icon/ForeignPolarSatellite.png",
            number: "13颗"
        }

    ];
    var html = '';
    tuliList.forEach(function(item) {
        html += '<div><img src="' + item.icon + '"/>' + item.cname + "(" + item.number + ")</div>"
    });
    $(".tulibox").html(html);
}


/**
 * 指定类型上添加对应类型
 * @param container
 * @param type
 * @param name
 */

function addTypeControl(container, type, mode) {
    var typeIndex = State.types.indexOf(type);
    var hotEventTypesIndex = State.hotEventTypes.indexOf(type);
    var name = $("[type=" + type + "]").attr("name");
    dataSelMap.type = type;
    dataSelMap.name = name;
    if (type != "AreaStation_kh" && type != "AreaStation_fkh") {
        IntroduceBox();
    }
    if (type == "CNHotEvent" || type == "FRHotEvent") {

        if (!$("#" + type).attr("show") || $("#" + type).attr("show") == "false") {
            $("#" + type).attr("show", true);
            $("#" + type).addClass("bsel");
            if ($("#history").hasClass("bsel")) {
                $("#history").removeClass("bsel");
            }
            $("#" + type + " img").addClass("bsel");
            $("#" + type + " div").addClass("bsel");
        }
        $(".stop .sto").attr('trigger', true).click();
    } else if (type == "ForeignSyncSatellite" || type == "ForeignPolarSatellite" || type == "NativeSyncSatellite" || type == "NativePolarSatellite" || type == "HYDROLOGY_STATION") {
        $("." + type + "_list").toggle();
        if ($("." + type + "_list").css("display") != "none") {
            if (type == "HYDROLOGY_STATION") {
                $("." + type + "_list li:nth-child(1)").attr('trigger', true).click();
            }
        }
    }


    if (timeTypes.indexOf(type) != -1) {
        if (firstClick == 0) {

            firstClick = 1;
        } else {

            showChina(500);

        }


        if (typeIndex == -1) {
            State.types.push(type);

        }
        initNum();
        if (State.slider) {
            timeRelateStation(State.types, State.sliderValue[0], State.sliderValue[1], container);
        } else {

            timeRelateStation(State.types, 1900, State.year, container);
        }

        if (type == "silkroad" || type == "CNHotEvent" || type == "FRHotEvent") {
            removeOthers(container, type); // 互斥操作
            $(".stop .sto").attr('trigger', true).click();
        } else {

            changeTuceng();
        }
    } else if (hotEventTypes.indexOf(type) != -1) {

        showChina();

        if (hotEventTypesIndex == -1) {
            State.hotEventTypes.push(type);

        }

        //控制当没有数据的时候  hotevent怎么显示
        if (CNHotEventArr[State.year - 1950].children.length == 0) {
            if (CNHotEventArr[CNHotEventArr.length - 1].children.length != 0) {
                var rto = ((CNHotEventArr.length - 1) * 4 + 92) * degtorad;

            } else if (CNHotEventArr[CNHotEventArr.length - 2].children.length != 0) {
                var rto = ((CNHotEventArr.length - 2) * 4 + 92) * degtorad;
                // console.log(2)
            } else {
                var rto = (66 * 4 + 92) * degtorad;
            }


            pause();
            // console.log(timeline.dial.rotation.y)
            targetRotationX = -rto;
            // var position = 6.30; //设置到右边的最大距离
            timeline.dial.rotation.y = rto;
            // console.log(timeline.dial.rotation.y)
        }


        if (State.types != undefined && State.types.length > 0) {
            //if (playSpeed != 0) {
            if (isInSilkRoad || isInGlobalMonitor) {
                $(".stationNumber").hide();
            } else {
                $(".stationNumber").show();
            }
            State.types.forEach(function(type) {
                var num = 0;
                container.getObjectByName(type).children.forEach(function(year) {
                    num += year.children.length
                })


                $(".singleType." + type + " .year").html(num);
            })
            $(".stationNumber>.year>.num").html(State.year);
        }
        if (type == "silkroad" || type == "CNHotEvent" || type == "FRHotEvent") {
            removeOthers(container, type);
            $(".stop .sto").click();
        } else {

            changeTuceng();
        }
        updateHotEvent(State.hotEventTypes, State.year, container, mapMode);
    } else {

        //添加函数

        if (State.types != undefined && State.types.length > 0) {
            //if (playSpeed != 0) {
            if (isInSilkRoad || isInGlobalMonitor) {
                $(".stationNumber").hide();
            } else {
                $(".stationNumber").show();
            }
            State.types.forEach(function(type) {
                var num = 0;
                console.log(type)
                container.getObjectByName(type).children.forEach(function(year) {
                    num += year.children.length
                })


                $(".singleType." + type + " .year").html(num);
            })
            $(".stationNumber>.year>.num").html(State.year);
        }
        if (type == "silkroad" || type == "CNHotEvent" || type == "FRHotEvent") {
            removeOthers(container, type);

            window.clearInterval(lunbo.sss);
        } else {

            changeTuceng();
        }
        addComenType(container, type, mode);
    }
}





/**
 * 向存在数组中添加type，通过sceneInShow记录当前选中的场景
 * @param type
 */
function addTypeInScene(type) {
    if (sceneInShow.indexOf(type) == -1) {
        sceneInShow.push(type);
    }
}
/**
 * 移除数组中的东西
 * @param type
 */
function removeTypeInScene(type) {
    if (sceneInShow.indexOf(type) != -1) {
        sceneInShow.splice(sceneInShow.indexOf(type), 1);
    }
}


/**
 * 删除指定目标上的指定类型
 * @param container
 * @param type
 */
function removeTypeControl(container, type) {
    var typeIndex = State.types.indexOf(type);
    var hotEventTypesIndex = State.hotEventTypes.indexOf(type);


    earthRotate = false;
    if (timeTypes.indexOf(type) != -1) {
        if (typeIndex != -1) {
            State.types.splice(typeIndex, 1);
        }

        initNum();
    }
    if (hotEventTypes.indexOf(type) != -1) {
        if (hotEventTypesIndex != -1) {
            State.hotEventTypes.splice(hotEventTypesIndex, 1);
        }
    }
    if (type == "CNHotEvent" || type == "FRHotEvent") {
        //做一带一路和国内事件的联动，让点任何一个按钮都可以达到相同的效果
        if ($("#" + type).attr("show")) {
            $("#" + type).attr("show", false);
            $("#" + type).removeClass("bsel");
            $("#" + type + " img").removeClass("bsel");
            $("#" + type + " div").removeClass("bsel");
        }
        $(".stop .sto").attr('trigger', true).click();
    } else if (type == "ForeignSyncSatellite" || type == "ForeignPolarSatellite" || type == "NativeSyncSatellite" || type == "NativePolarSatellite" || type == "HYDROLOGY_STATION" || type == "AreaStation") {
        $("." + type + "_list").toggle();
        if ($("." + type + "_list").css("display") == "none") {
            var liArray = $("." + type + "_list li.active3");
            if (liArray != undefined && liArray.length > 0) {
                liArray.each(function(i, n) {
                    $(this).attr('trigger', true).click()
                });
            }
            var oneliArray = $("." + type + "_list li.active1");
            if (oneliArray != undefined && oneliArray.length > 0) {
                oneliArray.each(function(i, n) {
                    $(this).attr('trigger', true).click()
                });
            }
        }
    }
    removeType(container, type);
    changeTuceng();
}


/**
 * 更新存在的图层的那个图标下的内容
 * @param types
 */
function updateExistTucent(types) {
    types.forEach(function(type) {
        var obj = {};
        obj[type] = $("[type=" + type + "]").attr("name");
        tuceng.push(obj);
    })
    changeTuceng();
}

/**
 * 更新每个站点的数字
 */
function updateStationNumber() {
    if (State.types.length > 0) {
        //if (playSpeed != 0) {
        if (isInSilkRoad || isInGlobalMonitor) {
            $(".stationNumber").hide();
        } else {
            $(".stationNumber").show();
        }
        State.types.forEach(function(type) {
            var num = 0;
            console.log(type);
            //这里需要一个代理来直接作为父元素，然后通过更换指向的地址获取对应的东西
            stationContainer.getObjectByName(type).children.forEach(function(year) {
                num += year.children.length
            })


            $(".singleType." + type + " .year").html(num);
        })
        $(".stationNumber>.year>.num").html(State.year);
    } else {
        $(".stationNumber").hide();
    }
}