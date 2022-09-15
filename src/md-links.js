// Import the path module
const path = require("path");
// Import the fileSystem module
const fs = require("fs");

const route = "./README.md";
const absolutePathFile = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md";
const relativePathFile = "LIM018-md-links/sampleFiles/readme.md";
const absolutePathDirectory = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles";
const relativePathDirectory = "./sampleFiles/";

/*Function used to check if a path exists*/
const checkPathExists = (inputPath) =>  fs.existsSync(inputPath);
console.log(checkPathExists("C:/Angelica/LABO3/LIM018-md-links/src/index.js"));


/*Function checked if the path is absolute*/
const checkPathIsAbsolute = (inputPath) => path.isAbsolute(inputPath);
console.log(checkPathIsAbsolute(absolutePathFile))

/*Function that verifies if the path is absolut and converts the path  to absolut*/
 const convertToAbsolutePath = (inputPath) => {
   if (path.isAbsolute(inputPath)){
    console.log('The path is absolute, this is the path:')
     return inputPath;
  }else{
    console.log('The route is relative, the absolute route is:')
    return path.resolve(inputPath);
  }
};
console.log(convertToAbsolutePath("LIM018-md-links/sampleFiles/readme.md"));

//method used to synchronously check if a file already exists
const fileExists = fs.existsSync(route);
console.log(fileExists);

//method used to get the extension from a file path:
const getExtensionFile = (inputPath) => path.extname(inputPath);
console.log(getExtensionFile(route));
// const readFile = (inputPath) => fs.readFileSync(inputPath, "utf-8");

 module.exports = {
  checkPathExists,
  convertToAbsolutePath,
 }
