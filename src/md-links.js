// Import the path module
const path = require("path");
// Import the fileSystem module
const fs = require('fs');

const axios = require('axios'); 

// const file = '../sampleFiles/file.txt';
const route = "./README.md";
const absolutePath = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md";
// const relativePath = "LIM018-md-links/sampleFiles/readme.md";
// const absolutePathDirectory = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles";
// const relativePathDirectory = "./sampleFiles/";

/*Function used to check if a path exists*/
const checkPathExists = (inputPath) => fs.existsSync(inputPath); //return true or false

/*Function checked if the path is absolute*/
const checkPathIsAbsolute = (inputPath) => path.isAbsolute(inputPath);

/*Function that verifies if the path is absolut and converts the path  to absolut*/
const convertToAbsolutePath = (inputPath) => {
  if (path.isAbsolute(inputPath)) {
    return inputPath;
  } else {
    return path.resolve(inputPath);
  }
};

/*Function that verifies if the path is a directory*/
 const checkDirectoryExists = (inputPath) => fs.statSync(inputPath).isDirectory();
//  console.log(checkDirectoryExists(absolutePath))
 
//Read the content of a directory
const readDirectory = (inputPath) => fs.readdirSync(inputPath);

/*Function for read a file*/
const readFile = (route) => fs.readFileSync(route, "utf-8");

//method used for obtain the extension of a file
const fileExtension = (inputPath) => path.extname(inputPath)=== 'md';

  // Función para 
const readFileMd = (route) => fileExtension(route) === ".md" ? fs.readFileSync(route, "utf-8") : "No se encontraron archivos con extensión .md";
// console.log(readFileMd("/sampleFiles/samples/otherSamples", 'utf8'));

/* Function to filter array and return array with only .md files */
// const filterFilesmd = (arrayOfLinks) => arrayOfLinks.filter(file => path.extname(file) == ".md");
// console.log(filterFilesmd('C:/Angelica/LABO3/LIM018-md-links/sampleFiles/'));

/*Recursive function to read a directory */
const throughOpenDirectory = (inputPath) => {
  let files = [];
  if(!checkDirectoryExists(inputPath)){
    return files.concat(inputPath);
  }
  readDirectory(inputPath).forEach((file) => {
    const fullPath = path.join(inputPath, file);
    if (checkDirectoryExists(fullPath)) {
        const fileFolder = throughOpenDirectory(fullPath);
        files = files.concat(fileFolder);
      }
         else if(fileExtension(fullPath) === '.md') {
        files.push(fullPath);
         }
    });
    //console.log(files);
    return files;
  };
  

  //console.log(throughOpenDirectory('C:/Angelica/LABO3/LIM018-md-links/sampleFiles/'));



/*Function to obtain links in array*/
const findLinks = (route) => {
  const regExp = /(\[(.*?)\])?\(http(.*?)\)/gm;
  const arrayOfLinks = [];

  const linksInFile = readFile(route).match(regExp);
  if (linksInFile === null) {
    return [];
  }
  linksInFile.forEach((element) => {
    const parentheses = /\(([^)]+)\)/; // return a string that appear between parentheses
    const httpLink = parentheses.exec(element);
    const href = httpLink[1];
    const text = element.slice(1, element.indexOf("]"));
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

const getStatusLinks = (pathLinks) => {
  const array = pathLinks.map((element) => {
    const axiosPromise = axios.get(element.href)
    .then((result) => {
      const statusCode = result.status;
       const msg = result.status >= 200 && result.status <= 299 ? result.statusText : "FAIL";
       return {
        ... element,
         status: statusCode,
         message : msg
       };
    })
    .catch(() => {
      return {
        ...element,
        status:'Failed request',
        message : 'FAIL'
      };
    });
    return axiosPromise;
  });
  return Promise.all(array);
};
// console.log(getStatusLinks("./README.md"));
// getStatusLinks(findLinks("C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md")).then((result) => {
//     console.log(result);
//   });

module.exports = {
  checkPathExists,
  checkPathIsAbsolute,
  convertToAbsolutePath,
  findLinks,
  getStatusLinks,
  throughOpenDirectory,
  readFileMd,
};