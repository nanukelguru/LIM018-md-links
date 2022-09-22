// Import the path module
const path = require("path");
// Import the fileSystem module
const fs = require('fs');


const route = "./README.md";
const absolutePath = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md";
const relativePath = "LIM018-md-links/sampleFiles/readme.md";
const absolutePathDirectory = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles";
// const relativePathDirectory = "./sampleFiles/";

/*Function used to check if a path exists*/
const checkPathExists = (inputPath) => fs.existsSync(inputPath);
console.log("1.The path exists returns", checkPathExists(absolutePath));

//method used to synchronously check if a file already exists
const fileExists = fs.existsSync(route);
console.log("2.The file exists returns", fileExists);

/*Function checked if the path is absolute*/
const checkPathIsAbsolute = (inputPath) => path.isAbsolute(inputPath);
console.log(
  "3.The path is absolute returns",
  checkPathIsAbsolute(absolutePath)
);

/*Function that verifies if the path is absolut and converts the path  to absolut*/
const convertToAbsolutePath = (inputPath) => {
  if (path.isAbsolute(inputPath)) {
    console.log("4.The path is absolute, this is the path:");
    return inputPath;
  } else {
    console.log("4.The route is relative, the absolute route is:");
    return path.resolve(inputPath);
  }
};
console.log(convertToAbsolutePath(relativePath));

/*Function that verifies if the path is a directory*/
const checkDirectoryExists = (inputPath) => fs.statSync(inputPath);
console.log(checkDirectoryExists("C:/Angelica/LABO3/LIM018-md-links/sampleFiles"));
// Getting information for a directory
//https://www.geeksforgeeks.org/node-js-fs-statsync-method/


//method used for obtain the extension of a file
const fileExtension = (inputPath) => path.extname(inputPath);
console.log("The extension of the file is :", fileExtension(route));
//fileExtension(route)

//method used to get a list of the names of all content present in a directory
fs.readdir(absolutePathDirectory, (err, files) => {
  files.forEach((file) => {
    console.log("The file contains this:", file);
  });
});

/*Function for read a file*/
const readFile = (route) => fs.readFileSync(route, "utf-8");
/*Function to obtain links in array*/
const findLinks = (route) => {
  const regExp = /(\[(.*?)\])?\(http(.*?)\)/gm;
  const arrayOfLinks = [];

  const linksInFile = readFile(route).match(regExp);
  if (linksInFile === null) {
    return [];
  }
  linksInFile.forEach((elem) => {
    // return a string that appear between parentheses
    const parentheses = /\(([^)]+)\)/;
    const httpLink = parentheses.exec(elem);
    const href = httpLink[1];
    const text = elem.slice(1, elem.indexOf("]"));
    const outPutText = text.length > 50 ? text.slice(0, 50) : text;
    const file = route;
    const link = {
      href,
      text: outPutText,
      file,
    };
    arrayOfLinks.push(link);
  });
  return arrayOfLinks;
};

console.log(findLinks(absolutePath));

module.exports = {
  findLinks,
  checkPathExists,
  convertToAbsolutePath,
};
