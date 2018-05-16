function drawChair() {
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.0, 0.04, 0.0]);
    //Tablas inferiores
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.055, 0.06, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.09, 0.02, 0.5]);
    drawElement(app.buffers.cube, null, false, [216.0 / 255.0, 174.0 / 255.0, 172.0 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.055, 0.06, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.09, 0.02, 0.5]);
    drawElement(app.buffers.cube, null, false, [216.0 / 255.0, 174.0 / 255.0, 172.0 / 255.0, 1.0]);
    mvPopMatrix();
    //Tablas espalda
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.09, 0.13, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.02, 0.09, 0.5]);
    drawElement(app.buffers.cube, null, false, [216.0 / 255.0, 174.0 / 255.0, 172.0 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.09, 0.24, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.02, 0.09, 0.5]);
    drawElement(app.buffers.cube, null, false, [216.0 / 255.0, 174.0 / 255.0, 172.0 / 255.0, 1.0]);
    mvPopMatrix();
    //Dibujamos los cilindros
    //Patas traseras
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.12, 0.1, 0.2]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.04, 0.3, 0.04]);
    drawElement(app.buffers.cyl, null, false, [61 / 255.0, 61 / 255.0, 61 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.12, 0.1, -0.2]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.04, 0.3, 0.04]);
    drawElement(app.buffers.cyl, null, false, [61 / 255.0, 61 / 255.0, 61 / 255.0, 1.0]);
    mvPopMatrix();
    //Patas delanteras
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.06, 0.0, 0.2]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.04, 0.09, 0.04]);
    drawElement(app.buffers.cyl, null, false, [61 / 255.0, 61 / 255.0, 61 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.06, 0.0, -0.2]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.04, 0.09, 0.04]);
    drawElement(app.buffers.cyl, null, false, [61 / 255.0, 61 / 255.0, 61 / 255.0, 1.0]);
    mvPopMatrix();
    mvPopMatrix();
}

function drawTree(color) {
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.02, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.3, 0.04, 0.3]);
    drawElement(app.buffers.cyl, null, false, [1.0, 1.0, 1.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.17, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.06, 0.3, 0.06]);
    drawElement(app.buffers.cyl, null, false, [192.0 / 255.0, 154.0 / 255.0, 108.0 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.52, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.4, 0.4, 0.4]);
    drawElement(app.buffers.sphere, null, false, color);
    mvPopMatrix();
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.72, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.3, 0.3, 0.3]);
    drawElement(app.buffers.sphere, null, false, color);
    mvPopMatrix();
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.84, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.2, 0.2, 0.2]);
    drawElement(app.buffers.sphere, null, false, color);
    mvPopMatrix();
}

function drawStreetLight(lightDirection) {
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.02, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.3, 0.04, 0.3]);
    drawElement(app.buffers.cyl, null, false, [1.0, 1.0, 1.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.26, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.06, 0.5, 0.06]);
    drawElement(app.buffers.cyl, null, false, [64 / 255.0, 64 / 255.0, 64 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.64, 0.195]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(53.13), [1, 0, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.06, 0.5, 0.06]);
    drawElement(app.buffers.cyl, null, false, [64 / 255.0, 64 / 255.0, 64 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.77, 0.45]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.1, 0.1, 0.2]);
    drawElement(app.buffers.cube, null, false, [65 / 255.0, 156 / 255.0, 200 / 255.0, 1.0]);
    var worldPosition = vec3.create();
    mat4.getTranslation(worldPosition, app.modelViewMatrix);
    if (app.lights.spotLights.length < 6) {
        app.lights.spotLights.push({
            intensity: 1.0,
            color: [1.0, 1.0, 1.0, 1.0],
            position: worldPosition,
            direction: lightDirection,
            exponent: 15.0,
            cutoff: 45.0
        });
    }
    mvPopMatrix();
}

