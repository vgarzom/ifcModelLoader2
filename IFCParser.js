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
                if(parsingHeader){
                    index = this.parseHeaderFileName(lines, index);
                }
                continue;
        }
    }
    return true;
}

IFCDoc.prototype.parseHeaderFileName = function(lines, index) {
    var line = removeCommentsOnLine(lines[index-1]);
    var filename = "";
    var endFilename = false;
    while (!endFilename) {
        filename += line.trim();
        endFilename = line.endsWith(');');
        line = removeCommentsOnLine(lines[index++]);
    }
    filename = filename.replace('FILE_NAME(','').replace(');','');
    var filename_data = filename.split(',');
    this.name = filename_data[0].replace(/'/g,'');
    this.time_stamp = filename_data[1].replace(/'/g,'');
    this.author = filename_data[2].replace(/'/g,'');
    this.organization = filename_data[3].replace(/'/g,'');
    this.preprocessor_version = filename_data[4].replace(/'/g,'');
    this.originating_system = filename_data[5].replace(/'/g,'');
    this.authorization = filename_data[6].replace(/'/g,'');
    console.log(this);
    return index;
}
