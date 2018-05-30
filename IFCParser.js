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
                line = line.trim();
                if (command.indexOf("#") == 0 && parsingData) {
                    this.parseDataLine(line);
                }
                continue;

        }
    }
    app.ifcFile = this;
    console.log(app.left_index);
    console.log(app.left_tags);
    console.log(app.filedata);

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
    line = line.replace(/ /g, '')
    var parts = line.split('=');
    var id = parts[0];

    var objectType = parts[1].split('(')[0].toUpperCase();

    switch (objectType) {
        case 'IFCCARTESIANPOINT':
            app.filedata.ifcCartesianPoints[id] = parseIfcCartesianPoint(parts[1]);
            break;
        case 'IFCPOLYLOOP':
            app.filedata.ifcLoops[id] = parseIfcPolyLoop(parts[1]);
            break;
        case 'IFCFACEOUTERBOUND':
            app.filedata.ifcFaceBounds[id] = parseIfcFaceOuterBound(parts[1]);
            break;
        case 'IFCFACE':
            app.filedata.ifcFaces[id] = parseIfcFace(parts[1]);
            break;
        case 'IFCSIUNIT':
            app.filedata.ifcUnits[id] = parseIfcSIUnit(parts[1]);
            break;
        case 'IFCDIMENSIONALEXPONENTS':
            app.filedata.ifcDimensionalExponents[id] = parseIfcDimensionalExponents(parts[1]);
            break;
        case 'IFCDIRECTION':
            app.filedata.ifcDirections[id] = parseIfcDirection(parts[1]);
            break;
        case 'IFCMEASUREWITHUNIT':
        case 'IFCCONVERSIONBASEDUNIT':
        case 'IFCUNITASSIGNMENT':
        case 'IFCPERSON':
        case 'IFCORGANIZATION':
        case 'IFCPERSONANDORGANIZATION':
        case 'IFCGEOMETRICREPRESENTATIONCONTEXT':
        case 'IFCAPPLICATION':
        case 'IFCOWNERHISTORY':
        case 'IFCPROJECT':
            break;
        case 'IFCAXIS2PLACEMENT3D':
            app.filedata.ifcPlacements[id] = parseIfcAxis2Placement3D(parts[1]);
            break;
        case 'IFCAXIS2PLACEMENT2D':
            app.filedata.ifcPlacements[id] = parseIfcAxis2Placement2D(parts[1]);
            break;
        case 'IFCCOLOURRGB':
            app.filedata.ifcColors[id] = parseIfcColourRGB(parts[1]);
            break;
        case 'IFCLOCALPLACEMENT':
            app.filedata.ifcLocalPlacements[id] = parseIfcLocalPlacement(parts[1]);
            break;
        case 'IFCCLOSEDSHELL':
            app.filedata.ifcConnectedFaceSets[id] = parseIfcClosedShell(parts[1]);
            break;
        case 'IFCOPENSHELL':
            app.filedata.ifcConnectedFaceSets[id] = parseIfcOpenShell(parts[1]);
            break;
        case 'IFCFACETEDBREP':
            app.filedata.ifcFacetedBreps[id] = parseIfcFacetedBrep(parts[1]);
            break;
        case 'IFCSURFACESTYLERENDERING':
            app.filedata.ifcSurfaceStyleRenderings[id] = parseIfcSurfaceStyleRendering(parts[1]);
            break;
        case 'IFCSURFACESTYLE':
            app.filedata.ifcSurfaceStyles[id] = parseIfcSurfaceStyle(parts[1]);
            break;
        case 'IFCPRESENTATIONSTYLEASSIGNMENT':
            app.filedata.ifcPresentationStyleAssignments[id] = parseIfcPresentationStyleAssignment(parts[1]);
            break;
        case 'IFCSTYLEDITEM':
            app.filedata.ifcStyledItems[id] = parseIfcStyledItem(parts[1]);
            break;
        case 'IFCCARTESIANTRANSFORMATIONOPERATOR3D':
            app.filedata.ifcCartesianTransformationOperators[id] = parseIfcCartesianTransformationOperator3D(parts[1]);
            break;
        case 'IFCSHAPEREPRESENTATION':
            app.filedata.ifcRepresentations[id] = parseIfcShapeRepresentation(parts[1]);
            break;
        case 'IFCREPRESENTATIONMAP':
            app.filedata.ifcRepresentationMaps[id] = parseIfcRepresentationMap(parts[1]);
            break;
        case 'IFCMAPPEDITEM':
            app.filedata.ifcMappedItems[id] = parseIfcMappedItem(parts[1]);
            break;
        case 'IFCSHELLBASEDSURFACEMODEL':
            app.filedata.ifcRepresentationItems[id] = parseIfcShellBasedSurfaceModel(parts[1]);
            break;
        case 'IFCPOLYLINE':
            app.filedata.ifcRepresentationItems[id] = parseIfcPolyLine(parts[1]);
            break;
        case 'IFCCIRCLE':
            app.filedata.ifcRepresentationItems[id] = parseIfcCircle(parts[1]);
            break;
        default:
            app.left_index++;
            if (typeof (app.left_tags[objectType]) === "undefined") {
                app.left_tags[objectType] = 0;
            }
            app.left_tags[objectType] = app.left_tags[objectType] + 1;
            break;
    }

    //app.filedata[parts[0]] = parts[1];
    //console.log(app.filedata[parts[0]]);
    /*
    var index = parts[0].trim().replace(/#/g, '');
    var content = parts[1].trim();
    if (content.indexOf(CARTESIANPOINTLIST3D) !== -1) {
        this.parseCartesianPointList(index, 3, content);
    }
    if (content.indexOf(TRIANGULATEDFACESET) !== -1) {
        this.parseTriangulatedFaceSet(index, content);
    }*/
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
    //app.drawingInfo = this.getDrawingInfo();
    this.populateVertexMap();
    /*
    for (var k in app.filedata.ifcFacetedBreps) {
        this.GetIfcFacetedBrepDrawingInfo(app.filedata.ifcFacetedBreps[k]);
    }
    for (var k in app.filedata.ifcRepresentationItems) {
        var ri = app.filedata.ifcRepresentationItems[k];
        if (ri.constructor.name === 'IfcShellBasedSurfaceModel') {
            this.GetIfcShellBasedSurfaceModelDrawingInfo(ri);
        }
    }*/

    for (var f in app.filedata.ifcFaces){
        this.GetIfcFaceDrawingInfo(app.filedata.ifcFaces[f]);
    }
    //

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(app.vertex), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(app.ifcFacetedBrepsDraw.indices), gl.STATIC_DRAW);

    const normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(app.ifcFacetedBrepsDraw.normals), gl.STATIC_DRAW);

    var dinfo = new DrawingInfo(vertexBuffer, normalsBuffer, [], indexBuffer, [], app.ifcFacetedBrepsDraw.total_vertex);
    app.loadComplete = true;
    app.drawingInfo = dinfo;
    console.log(dinfo);
}