function drawPointLamp() {
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.02, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.3, 0.04, 0.3]);
    drawElement(app.buffers.cyl, null, false, [1.0, 1.0, 1.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.27, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.06, 0.5, 0.06]);
    drawElement(app.buffers.cyl, null, false, [192.0 / 255.0, 154.0 / 255.0, 108.0 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.55, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.3, 0.3, 0.3]);
    if(app.dayTime > 7 && app.dayTime < 19.5){
        drawElement(app.buffers.sphere, null, false, [0.7, 0.7, 0.7, 1.0]);
    }else{
        drawElement(app.buffers.sphere, null, false, [255/255, 205/255, 52/255, 0.01]);
    }
    var worldPosition = vec3.create();
    mat4.getTranslation(worldPosition, app.modelViewMatrix);
    if (app.lights.pointLights.length < 3) {
        app.lights.pointLights.push({
            intensity: 0.7,
            color: [255/255, 205/255, 52/255, 1.0],
            position: worldPosition
        });
    }
    mvPopMatrix();
}


function drawStreet() {
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.0, 0.26, -0.0]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [12, 0.02, 1]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-3.42, 0.26, -0.8183]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1, 0.02, 0.64]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [2.2333, 0.26, -0.8183]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1, 0.02, 0.64]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [4.6621, 0.26, -0.8183]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1, 0.02, 0.64]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [4.0165, 0.26, 0.7838]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1, 0.02, 0.64]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.0046, 0.26, 0.7838]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1, 0.02, 0.64]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
    mvPopMatrix();
}

function drawGasStation() {
    mvPushMatrix()
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [4.7589, 0.02, 2.564]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
    mvPopMatrix();

    mvPushMatrix(); //Dibujo del edificio
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [1.2248, 0.51, -0.0066]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.3146, 1, 1.6338]);
    drawElement(app.buffers.cube, app.texture.restaurant, true);
    mvPopMatrix();

    mvPushMatrix(); //Techo gris
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.0247, 1.1019, -0.0085]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [4.0666, 0.1838, 1.8459]);
    drawElement(app.buffers.cube, null, false, [209 / 255, 209 / 255, 209 / 255, 1.0]);
    mvPopMatrix();

    mvPushMatrix(); //Bordes techo blanco izquierda
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-2.1001, 1.1019, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.1838, 0.25, 1.8289]);
    drawElement(app.buffers.cube, null, false, [1, 1, 1, 1.0]);
    mvPopMatrix();

    mvPushMatrix(); //Bordes techo blanco derecha
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [2.1001, 1.1019, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.1838, 0.25, 1.8289]);
    drawElement(app.buffers.cube, null, false, [1, 1, 1, 1.0]);
    mvPopMatrix();

    mvPushMatrix(); //Bordes techo blanco frente
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 1.1019, 1.0063]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [4.384, 0.25, 0.1838]);
    drawElement(app.buffers.cube, null, false, [1, 1, 1, 1.0]);
    mvPopMatrix();

    mvPushMatrix(); //Bordes techo blanco atras
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 1.1019, -1.0063]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [4.384, 0.25, 0.1838]);
    drawElement(app.buffers.cube, null, false, [1, 1, 1, 1.0]);
    mvPopMatrix();

    //Columnas negras
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.6161, 0.51, -0.4963]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.12, 1, 0.12]);
    drawElement(app.buffers.cube, null, false, [61 / 255, 61 / 255, 61 / 255, 1.0]);
    mvPopMatrix();

    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.51, -0.4963]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.12, 1, 0.12]);
    drawElement(app.buffers.cube, null, false, [61 / 255, 61 / 255, 61 / 255, 1.0]);
    mvPopMatrix();

    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.6161, 0.51, 0.4963]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.12, 1, 0.12]);
    drawElement(app.buffers.cube, null, false, [61 / 255, 61 / 255, 61 / 255, 1.0]);
    mvPopMatrix();

    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.51, 0.4963]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.12, 1, 0.12]);
    drawElement(app.buffers.cube, null, false, [61 / 255, 61 / 255, 61 / 255, 1.0]);
    mvPopMatrix();

    //Maquinas
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.2678, 0.26, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.2222, 0.5, 0.2222]);
    drawElement(app.buffers.cube, app.texture.gas_machine, true);
    mvPopMatrix();

    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.3113, 0.26, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.2222, 0.5, 0.2222]);
    drawElement(app.buffers.cube, app.texture.gas_machine, true);
    mvPopMatrix();

}

