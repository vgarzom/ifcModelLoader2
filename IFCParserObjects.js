parseIfcCartesianPoint = function (line) {
    var arg = line.replace('IFCCARTESIANPOINT', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '');
    var coords = arg.split(',');
    //console.log(coords);
    return new IfcCartesianPoint(coords);
}

parseIfcPolyLoop = function (line) {
    var arg = line.replace('IFCPOLYLOOP', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '');
    var coords = arg.split(',');
    var result = [];
    for (var i = 0; i < coords.length; i++) {
        result.push(coords[i]);
    }
    return new IfcPolyLoop(result);
}

parseIfcFaceOuterBound = function (line) {
    var args = line.replace('IFCFACEOUTERBOUND', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var faceBound = new IfcFaceBound(app.filedata.ifcLoops[args[0]], args[1] === '.T.');
    return faceBound;
}

parseIfcFace = function (line) {
    var bounds = line.replace('IFCFACE', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var result = [];
    for (var i = 0; i < bounds.length; i++) {
        result.push(app.filedata.ifcFaceBounds[bounds[i]]);
    }
    var face = new IfcFace(result);
    return face;
}

parseIfcSIUnit = function (line) {
    var args = line.replace('IFCSIUNIT', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var unit = new IfcSIUnit(args[0], args[1], args[2], args[3]);
    return unit;
}

parseIfcDimensionalExponents = function (line) {
    var args = line.replace('IFCDIMENSIONALEXPONENTS', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var dimensionalExponents = new IfcDimensionalExponents(args);
    return dimensionalExponents;
}

parseIfcDirection = function (line) {
    var args = line.replace('IFCDIRECTION', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var direction = new IfcDirection(args);
    return direction;
}

parseIfcAxis2Placement3D = function (line) {
    var args = line.replace('IFCAXIS2PLACEMENT3D', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var location = app.filedata.ifcCartesianPoints[args[0]];
    var axis = null;
    if (args[1] !== '$') {
        axis = app.filedata.ifcDirections[args[1]];
    }
    var refDirection = null;
    if (args[2] !== '$') {
        refDirection = app.filedata.ifcDirections[args[2]];
    }
    return new IfcAxis2Placement3D(location, axis, refDirection);
}

parseIfcAxis2Placement2D = function (line) {
    var args = line.replace('IFCAXIS2PLACEMENT2D', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var location = app.filedata.ifcCartesianPoints[args[0]];
    var refDirection = null;
    if (args[1] !== '$') {
        refDirection = app.filedata.ifcDirections[args[1]];
    }
    return new IfcAxis2Placement2D(location, refDirection);
}

parseIfcColourRGB = function (line) {
    var args = line.replace('IFCCOLOURRGB', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    return new IfcColourRGB(args[0], Number(args[1]), Number(args[2]), Number(args[3]));
}

parseIfcLocalPlacement = function (line) {
    var args = line.replace('IFCLOCALPLACEMENT', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var placementRelTo = null;
    if (args[0] !== '$') {
        placementRelTo = app.filedata.ifcLocalPlacements[args[0]];
    }
    var relPlacement = null;
    if (args[1] !== '$') {
        relPlacement = app.filedata.ifcPlacements[args[1]];
    }
    return new IfcLocalPlacement(placementRelTo, relPlacement);
}

parseIfcClosedShell = function (line) {
    var faces = line.replace('IFCCLOSEDSHELL', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var result = [];
    for (var i = 0; i < faces.length; i++) {
        result.push(app.filedata.ifcFaces[faces[i]]);
    }
    return new IfcClosedShell(result);
}

parseIfcOpenShell = function (line) {
    var faces = line.replace('IFCOPENSHELL', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var result = [];
    for (var i = 0; i < faces.length; i++) {
        result.push(app.filedata.ifcFaces[faces[i]]);
    }
    return new IfcOpenShell(result);
}

parseIfcFacetedBrep = function (line) {
    var closedShell = line.replace('IFCFACETEDBREP', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '');
    return new IfcFacetedBrep(app.filedata.ifcConnectedFaceSets[closedShell]);
}

parseIfcSurfaceStyleRendering = function (line) {
    var args = line.replace('IFCSURFACESTYLERENDERING', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    return new IfcSurfaceStyleRendering(app.filedata.ifcColors[args[0]], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
}

parseIfcSurfaceStyle = function (line) {
    var args = line.replace('IFCSURFACESTYLE', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var name = args[0];
    var side = args[1];
    var styles = [];
    for (var i = 2; i < args.length; i++) {
        styles.push(app.filedata.ifcSurfaceStyleRenderings[args[i]]);
    }
    return new IfcSurfaceStyle(name, side, styles);
}

parseIfcPresentationStyleAssignment = function (line) {
    var args = line.replace('IFCPRESENTATIONSTYLEASSIGNMENT', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var styles = [];
    for (var i = 0; i < args.length; i++) {
        styles.push(app.filedata.ifcSurfaceStyles[args[i]]);
    }
    return new IfcPresentationStyleAssignment(styles);
}

parseIfcStyledItem = function (line) {
    var args = line.replace('IFCSTYLEDITEM', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var item = null;
    if (args[0] !== '$') {
        item = app.filedata.ifcFacetedBreps[args[0]];
    }
    var name = args[args.length - 1];
    var styles = [];
    for (var i = 1; i < args.length - 1; i++) {
        styles.push(app.filedata.ifcPresentationStyleAssignments[args[i]]);
    }
    return new IfcStyledItem(item, styles, name);
}


parseIfcCartesianTransformationOperator3D = function(line){
    var args = line.replace('IFCCARTESIANTRANSFORMATIONOPERATOR3D', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var axis1 = app.filedata.ifcDirections[args[0]];
    var axis2 = app.filedata.ifcDirections[args[1]];
    var localOrigin = app.filedata.ifcCartesianPoints[args[2]];
    var scale = Number(args[3]);
    var axis3 = app.filedata.ifcDirections[args[4]];
    return new IfcCartesianTransformationOperator3D(axis1, axis2, localOrigin, scale, axis3);
}

parseIfcShapeRepresentation = function(line){
    var args = line.replace('IFCSHAPEREPRESENTATION', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var items = [];
    for (var i = 3; i < args.length; i++){
        items.push(args[i]);
    }
    return new IfcShapeRepresentation(null, args[1], args[2], items);
}


parseIfcRepresentationMap = function(line){
    var args = line.replace('IFCREPRESENTATIONMAP', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var mapOrigin = app.filedata.ifcPlacements[args[0]];
    var mapRepresentation = app.filedata.ifcRepresentations[args[1]];
    return new IfcRepresentationMap(mapOrigin, mapRepresentation);
}

parseIfcMappedItem = function(line){
    var args = line.replace('IFCMAPPEDITEM', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var mapSource = app.filedata.ifcRepresentationMaps[args[0]];
    var mapTarget = app.filedata.ifcCartesianTransformationOperators[args[1]];
    return new IfcMappedItem(mapSource, mapTarget);
}

parseIfcShellBasedSurfaceModel = function(line){
    var args = line.replace('IFCSHELLBASEDSURFACEMODEL', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var shells = [];

    for (var i = 0; i < args.length; i++){
        shells.push(app.filedata.ifcConnectedFaceSets[args[i]])
    }
    return new IfcShellBasedSurfaceModel(shells);
}

parseIfcPolyLine = function(line){
    var args = line.replace('IFCPOLYLINE', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var points = [];

    for (var i = 0; i < args.length; i++){
        points.push(app.filedata.ifcCartesianPoints[args[i]])
    }
    return new IfcPolyLine(points);
}

parseIfcCircle = function(line){
    var args = line.replace('IFCCIRCLE', '').replace(/\(/g, '').replace(/\)/g, '').replace(/;/g, '').split(',');
    var position = app.filedata.ifcPlacements[args[0]];
    var radius = Number(args[1]);
    return new IfcCircle(position, radius);
}