IFCDoc.prototype.GetIfcFacetedBrepDrawingInfo = function (ifcFacetedBrep) {
    var faces = ifcFacetedBrep.outer.faces;
    for (var i = 0; i < faces.length; i++) { //Recorremos las caras
        var f = faces[i];
        this.GetIfcFaceDrawingInfo(f);
    }
}

IFCDoc.prototype.GetIfcShellBasedSurfaceModelDrawingInfo = function (ifcShellBasedSurfaceModel) {
    //console.log(ifcShellBasedSurfaceModel);
    for (var n = 0; n < ifcShellBasedSurfaceModel.sbsmBoundaries.length; n++) {
        var b = ifcShellBasedSurfaceModel.sbsmBoundaries[n];

        var faces = b.faces;
        for (var i = 0; i < faces.length; i++) { //Recorremos las caras
            var f = faces[i];
            this.GetIfcFaceDrawingInfo(f)
        }
    }
}


IFCDoc.prototype.GetIfcFaceDrawingInfo = function (f) {
    //console.log(f);
    for (var j = 0; j < f.bounds.length; j++) { //Recorremos los poligonos en cada cara
        var b = f.bounds[j];
        if (typeof (b) === 'undefined') {
            continue;
        }
        var polygon = b.bound.polygon;

        if (polygon.length > 3) {
            for (var k = 1; k < polygon.length - 1; k++) { //Recorremos cada punto cartesiano en el polygono
                app.ifcFacetedBrepsDraw.indices.push(app.vertexmapper[polygon[0]]);
                app.ifcFacetedBrepsDraw.indices.push(app.vertexmapper[polygon[k]]);
                app.ifcFacetedBrepsDraw.indices.push(app.vertexmapper[polygon[k + 1]]);
                app.ifcFacetedBrepsDraw.total_vertex += 3;

                //Calculamos las normales
                var p1 = app.filedata.ifcCartesianPoints[polygon[0]];
                var p2 = app.filedata.ifcCartesianPoints[polygon[k]];
                var p3 = app.filedata.ifcCartesianPoints[polygon[k + 1]];
                var normal = getNormalVector(
                    [p1.x, p1.y, p1.z],
                    [p2.x, p2.y, p2.z],
                    [p3.x, p3.y, p3.z],
                );
                for (var j = 0; j < 3; j++) {
                    app.ifcFacetedBrepsDraw.normals.push(normal[0]);
                    app.ifcFacetedBrepsDraw.normals.push(normal[1]);
                    app.ifcFacetedBrepsDraw.normals.push(normal[2]);
                }
            }
        }


    }

}

IFCDoc.prototype.populateVertexMap = function () {
    var index = 0;
    for (var k in app.filedata.ifcCartesianPoints) {
        var point = app.filedata.ifcCartesianPoints[k];
        app.vertex.push(point.x);
        app.vertex.push(point.y);
        if (typeof (point.z) !== 'undefined') {
            app.vertex.push(point.z);
        } else {
            app.vertex.push(0);
        }
        app.vertexmapper[k] = index;
        index++;
    }
    console.log(app.vertexmapper);
}