function drawHospital() {
    mvPushMatrix()
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [3.255, 0.02, 2.564]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
    mvPopMatrix();

    mvPushMatrix(); //Dibujo del edificio
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.3639, 0.86, -0.2213]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.6679, 1.7, 1.4203]);
    drawElement(app.buffers.cube, app.texture.hospital, true);
    mvPopMatrix();
    mvPushMatrix(); //Dibujo del edificio
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.46, 0.86, 0.6773]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.1, 0.04, 0.377]);
    drawElement(app.buffers.cube, null, false, [236.0 / 255.0, 83.0 / 255.0, 83.0 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix(); //Dibujo de la silla
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.7612, 0.01, 0.2]);
    drawChair();
    mvPopMatrix();
    mvPushMatrix(); //Dibujo de la silla
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.7612, 0.01, -0.6]);
    drawChair();
    mvPopMatrix();
    //Dibujamos los árboles
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.2, 0.02, 0.8]);
    drawTree([102 / 255, 155 / 255, 65 / 255, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.2, 0.02, -0.8]);
    drawPointLamp();
    mvPopMatrix();
}

function drawRadioStation() {
    mvPushMatrix()
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [2.3795, 0.02, 2.564]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
    mvPopMatrix();

    mvPushMatrix(); //Dibujo del edificio
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.3, 0.86, -0.0921]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.162, 1.7, 1.162]);
    drawElement(app.buffers.cube, app.texture.radiostation, true);
    mvPopMatrix();

    for (var i = 0; i < 4; i++) {
        mvPushMatrix();
        mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.0, 0.02, 0.8 - i * 0.5451]);
        drawTree([102 / 255, 155 / 255, 65 / 255, 1.0]);
        mvPopMatrix();
    }
}

function drawPoliceStation() {
    mvPushMatrix()
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [3.5362, 0.02, 2.5641]);
    drawElement(app.buffers.cube, null, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
    mvPopMatrix();

    mvPushMatrix(); //Dibujo del edificio
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.5413, 0.66, 0]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0, 1, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.14, 1.3, 1.14]);
    drawElement(app.buffers.cube, app.texture.police, true);
    mvPopMatrix();
    mvPushMatrix(); //Dibujo del edificio
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.2222, 0.66, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.2254, 0.04, 0.5938]);
    drawElement(app.buffers.cube, null, false, [65 / 255.0, 156 / 255.0, 200 / 255.0, 1.0]);
    mvPopMatrix();

    //Dibujamos los árboles
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.42, 0.02, -0.85]);
    drawTree([102 / 255, 155 / 255, 65 / 255, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.42, 0.02, 0.85]);
    drawTree([102 / 255, 155 / 255, 65 / 255, 1.0]);
    mvPopMatrix();
}

function drawRestaurant() {
    mvPushMatrix()
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [3.5362, 0.02, 2.5641]);
    drawElement(app.buffers.cube, null, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
    mvPopMatrix();

    mvPushMatrix(); //Dibujo del edificio
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.8659, 0.66, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.14, 1.3, 1.14]);
    drawElement(app.buffers.cube, app.texture.restaurant, true);
    mvPopMatrix();
}

