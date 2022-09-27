// Import the path module
const path = require("path");
// Import the fileSystem module
const fs = require('fs');

const axios = require('axios'); 

const file = '../sampleFiles/file.txt'
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
console.log("3.The path is absolute returns", checkPathIsAbsolute(absolutePath));

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
 const checkDirectoryExists = (inputPath) => fs.statSync(inputPath).isDirectory();
 console.log(checkDirectoryExists(absolutePath))
 
//Read the content of a directory
const readDirectory = (inputPath) => fs.readdirSync(inputPath)

//method used for obtain the extension of a file
const fileExtension = (inputPath) => path.extname(inputPath);
console.log("The extension of the file is :", fileExtension(file));

//
const throughDirectory = (inputPath) => {
  let files = [];
  readDirectory(inputPath).forEach((file) => {
    const absolute = path.join(inputPath, file);
    if (checkDirectoryExists(absolute)) {
        const fileFolder = throughDirectory(absolute)
        files = files.concat(fileFolder)
      }
         else if(fileExtension(absolute) === '.md') {
        files.push(absolute)
         }
    })
    return files
  }

//  console.log(throughDirectory('C:/Angelica/LABO3/LIM018-md-links/sampleFiles'));

/*Function for read a file*/
const readFile = (route) => fs.readFileSync(route, "utf-8");


/* Function to filter array and return array with only .md files */
//  const filterFilesmd = (array) => array.filter(file => path.extname(file) == ".md");
//  console.log('este es el filtro', filterFilesmd());


/*Function to obtain links in array*/
const findLinks = (route) => {
  const regExp = /(\[(.*?)\])?\(http(.*?)\)/gm;
  const arrayOfLinks = [];

  const linksInFile = readFile(route).match(regExp);
  if (linksInFile === null) {
    return [];
  }
  linksInFile.forEach((element) => {
    // return a string that appear between parentheses
    const parentheses = /\(([^)]+)\)/;
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

// console.log(findLinks(absolutePath));


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
      }
    })
    return axiosPromise;
  })
  return Promise.all(array);
}
// console.log(getStatusLinks("./README.md"));
// getStatusLinks(findLinks("C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md")).then((result) => {
//     console.log(result);
//   })

// const linksStats = (pathLinks) =>{
//   const 
// }

module.exports = {
  findLinks,
  checkPathExists,
  convertToAbsolutePath,
  getStatusLinks,
  throughDirectory
};