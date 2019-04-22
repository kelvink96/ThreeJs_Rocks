initScene();

function initScene() {
    var width = window.innerWidth;
    var height = window.innerHeight;

// create scene
    var scene = new THREE.Scene();
// create camera
    var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor("#e5e5e5");
    renderer.setSize(width, height);
    // append renderer
    document.body.appendChild(renderer.domElement);

    // make scene responsive
    window.addEventListener('resize', function () {
        var adjustWidth = window.innerWidth;
        var adjustHeight = window.innerHeight;
        // set renderer window size
        renderer.setSize(adjustWidth, adjustHeight);
        // set scene to adjust contents proportionally
        camera.aspect = adjustWidth / adjustHeight;
        camera.updateProjectionMatrix();
    });

    // create raycaster
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function onMouseMove(evt) {
        evt.preventDefault();

        mouse.x = (evt.clientX / width) * 2 - 1;
        mouse.y = -(evt.clientY / height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(scene.children, true);
        for (var i = 0; i < intersects.length; i++) {
            // initialize tweenmax lib actions
            var tweenmax = new TimelineMax({paused: false});
            tweenmax.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut});
            tweenmax.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut});
            tweenmax.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut});
            tweenmax.to(intersects[i].object.rotation, .5, {x: Math.PI * .5, ease: Expo.easeOut}, "=-1.5");
            tweenmax.to(intersects[i].object.rotation, .5, {y: Math.PI * .5, ease: Expo.easeOut}, "=-1.5");
        }
    }

    // add controls from OrbitControls js
    // controls = new THREE.OrbitControls(camera, renderer.domElement);

    // create shape
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    // create material, color or image texture
    var material = new THREE.MeshLambertMaterial({color: 0xf7f7f7});

    // generate cubes at random positions
    cubeX = -10;
    for (var i = 0; i < 25; i++) {
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x = (Math.random() - 0.5) * 10;
        cube.position.y = (Math.random() - 0.5) * 10;
        cube.position.z = (Math.random() - 0.5) * 10;
        scene.add(cube);
        cubeX += 1;
    }

    // set shape camera position
    camera.position.z = 5;

    var pointLight1 = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight1.position.set(0, 0, 0);
    scene.add(pointLight1);

    var pointLight2 = new THREE.PointLight(0xeeeeee, 1.5, 1000);
    pointLight2.position.set(0, 0, 25);
    scene.add(pointLight2);

// game logic
    var update = function () {
    };

    // draw scene
    var render = function () {
        window.addEventListener('mousemove', onMouseMove);

        renderer.render(scene, camera);
    };

// run game loop (update, render, repeat)
    var gameLoop = function () {
        requestAnimationFrame(gameLoop);

        update();
        render();
    };

    gameLoop();
}
