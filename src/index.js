const chalk = require("chalk");

const {
  checkPathExists,
  convertToAbsolutePath,
  findLinks,
  throughDirectory,
  getStatusLinks,
} = require("./md-links.js");

const file = "../sampleFiles/file.txt";
const route = "./REAME.md";
const absolutePath = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md";
const relativePath = "LIM018-md-links/sampleFiles/readme.md";
const absolutePathDirectory = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles";

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (checkPathExists(path) === false) {
      reject("la ruta ingresada no es valida");
    }
    const absolutePath = convertToAbsolutePath(path);
    console.log(absolutePath);
    const filesOfDirectory = throughDirectory(absolutePath);
    filesOfDirectory.forEach((path) => {
      if (options.validate === true) {
        resolve(getStatusLinks(findLinks(path)))
       
      }
       resolve(findLinks(path));
    });
  });
};



mdLinks("C:/Angelica/LABO3/LIM018-md-links/sampleFiles", {validate:false})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
//console.log(totalStats(absolutePath));
// if(checkPathExists(absolutePath(path))==='.md'){
//   mdLinks.findLinks
// const absPath = convertToAbsolutPath(absPath);
// const arrayOfFiles =
// })
//   }

//  console.log(mdLinks(route))

// mdLinks(absolutePath, { validate: false })
//     .then(response => {
//         console.log(response);
//     })
//     .catch(error => {
//         console.log(error);
//     });
//     module.exports = {
//       mdLinks
//     }
// mdLinks('../sampleFiles'), {validate:true}.then(console.log).catch(console.error)
