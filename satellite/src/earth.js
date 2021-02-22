var three,
    camera,
    composer,
    renderer,
    effect,
    scene,
    timeline,
    earth,
    earthContainer,
    skybox,
    innerRing,
    outerRing,
    ambientLayer,
    blurs;
var winWth = window.innerWidth,
    winHgt = window.innerHeight;

var renderEarthID;
var PI2 = Math.PI * 2;
var objects = [];
var radius = 160;
var loader = new THREE.ImageLoader();
var group = new THREE.Object3D();
initEarth()
function initEarth() {
    container = document.getElementById('globe_container');
    //设置场景
    scene = new THREE.Scene();
    scene
        .rotation
        .set(0, 0, 0);
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
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true, preserveDrawingBuffer: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x031730, 0.0);
    renderer.setClearAlpha(0);
    renderer.setSize(winWth, winHgt);
    container.appendChild(renderer.domElement);
    scene.add(group);
    // group.rotation.x = THREE.Math.degToRad(10); 调整地球初始的角度
    group.rotation.z = THREE
        .Math
        .degToRad(-24);
    // group.rotation.z = THREE.Math.degToRad(-20); 地球样子
    var geo = new THREE.SphereGeometry(radius, 50, 50);
    var mat1 = new THREE.MeshLambertMaterial({
        map: new THREE
            .TextureLoader()
            .load("assets/images/earth.jpg"),
        emissive: 0x000000,
        combine: THREE.MultiplyOperation,
        side: THREE.FrontSide,
        wrapAround: true
    });
    // var mat1 = new THREE.MeshBasicMaterial({ 	map: new
    // THREE.TextureLoader().load("assets/images/earth.png"), /* 	emissive:
    // 0x000000, 	combine : THREE.MultiplyOperation, 	side:THREE.FrontSide,
    // 	wrapAround : true */ });

    earth = new THREE.Mesh(geo, mat1);
    group.add(earth);
    renderer.render(scene, camera);

    //  国界线
    var geo = new THREE.SphereGeometry(radius + 4, 50, 50);
    var mat = new THREE.MeshLambertMaterial({
        // blending: THREE.AdditiveBlending,
        map: new THREE
            .TextureLoader()
            .load("assets/images/countryBounding.png"),
        transparent: true,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4,
        opacity: 1
    });
    earthPol = new THREE.Mesh(geo, mat);
    // earthPol.rotation.x = 0.01

    earth.add(earthPol);
    // ep2 = earthPol.clone();    //不知道干什么的，注视了也没事 earth.add(ep2);
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
    var mat = new THREE.MeshLambertMaterial({transparent: true, color: 0xFFFFFF, blending: THREE.AdditiveBlending, opacity: .4});
    var egh = new THREE.EdgesHelper(new THREE.Mesh(geo, mat), 0xFFFFFF);
    egh.material.linewidth = 1;
    egh.material.transparent = true;
    egh.material.opacity = .08;
    earth.add(egh);

    // 赤道
    earth.ring = new THREE.Object3D();
    var r = parseInt(radius + radius * 0.35);
    var t = Math.PI / 180 * 2;
    var mat = new THREE.LineBasicMaterial({linewidth: .5, color: 0x6FD5F0, transparent: true, opacity: .4});

    var lineGeo = new THREE.Geometry();
    for (i = 0; i < 180; i++) {
        var x = r * Math.cos(t * i);
        var z = r * Math.sin(t * i);

        lineGeo
            .vertices
            .push(new THREE.Vector3(x * .985, 0, z * .985));
        lineGeo
            .vertices
            .push(new THREE.Vector3(x, 0, z));

        if (i % 5 == 0) {

            lineGeo
                .vertices
                .push(new THREE.Vector3(x * .965, 0, z * .965));
            lineGeo
                .vertices
                .push(new THREE.Vector3(x, 0, z));
            lineGeo
                .vertices
                .push(new THREE.Vector3(x * .965, 0, z * .965));
            lineGeo
                .vertices
                .push(new THREE.Vector3(x, 0, z));

        }

    }

    // now add all the lines as one piece of geometry
    var line = new THREE.LineSegments(lineGeo, mat);
    earth
        .ring
        .add(line);
    earth.add(earth.ring);

    //点击事件判断用的
    ep2userData = {
        type: "earth"
    };
    earth.userData = {
        type: "earth"
    };

    objects.push(earth);
    earthPosition = earth.position;
   
}

function  renderEarth(){
    renderer.render(scene,camera);  
    console.log("第一次转到")
    renderEarthID = window.requestAnimationFrame(renderEarth)
}

 renderEarthID = window.requestAnimationFrame(renderEarth);

