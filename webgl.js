function render(now) {
  now *= 0.001;  // convert to seconds
  app.deltaTime = now - app.then;
  app.then = now;
  app.drawScene();
  requestAnimationFrame(render);
}

function webGLStart() {
  /*canvas = document.getElementById("mycanvas");
  initGL(canvas);
  initShaders();
  initProgramInfo();
  initBuffers();
  initTextures();
  initInterfaceListeners();

  gl.clearColor(34.0/255.0, 63.0/255.0, 94.0/255.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  requestAnimationFrame(render);*/
  readIFCFile("ifc-models/test2.ifc");
}

window.onload = function(){
  webGLStart();
};
