// IFC Root Schema
var IfcRoot = function (id, ownerHistory, name, description) {
    this.globalID = id;
    this.ownerHistory = ownerHistory; //IfcOwnerHistory
    this.name = name;
    this.description = description;
}

var IfcOwnerHistory = function (owningUser, owningApplication, state, changeAction, lastModfiedDate, lastModifyingUser, lastModifyingApplication, creationDate) {
    this.owningUser = owningUser; //IfcPersonAndOrganization
    this.owningApplication = owningApplication;
    this.state = state;
    this.changeAction = changeAction;
    this.lastModfiedDate = lastModfiedDate;
    this.lastModifyingUser = lastModifyingUser;
    this.lastModifyingApplication = lastModifyingApplication;
    this.creationDate = creationDate;
}

var IfcPersonAndOrganization = function (person, organization, roles) {
    this.person = person; //IfcPerson
    this.organization = organization; //IfcOrganization
    this.roles = roles; //IfcActorRole
}

var IfcPerson = function (identification, familyName, givenName, middleNames, prefixTitles, suffixTitles, roles, addresses, engagedIn) {
    this.identification = identification; //IfcIdentifier
    this.familyName = familyName; //IfcLabel
    this.givenName = givenName; //IfcLabel
    this.middleNames = middleNames; //IfcLabel
    this.prefixTitles = prefixTitles; //IfcLabel
    this.suffixTitles = suffixTitles; //IfcLabel
    this.roles = roles; //IfcActorROle
    this.addresses = addresses; //IfcAddress
    this.engagedIn = engagedIn; //IfcPersonAndOrganization: Inverse relationships in which ifcPerson is engaged
}

var IfcOrganization = function (identification, name, description, roles, addresses, isRelatedBy, relates, engages) {
    this.identification = identification; //IfcIdentifier
    this.name = name; //IfcLabel
    this.description = description; //IfcText
    this.roles = roles; //IfcActorROle
    this.addresses = addresses; //IfcAddress
    this.isRelatedBy = isRelatedBy;
    this.relates = relates;
    this.engages = engages; //IfcPersonAndOrganization: Inverse relationships in which ifcPersonAndOrganization is engaged
}

var IfcActorRole = function (role, userDefindeRole, description) {
    this.role = role; //IfcRoleEnum
    this.userDefindeRole = userDefindeRole; //IfcLabel
    this.description = description; //IfcText
}

var IfcApplication = function (appDeveloper, version, appFullName, appIdentifier) {
    this.applicationDeveloper = appDeveloper; //IfcOrganization
    this.version = version; //IfcLabel
    this.applicationFullName = appFullName; //IfcLabel
    this.applicationIdentifier = appIdentifier; //IfcIdentifier
}

// IFC Objects Schema

var IfcObject = function (id, ownerHistory, name, description, objectType) {
    IfcRoot.call(this, id, ownerHistory, name, description);
    this.objectType = objectType;
}

var IfcActor = function (id, ownerHistory, name, description, objectType, theActor) {
    IfcObject.call(this, id, ownerHistory, name, description, objectType);
    this.theActor = theActor;
}

var IfcControl = function (id, ownerHistory, name, description, objectType, identification) {
    IfcObject.call(this, id, ownerHistory, name, description, objectType);
    this.identification = identification;
}

var IfcGroup = function (id, ownerHistory, name, description, objectType) {
    IfcObject.call(this, id, ownerHistory, name, description, objectType);
}

var IfcProcess = function (id, ownerHistory, name, description, objectType, identification, longDescription) {
    IfcObject.call(this, id, ownerHistory, name, description, objectType);
    this.identification = identification;
    this.longDescription = longDescription;
}

var IfcResource = function (id, ownerHistory, name, description, objectType, identification, longDescription) {
    IfcObject.call(this, id, ownerHistory, name, description, objectType);
    this.identification = identification;
    this.longDescription = longDescription;
}

// IFC Product Schema

var IfcProduct = function (id, ownerHistory, name, description, objectType, objectPlacement, representation) {
    IfcObject.call(this, id, ownerHistory, name, description, objectType);
    this.objectPlacement = objectPlacement; //IfcObjectPlacement
    this.representation = representation; //IfcProductRepresentation
}

var IfcObjectPlacement = function () {

}

var IfcLocalPlacement = function (placementRelTo, relativePlacement) {
    IfcObjectPlacement.call(this);
    this.placementRelTo = placementRelTo;
    this.relativePlacement = relativePlacement;
}

var IfcGridPlacement = function (placementLocation, placementRefDirection) {
    IfcObjectPlacement.call(this);
    this.placementLocation = placementLocation;
    this.placementRefDirection = placementRefDirection;
}

var IfcProductRepresentation = function (name, description, representations) {
    this.name = name;
    this.description = description;
    this.representations = representations; //IfcRepresentation
}

var IfcRepresentation = function (contextOfItems, representationIdentifier, representationType, items) {
    this.contextOfItems = contextOfItems; //IFCRepresentationContext
    this.representationIdentifier = representationIdentifier;
    this.representationType = representationType;
    this.items = items; //IFCRepresentationItem[]
}

