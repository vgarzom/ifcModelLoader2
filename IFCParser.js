//------------------------------------------------------------------------------
// OBJParser
//------------------------------------------------------------------------------

// OBJDoc object
// Constructor
var IFCDoc = function (url) {
    this.url = url;
    // Inicializa la información de descripción del archivo ifc
    this.name = new String();
    this.time_stamp = new String();
    this.author = new String();
    this.organization = new String();
    this.preprocessor_version = new String();
    this.originating_system = new String();
    this.authorization = new String();

    // Información de Schema
    this.file_schema = new String();

    this.data = [];

    // Información sobre vértices, materiales, etc.
    this.mtls = new Array(0);      // Initialize the property for MTL
    this.objects = new Array(0);   // Initialize the property for Object
    this.vertices = new Array(0);  // Initialize the property for Vertex
    this.normals = new Array(0);   // Initialize the property for Normal
    this.textures = new Array(0);
}

// Parsing the OBJ file
IFCDoc.prototype.parse = function (fileString) {
    var lines = fileString.split('\n');  // Break up into lines and store them as array
    lines.push(null); // Append null
    var index = 0;    // Initialize index of line

    var currentObject = null;
    var currentMaterialName = "";
    var textindex = 0;
    // Parse line by line
    var line;         // A string in the line to be parsed
    var sp = new StringParser();  // Create StringParser
    var parsingHeader = false;
    var parsingData = false;
    while ((line = lines[index++]) != null) {
        line = removeCommentsOnLine(line);
        sp.init(line);                  // init StringParser
        var command = sp.getWord();     // Get command
        if (command == null) continue;  // check null command

        switch (command) {
            case comment:
                continue;  // Skip comments
            case header_start:     // Read Material chunk
                if (!parsingHeader) {
                    parsingHeader = true;
                }
                continue; // Go to the next line
            case data_start:     // Read Material chunk
                if (!parsingData) {
                    parsingData = true;
                }
                continue; // Go to the next line
            case end_section:     // Read Material chunk
                if (parsingHeader) {
                    parsingHeader = false;
                }
                if (parsingData) {
                    parsingData = false;
                }
                continue; // Go to the next line
            case file_name:
                if (parsingHeader) {
                    index = this.parseHeaderFileName(lines, index);
                }
                continue;
            case file_schema:
                if (parsingHeader) {
                    this.parseSchema(line);
                }
                continue;
            default:
                if (command.indexOf("#") !== -1 && parsingData) {
                    this.parseDataLine(line);
                }
                continue;

        }
    }
    app.ifcFile = this;
    this.onLoadComplete();
    return true;
}

