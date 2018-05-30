function render(now) {
  now *= 0.001;  // convert to seconds
  app.deltaTime = now - app.then;
  app.then = now;
  app.drawScene();
  requestAnimationFrame(render);
}

function webGLStart() {
  readIFCFile("ifc-models/test3.ifc");
  canvas = document.getElementById("mycanvas");
  initGL(canvas);
  initShaders();
  initProgramInfo();
  initBuffers();
  initTextures();
  initInterfaceListeners();

  gl.clearColor(34.0/255.0, 63.0/255.0, 94.0/255.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  requestAnimationFrame(render);

}

window.onload = function(){
  webGLStart();
};
