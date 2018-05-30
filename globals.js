
// globals

// Enums
var X = 0, Y = 1, Z = 2, H = 3, P = 4;
var keyCodes = {
    a: 65,
    w: 87,
    s: 83,
    d: 68
}

var s = 10; //escala
// Enums para el tipo de cámara seleccionada
var FIRST = 0, THIRD = 1, LONGSHOT = 2;
// gl context
var gl;
// the canvas we're working with
var canvas;
// application var holder
var app = {};
app.dayTime = 0.0;
app.shaderProgram = {};
app.programInfo = {};
app.buffers = {};
app.texture = {};
app.modelViewMatrix = mat4.create();
app.projectionMatrix = mat4.create();
app.normalMatrix = mat4.create();
app.mvMatrixStack = [];
app.fieldOfView = 45 * Math.PI / 180;
app.zNear = 0.1;
app.zFar = 100.0;
app.deltaTime = 0;
app.then = 0;
app.walkspeed = 0.1;

app.sliders = {};

app.positions = {
    x: 0.0,
    z: -5.0
};

app.camera = {
    x: 2 * Math.PI * 30 / 180,
    y: 0,
    z: 0
};

app.truck = {
    x: 0,
    y: 0,
    z: 0,
    speed: 0.05
}
app.ismousedown = false;
app.mousedown = {
    x: 0,
    y: 0
}

app.lights = {
    directionalLight: {
        color: [1, 1, 1, 1],
        direction: [0.0, 0.0, 1.0],
        intensity: 1.0
    },
    //ambientLight: [0.0, 0.1, 0.5]
    ambientLight: [0.0, 0.1, 0.5],
    pointLights: [],
    spotLights: []
}

app.times = 0;
//función para dibujar la escena

app.drawScene;

app.ifcFile = {};
app.drawingInfo = {};
app.loadComplete = false;

app.vertexCount = 0;

app.filedata = {
    'ifcCartesianPoints': {},
    'ifcLoops': {},
    'ifcFaceBounds': {},
    'ifcFaces': {},
    'ifcUnits': {},
    'ifcDimensionalExponents': {},
    'ifcDirections': {},
    'ifcPlacements': {},
    'ifcLocalPlacements': {},
    'ifcColors': {},
    'ifcConnectedFaceSets': {},
    'ifcFacetedBreps': {},
    'ifcSurfaceStyleRenderings': {},
    'ifcSurfaceStyles': {},
    'ifcPresentationStyleAssignments': {},
    'ifcStyledItems': {},
    'ifcCartesianTransformationOperators': {},
    'ifcRepresentations': {},
    'ifcRepresentationItems': {},
    'ifcRepresentationMaps': {},
    'ifcMappedItems': {},
};

app.left_index = 0;
app.left_tags = {};

app.vertexmapper = {};
app.vertex = [];
app.ifcFacetedBrepsDraw = {
    "indices": [],
    "normals": [],
    "total_vertex": 0
};
