const {
  checkPathExists,
  convertToAbsolutePath,
  findLinksmd,
  throughOpenDirectory,
  getStatusLinks,
} = require("./md-links.js");

const absolutePath = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md";

const mdLinks = (path, options) => {
  // console.log("valor de option", options);
  return new Promise((resolve, reject) => {
    if (!checkPathExists(path)) {
      reject("The path entered is not valid. Please enter a valid Path");
    }
    const absolutePath = convertToAbsolutePath(path);
    // console.log(absolutePath);
    const arrayFilesmd = throughOpenDirectory(absolutePath);
    // console.log(arrayFilesmd);

    arrayFilesmd.forEach((path) => {
      if (options.validate === true) {
        resolve(getStatusLinks(findLinksmd(path)));
      }
      resolve(findLinksmd(path));
    });
  });
};

// mdLinks("C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md", {
//   validate: false,
// })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// mdLinks("C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md", {validate:true})
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//     }
module.exports = mdLinks;