var IfcRepresentationContext = function (contextIdentifier, contextType) {
    this.contextIdentifier = contextIdentifier;
    this.contextType = contextType;
}

var IfcRepresentationMap = function (mapOrigin, mapRepresentation) {
    this.mappingOrigin = mapOrigin;
    this.mappingRepresentation = mapRepresentation;
}

var IfcRepresentationItem = function () {

}

var IfcShapeRepresentation = function (contextOfItems, representationIdentifier, representationType, items) {
    IfcRepresentation.call(this, contextOfItems, representationIdentifier, representationType, items);
}

//Representation Items
var IfcGeometricRepresentationItem = function () {
    IfcRepresentationItem.call(this);
}

var IfcShellBasedSurfaceModel = function (shells) {
    IfcGeometricRepresentationItem.call(this);
    this.sbsmBoundaries = shells;
}

var IfcTopologicalRepresentationItem = function () {
    IfcRepresentationItem.call(this);
}

var IfcStyledRepresentationItem = function (item, styles, name) {
    IfcRepresentationItem.call(this);
    this.item = item;
    this.styles = styles;
    this.name = name;
}

var IfcStyledItem = function (item, styles, name) {
    this.item = item;
    this.styles = styles;
    this.name = name;
}

var IfcMappedRepresentationItem = function (mappingSource, mappingTarget) {
    IfcRepresentationItem.call(this);
    this.mappingSource = mappingSource;
    this.mappingTarget = mappingTarget; //IfcCartesianTransformationOperator
}

var IfcCartesianTransformationOperator = function (axis1, axis2, localOrigin, scale) {
    this.axis1 = axis1; //IfcDirection
    this.axis2 = axis2; //IfcDirection
    this.localOrigin = localOrigin; //IfcCartesianPoint
    this.scale = scale; // Real Number
}

var IfcCartesianTransformationOperator2D = function (axis1, axis2, localOrigin, scale) {
    IfcCartesianTransformationOperator.call(axis1, axis2, localOrigin, scale);
}

var IfcCartesianTransformationOperator3D = function (axis1, axis2, localOrigin, scale, axis3) {
    IfcCartesianTransformationOperator.call(axis1, axis2, localOrigin, scale);
    this.axis1 = axis1; //IfcDirection
    this.axis2 = axis2; //IfcDirection
    this.localOrigin = localOrigin; //IfcCartesianPoint
    this.scale = scale; // Real Number
    this.axis3 = axis3;
}

var IfcMappedItem = function (mappingSource, mappingTarget) {
    this.mappingSource = mappingSource;
    this.mappingTarget = mappingTarget;
}

var IfcDirection = function (directionRatios) {
    var ratios = [];
    for (var i = 0; i < directionRatios.length; i++) {
        ratios.push(Number(directionRatios[i]));
    }
    this.directionRatios = ratios; //Real Number []
}


// Geometric representations
var IfcPoint = function () {
}

var IfcCartesianPoint = function (coordinates) {
    IfcPoint.call(this);
    if (coordinates.length > 0) {
        this.x = Number(coordinates[0]);
    }
    if (coordinates.length > 1) {
        this.y = Number(coordinates[1]);
    }
    if (coordinates.length > 2) {
        this.z = Number(coordinates[2]);
    }
}

var IfcPointOnCurve = function (basisCurve, pointParameter) {
    IfcPoint.call(this);
    this.basisCurve = basisCurve; //IFCCurve
    this.pointParameter = this.pointParameter; //IfcPointParameter
}

var IfcPointOnSurface = function (basisSurface, pointParameterU, pointParameterV) {
    IfcPoint.call(this);
    this.basisSurface = basisSurface; //IfcSurface
    this.pointParameterU = this.pointParameterU; //IfcPointParameter
    this.pointParameterV = this.pointParameterV; //IfcPointParameter
}
// -----------------------------------------------------------------------
var IfcCurve = function () {
    IfcGeometricRepresentationItem.call(this);
}

var IfcBoundedCurve = function () {
    IfcCurve.call(this);
}

var IfcConic = function (position) {
    IfcCurve.call(this);
    this.position = position;
}

var IfcPolyLine = function (points) {
    IfcBoundedCurve.call(this);
    this.points = points;
}

var IfcCircle = function (position, radius) {
    IfcConic.call(this, position);
    this.radius = radius;
}



var IfcSurface = function () {

}

var IfcSolidModel = function () {

}
// -----------------------------------------------------------------------
var IfcTessellatedItem = function () {

}
var IfcIndexedPolygonalFace = function (coordIndex) {
    IfcTessellatedItem.call(this);
    this.coordIndex = coordIndex; //IfcPositiveInteger[3:?]
}
var IfcIndexedPolygonalFaceWithVoids = function (coordIndex, innerCoordIndices) {
    IfcIndexedPolygonalFace.call(this);
    this.innerCoordIndices = innerCoordIndices; //IfcPositiveInteger [1:?][3:?]
}
var IfcTessellatedFaceSet = function (coordinates) {
    IfcTessellatedItem.call(this);
    this.coordinates = coordinates; //IfcCartesianPointList3D
}

