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
        result.push(app.filedata.ifcCartesianPoints[coords[i]]);
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