function initInterfaceListeners() {
    /*app.sliders.speed = document.getElementById("speedRange");
    app.sliders.speedLabel = document.getElementById('speedLabel');

    document.getElementById("first").onclick = function () { app.camera.selected = FIRST };
    document.getElementById("third").onclick = function () { app.camera.selected = THIRD };
    document.getElementById("long_shot").onclick = function () { 
        app.camera.selected = LONGSHOT;
        app.camera.position = [0,10.0,0];
        app.camera.pitch = 90;
        app.camera.heading = 0;
        window.alert('Con la cámara Long-shotgit puedes modificar la curva arrastrando los puntos de control (Esferas mas grandes) con el mouse')
    };*/

    document.addEventListener('keydown', function (event) {
        // if(lastDownTarget == canvas) {
        switch (event.keyCode) {
            case keyCodes.a:
                app.positions.x += app.walkspeed;
                break;
            case keyCodes.d:
                app.positions.x -= app.walkspeed;
                break;
            case keyCodes.w:
                app.positions.z += app.walkspeed;
                break;
            case keyCodes.s:
                app.positions.z -= app.walkspeed;
                break;
        }

    }, false);

    document.addEventListener("mousemove", function (event) {
        if (app.ismousedown) {
            var movex = 0.00005 * (app.mousedown.y - event.clientY);
            var movey = 0.00005 * (app.mousedown.x - event.clientX);
            app.camera.x -= movex;
            app.camera.y -= movey;
        }
    });

    document.addEventListener("mousedown", function (event) {

        //console.log('Mousedown');
        if (!app.ismousedown) {
            app.ismousedown = true;
            app.mousedown.x = event.clientX;
            app.mousedown.y = event.clientY;
        }
        //console.log('Mousedown ---> '+JSON.stringify(app.mousedown));
    });

    document.addEventListener("mouseup", function (event) {
        app.ismousedown = false;
    });
}