var IfcPolygonalFaceSet = function (coordinates, closed, faces, pnIndex) {
    IfcTessellatedFaceSet.call(this, coordinates);
    this.closed = closed; //IfcBoolean
    this.faces = faces; //IfcIndexedPolygonalFace [1:?]
    this.pnIndex = pnIndex; //IfcPositiveInteger [1:?]
}

var IfcTriangulatedFaceSet = function (coordinates, normals, closed, coordIndex, pnIndex) {
    IfcTessellatedFaceSet.call(this, coordinates);
    this.normals = normals;
    this.closed = closed;
    this.coordIntex = coordIndex;
    this.pnIndex = pnIndex;
}

var IfcCartesianPointList3D = function (coordList) {
    this.coordList = coordList;
}
// -----------------------------------------------------------------------
var IfcLightSource = function () {

}

var IfcGeometricSet = function () {

}

//Topological representations

var IfcVertex = function () {

}

var IfcEdge = function () {

}

var IfcLoop = function () {

}

var IfcPolyLoop = function (polygon) {
    this.polygon = polygon;
}

var IfcPath = function () {

}

var IfcFaceBound = function (bound, orientation) {
    this.bound = bound;
    this.orientation = orientation;
}

var IfcFace = function (bounds) {
    this.bounds = bounds;
}
var IfcConnectedFaceSet = function (faces) {
    this.faces = faces;
}

var IfcClosedShell = function (faces) {
    IfcConnectedFaceSet.call(this, faces);
}

var IfcOpenShell = function (faces) {
    IfcConnectedFaceSet.call(this, faces);
}

var IfcManifoldSolidBrep = function (outer) {
    this.outer = outer;
}

var IfcFacetedBrep = function (outer) {
    IfcManifoldSolidBrep.call(this, outer);
}


var IfcColourRGB = function (name, r, g, b) {
    this.name = name;
    this.r = r;
    this.g = g;
    this.b = b;
}

var IfcSurfaceStyleShading = function (surfaceColor, transparency) {
    this.surfaceColor = surfaceColor;
    this.transparency = transparency;
}

var IfcSurfaceStyleRendering = function (surfaceColor,
    transparency,
    diffuseColour,
    transmissionColour,
    diffuseTransmissionColour,
    reflectionColour,
    specularColour,
    specularHighlight,
    reflectanceMethod) {

    IfcSurfaceStyleShading.call(this, surfaceColor, transparency);
    this.diffuseColour = diffuseColour;
    this.transmissionColour = transmissionColour;
    this.diffuseTransmissionColour = diffuseTransmissionColour;
    this.reflectionColour = reflectionColour;
    this.specularColour = specularColour;
    this.specularHighlight = specularHighlight;
    this.reflectanceMethod = reflectanceMethod;
}

var IfcPresentationStyle = function (name) {
    this.name = name;
}
var IfcSurfaceStyle = function (name, side, styles) {
    IfcPresentationStyle.call(this, name);
    this.side = side;
    this.styles = styles;
}

var IfcPresentationStyleAssignment = function (styles) {
    this.styles = styles;
}

// -------------------- Units
var IfcNamedUnit = function (dimensions, unitType) {
    this.dimensions = dimensions;
    this.unitType = unitType;
}

var IfcSIUnit = function (dimensions, unitType, prefix, name) {
    IfcNamedUnit.call(this, dimensions, unitType);
    this.prefix = prefix;
    this.name = name;
}

var IfcDimensionalExponents = function (args) {
    this.lengthExponent = Number(args[0]);
    this.massExponent = Number(args[1]);
    this.timeExponent = Number(args[2]);
    this.electricCurrentExponent = Number(args[3]);
    this.thermodynamicTemperatureExponent = Number(args[4]);
    this.amountOfSubstanceExponent = Number(args[5]);
    this.luminousIntensityExponent = Number(args[6]);
}


//----------------------------------Placements
var IfcPlacement = function (location) {
    this.location = location;
}

var IfcAxis2Placement3D = function (location, axis, refDirection) {
    IfcPlacement.call(this, location);
    this.axis = axis;
    this.refDirection = refDirection;
}

var IfcAxis2Placement2D = function (location, refDirection) {
    IfcPlacement.call(this, location);
    this.refDirection = refDirection;
}

var CartesianPoint3D = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

var CartesianPoint3DList = function (index, list) {
    this.index = index;
    this.cartesianPoints = list;
}

var TriangulatedFaceSet = function (index, vertexIndex, indices) {
    this.index = index;
    this.vertexIndex = vertexIndex;
    this.indices = indices;
}

var DrawingInfo = function (vertices, normals, colors, indices, textures, vertexCount) {
    this.vertices = vertices;
    this.normals = normals;
    this.colors = colors;
    this.indices = indices;
    this.textures = textures;
    this.vertexCount = vertexCount;
}

function getPrototypeName(obj) {
    return Object.getPrototypeOf(obj).constructor.name;
}
