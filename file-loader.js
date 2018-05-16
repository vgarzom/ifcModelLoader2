// Read a file
function readIFCFile(url) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status !== 404) {
            onReadIFCFile(request.responseText, url);
        }
    }
    request.open('GET', url, true); // Create a request to acquire the file
    request.send();                      // Send the request
}

// The file has been read!
function onReadIFCFile(fileString, url) {
    var ifcDoc = new IFCDoc(url);  // Create a OBJDoc object
    var result = ifcDoc.parse(fileString); // Parse the file
    /*if (!result) {
        g_objDoc = null; 
        g_drawingInfo = null;
        console.log("OBJ file parsing error.");
        return;
    }
    g_objDoc = objDoc;*/
}


// OBJ File has been read compreatly
function onReadComplete(gl, model, objDoc) {
    // Acquire the vertex coordinates and colors from OBJ file
    var drawingInfo = objDoc.getDrawingInfo();

    // Write date into the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.vertices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.normals, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, model.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.colors, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, model.textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.textures, gl.STATIC_DRAW);

    // Write the indices to the buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, drawingInfo.indices, gl.STATIC_DRAW);

    return drawingInfo;
}

function removeCommentsOnLine(line){
    line = line.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '');
    return line;
}