IFCDoc.prototype.parseHeaderFileName = function (lines, index) {
    var line = removeCommentsOnLine(lines[index - 1]);
    var filename = "";
    var endFilename = false;
    while (!endFilename) {
        filename += line.trim();
        endFilename = line.endsWith(');');
        line = removeCommentsOnLine(lines[index++]);
    }
    filename = filename.replace('FILE_NAME(', '').replace(');', '');
    var filename_data = filename.split(',');
    this.name = filename_data[0].replace(/'/g, '');
    this.time_stamp = filename_data[1].replace(/'/g, '');
    this.author = filename_data[2].replace(/'/g, '');
    this.organization = filename_data[3].replace(/'/g, '');
    this.preprocessor_version = filename_data[4].replace(/'/g, '');
    this.originating_system = filename_data[5].replace(/'/g, '');
    this.authorization = filename_data[6].replace(/'/g, '');
    return index;
}

//Convertimos la línea de texto para obtener el schema
IFCDoc.prototype.parseSchema = function (line) {
    this.file_schema = line.replace(file_schema, '')
        .replace(/'/g, '')
        .replace(/\(/g, '')
        .replace(/\)/g, '')
        .replace(/;/g, '')
        .trim();
}

IFCDoc.prototype.parseDataLine = function (line) {
    //console.log('Parsing data line');
    var parts = line.split('=');
    var index = parts[0].trim().replace(/#/g, '');
    var content = parts[1].trim();
    if (content.indexOf(CARTESIANPOINTLIST3D) !== -1) {
        this.parseCartesianPointList(index, 3, content);
    }
    if (content.indexOf(TRIANGULATEDFACESET) !== -1) {
        this.parseTriangulatedFaceSet(index, content);
    }
}

IFCDoc.prototype.parseCartesianPointList = function (index, vertexLength, content) {
    content = content.replace('IFCCARTESIANPOINTLIST3D', '').replace(/\(/g, '').replace(/\(/g, '').trim();
    var points = content.split(',');
    var vertices = [];
    for (var i = 0; i < points.length - 2; i += vertexLength) {
        var v = new CartesianPoint3D(parseFloat(points[i]), parseFloat(points[i + 1]), parseFloat(points[i + 2]));
        vertices.push(v);
    }
    var cartesianPointList3d = new CartesianPoint3DList(index, vertices);
    this.data.push(cartesianPointList3d);
}

IFCDoc.prototype.parseTriangulatedFaceSet = function (index, content) {
    content = content.replace('IFCTRIANGULATEDFACESET', '').replace(/\(/g, '').replace(/\(/g, '').trim();
    var points = content.split(',');
    var indices = [];
    var vertexIndex = points[0].replace('#', '');
    for (var i = 3; i < points.length; i++) {
        var v = parseInt(points[i]) - 1;
        indices.push(v);
    }
    var tringulatedFaceSet = new TriangulatedFaceSet(index, vertexIndex, indices);
    this.data.push(tringulatedFaceSet);
}

IFCDoc.prototype.getDrawingInfo = function () {
    //console.log("Getting drawing info");
    var vertices = [];
    var indices = [];
    var normals = [];
    var cplist = null;
    for (var i = 0; i < this.data.length; i++) {
        if (this.data[i] instanceof CartesianPoint3DList) {
            cplist = this.data[i];
            for (j = 0; j < cplist.cartesianPoints.length; j++) {
                vertices.push(cplist.cartesianPoints[j].x);
                vertices.push(cplist.cartesianPoints[j].y);
                vertices.push(cplist.cartesianPoints[j].z);
            }
        }
        if (this.data[i] instanceof TriangulatedFaceSet) {
            //console.log('looking for indices');
            var tfaceset = this.data[i];
            indices = tfaceset.indices;
        }
    }

    //Después de tener todos los vértices e índices para las caras procedemos a calcular las normales
    var currentIndex = 0;
    for (var i = 0; i < indices.length - 1; i++) {
        if (currentIndex == 2) { //Hemos encontrado los tres índices de la cara
            var p1 = cplist.cartesianPoints[indices[i - 2]];
            var p2 = cplist.cartesianPoints[indices[i - 1]];
            var p3 = cplist.cartesianPoints[indices[i]];
            var normal = getNormalVector(
                [p1.x, p1.y, p1.z],
                [p2.x, p2.y, p2.z],
                [p3.x, p3.y, p3.z],
            );
            for (var j = 0; j < 3; j++) {
                normals.push(normal[0]);
                normals.push(normal[1]);
                normals.push(normal[2]);
            }
            currentIndex = 0;
        }
        currentIndex++;
    }
    console.log(normals);
    console.log(indices);
    console.log(vertices);

    //console.log(vertices.length);
    //console.log("Min value of indices = " + min);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);

    const normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(normals), gl.STATIC_DRAW);

    var dinfo = new DrawingInfo(vertexBuffer, normalsBuffer, [], indexBuffer, [], indices.length);
    return dinfo;
}

IFCDoc.prototype.onLoadComplete = function () {
    console.log(this);
    app.drawingInfo = this.getDrawingInfo();
    app.loadComplete = true;
}