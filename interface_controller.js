function initInterfaceListeners() {
    app.sliders.zoom = document.getElementById("zoomRange");
    /*
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

function updateCheckboxList(){
    var container = document.getElementById("checkboxContainer");
    var inner = "";
    for (var i in app.drawingobjects){
        var checked = "";
        if (!app.drawingobjects[i].disabled){
            checked = "checked";
        }
        inner += "<input type=\"checkbox\" id=\"myCheck"+i+"\" onclick=\"enableObject('"+i+"')\" "+checked+">"+i+"</input><br/>"
    }
    container.innerHTML = inner;
}

function enableObject(k){
    app.drawingobjects[k].disabled = !app.drawingobjects[k].disabled;
}

function enableDisableAll(){
    for (var k in app.drawingobjects){
        app.drawingobjects[k].disabled = false;
    }
    updateCheckboxList();
}

function mostrarprecio() {
    var pizza = document.getElementById("pizza"),
       precio = document.getElementById("precio");
  
    precio.value = pizza.value
    app.selectedModel = precio.value;
    webGLStart();
  }
