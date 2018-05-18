function initGL(canvas) {
  gl = canvas.getContext('webgl');
  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }
}

function getShader(gl, id) {
  var shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }

  var str = "";
  var k = shaderScript.firstChild;
  while (k) {
    if (k.nodeType == 3) {
      str += k.textContent;
    }
    k = k.nextSibling;
  }

  var shader;
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }

  gl.shaderSource(shader, str);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

function initShaders() {
  var fragmentShader = getShader(gl, "shader-fs");
  var vertexShader = getShader(gl, "shader-vs");

  app.shaderProgram = gl.createProgram();
  gl.attachShader(app.shaderProgram, vertexShader);
  gl.attachShader(app.shaderProgram, fragmentShader);
  gl.linkProgram(app.shaderProgram);

  if (!gl.getProgramParameter(app.shaderProgram, gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
  }

  gl.useProgram(app.shaderProgram);

}

function initProgramInfo() {
  app.programInfo = {
    program: app.shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(app.shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(app.shaderProgram, 'aVertexNormal')
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(app.shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(app.shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(app.shaderProgram, 'uNormalMatrix')
    }
  };
}

function initTexture( url) {
  const object = {};
  
  object.texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, object.texture);

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  object.texture.image = new Image();
  object.texture.image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, object.texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, object.texture.image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(object.texture.image.width) && isPowerOf2(object.texture.image.height)) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       // No, it's not a power of 2. Turn of mips and set
       // wrapping to clamp to edge
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  object.texture.image.crossOrigin = "";
  object.texture.image.src = url;
  return object;
}

function initTextures(){
  app.texture.police = initTexture( "textures/police_building.png" );
  app.texture.restaurant = initTexture( "textures/rest_texture.png" );
  app.texture.hospital = initTexture( "textures/hospital_texture.png" );
  app.texture.radiostation = initTexture( "textures/radiostation_texture.png" );
  app.texture.gas_machine = initTexture( "textures/gas_machine_texture.png" );
}

function initBuffers() {
  app.buffers.cube = getCubeData();
  app.buffers.cyl = getCylData(50);
  app.buffers.sphere = getSphereData();
  app.buffers.hexagon = getCylData(6);
}
