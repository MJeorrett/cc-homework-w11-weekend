var fs = require('fs');

loadFile = function( filename ) {
  // console.log("filename:", filename);
  // fs.readdir("./", (err, files) => {
  //   files.forEach(file => {
  //     console.log(file);
  //   });
  // });
  var buffer = fs.readFileSync( filename );
  var bufferString = undefined;

  if ( buffer === undefined ) {
    console.log( "FileLoader: Error could not load file", filename );
  }
  else {
    var bufferString = buffer.toString();
    bufferString = bufferString.trim();
  }

  return bufferString;
};

module.exports = loadFile;
