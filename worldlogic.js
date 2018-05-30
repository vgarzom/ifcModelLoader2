
function drawWorld() {

  if(!app.loadComplete){
    return;
  }

  gl.clearColor(36/255, 67/255, 108/255, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

  app.projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  app.fieldOfView = 45 * Math.PI / 180;
  app.zNear = 0.1;
  app.zFar = 1000000.0;
  mat4.perspective(app.projectionMatrix,
    app.fieldOfView,
    aspect,
    app.zNear,
    app.zFar);
  
  app.modelViewMatrix = mat4.create();
  app.normalMatrix = mat4.create();

  mat4.translate(app.projectionMatrix,     // destination matrix
    app.projectionMatrix,     // matrix to translate
    [0, 0.0, -30]);  // amount to translate

  mat4.rotate(app.projectionMatrix,  // destination matrix
    app.projectionMatrix,  // matrix to rotate
    app.camera.y,     // amount to rotate in radians
    [0, 1, 0]);       // axis to rotate around (X)

  mat4.rotate(app.projectionMatrix,  // destination matrix
    app.projectionMatrix,  // matrix to rotate
    app.camera.x,     // amount to rotate in radians
    [1, 0, 0]);       // axis to rotate around (X)

  mvPushMatrix();
  drawElement(app.drawingInfo, null, false, [1.0, 0.0, 0.0, 1.0]);
  mvPopMatrix();

  updateDayTime();
}

function updateDayTime(){
  app.dayTime += app.deltaTime;
  if (app.dayTime >= 24){
    app.dayTime = 0;
  }
}

app.drawScene = drawWorld;