function drawPark() {
    mvPushMatrix()
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [3.5362, 0.02, 2.5641]);
    drawElement(app.buffers.cube, null, false, [102.0 / 255.0, 155.0 / 255.0, 65.0 / 255.0, 1.0]);
    mvPopMatrix();

    //Dibujamos los árboles
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.0366, 0.02, -0.66]);
    drawTree([255 / 255, 205 / 255, 52 / 255, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.02, -0.66]);
    drawTree([255 / 255, 205 / 255, 52 / 255, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [1.0366, 0.02, -0.66]);
    drawTree([255 / 255, 205 / 255, 52 / 255, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.0366, 0.02, 0.66]);
    drawTree([255 / 255, 205 / 255, 52 / 255, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.02, 0.66]);
    drawTree([255 / 255, 205 / 255, 52 / 255, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [1.0366, 0.02, 0.66]);
    drawTree([255 / 255, 205 / 255, 52 / 255, 1.0]);
    mvPopMatrix();

    //Dibujamos las sillas
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.5183, 0.02, -0.66]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(90), [0, 1, 0])
    drawChair();
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.5183, 0.02, -0.66]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(90), [0, 1, 0])
    drawChair();
    mvPopMatrix();

    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.5183, 0.02, 0.66]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0, 1, 0])
    drawChair();
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.5183, 0.02, 0.66]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0, 1, 0])
    drawChair();
    mvPopMatrix();

    // Dibujamos las lámparas
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.0366, 0.02, 0]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0, 1, 0])
    drawPointLamp();
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [1.0366, 0.02, 0]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0, 1, 0])
    drawPointLamp();
    mvPopMatrix();
}

function drawTruck() {
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.53, 0]);
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.1032, -0.2757, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.5823, 0.3632, 0.28]);
    drawElement(app.buffers.cube, null, false, [1, 1, 1, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.2912, -0.39, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.2065, 0.1245, 0.25]);
    drawElement(app.buffers.cube, null, false, [236 / 255, 83 / 255, 85 / 255, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.2539, -0.2749, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.1318, 0.1112, 0.25]);
    drawElement(app.buffers.cube, null, false, [236 / 255, 83 / 255, 85 / 255, 1.0]);
    mvPopMatrix();

    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.2912, -0.45, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.1255, 0.1255, 0.3]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(90), [1, 0, 0]);
    drawElement(app.buffers.cyl, null, false, [61 / 255, 61 / 255, 61 / 255, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.2912, -0.45, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.1255, 0.1255, 0.3]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(90), [1, 0, 0]);
    drawElement(app.buffers.cyl, null, false, [61 / 255, 61 / 255, 61 / 255, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.4, -0.4, 0.1]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.05, 0.05, 0.05]);
    drawElement(app.buffers.sphere, null, false, [1.0, 1.0, 1.0, 0.2]);
    var worldPosition = vec3.create();
    mat4.getTranslation(worldPosition, app.modelViewMatrix);
    if (app.lights.spotLights.length < 6) {
        console.log("Adding truck  1 light");
        app.lights.spotLights.push({
            intensity: 1.0,
            color: [1.0, 1.0, 1.0, 1.0],
            position: worldPosition,
            direction: [1.0,-1.0,1.0],
            exponent: 15.0,
            cutoff: 45.0
        });
    }
   
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.4, -0.4, -0.1]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.05, 0.05, 0.05]);
    drawElement(app.buffers.sphere, null, false, [1.0, 1.0, 1.0, 0.2]);
    var worldPosition = vec3.create();
    mat4.getTranslation(worldPosition, app.modelViewMatrix);
    if (app.lights.spotLights.length < 6) {
        console.log("Adding truck  2 light");
        app.lights.spotLights.push({
            intensity: 10.0,
            color: [1.0, 1.0, 1.0, 1.0],
            position: worldPosition,
            direction: [0.0,-1.0,-1.0],
            exponent: 2.0,
            cutoff: 90.0
        });
    }
   
    mvPopMatrix();
    mvPopMatrix();

   
}
