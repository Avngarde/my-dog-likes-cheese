var fs = require('fs');

var JSONLogAllKeys = function(filepath) {
    var JSONContentReadyToParse = fs.readFileSync(filepath)
    var JSONParsedContent = JSON.parse(JSONContentReadyToParse);
    console.log(Object.keys(JSONParsedContent));
}

var JSONLogAllValues = function(filepath) {
    var JSONContentReadyToParse = fs.readFileSync(filepath);
    var JSONParsedContent = JSON.parse(JSONContentReadyToParse);
    console.log(Object.values(JSONParsedContent));
}

var JSONPushKey = function(filepath, keyname, nestedKey = null) {
    var JSONContentReadyToParse = fs.readFileSync(filepath);
    var JSONParsedContent = JSON.parse(JSONContentReadyToParse);
    JSONParsedContent[keyname] = {};
    var messageToPrint = "Key " + keyname + " has been added to " + filepath;

    if(nestedKey != null){
        delete JSONParsedContent[keyname];
        JSONParsedContent[nestedKey][keyname] = {};
        messageToPrint = "Nested Key " + keyname + " has been added to " + nestedKey + " in file " + filepath;
    }

    fs.writeFileSync(filepath, JSON.stringify(JSONParsedContent, null, 4), (err) => {
        if(err) console.error(err);
    });

    console.log(messageToPrint);
}

var JSONPushValue = function(filepath, value) {
    var JSONContentReadyToParse = fs.readFileSync(filepath);
    var JSONParsedContent = JSON.parse(JSONContentReadyToParse);

     fs.writeFileSync(filepath, JSON.stringify(JSONParsedContent, null, 4), (err) => {
        if(err) console.error(err);
    });
}

var JSONCreateDB = function(filename) {
    var fileContent = "{}";

    fs.writeFileSync(filename, fileContent, (err) => {
        if(err) throw err;

        console.log("Database " + filename + " has been created." );
    })
}

var JSONDeleteDB = function(filepath) {
    console.log("File " + filepath + " has been deleted.");
    fs.unlinkSync(filepath);
}

module.exports = {
    JSONLogAllKeys: JSONLogAllKeys,
    JSONLogAllValues: JSONLogAllValues,
    JSONPushKey: JSONPushKey,
    JSONPushValue: JSONPushValue,
    JSONCreateDB: JSONCreateDB,
    JSONDeleteDB: JSONDeleteDB
}