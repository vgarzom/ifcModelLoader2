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
