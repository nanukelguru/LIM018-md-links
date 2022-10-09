const {
  checkPathExists,
  convertToAbsolutePath,
  findLinks,
  throughOpenDirectory,
  getStatusLinks,
} = require("./md-links.js");

///const absolutePath = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md";

const mdLinks = (path, options) => {
  // console.log("valor de option", options);
  return new Promise((resolve, reject) => {
    if (!checkPathExists(path)) {
      reject("The path entered is not valid. Please enter a valid Path");
    }

    const absolutePath = convertToAbsolutePath(path);
    // console.log(absolutePath);
    const arrayFilesmd = throughOpenDirectory(absolutePath);
    //console.log(arrayFilesmd);
    const arrayFindLink = [];

    arrayFilesmd.forEach((path) => {
      arrayFindLink.push(findLinks(path));
      //console.log('sin inter', arrayFindLink);
    });

    if (options.validate === true) {
      resolve(getStatusLinks(arrayFindLink.flat()));
    }
    resolve(findLinks(path));
  });
};

// mdLinks(('../sampleFiles/samples/otherSamples/hola.md'), {validate: false})
//   .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//   console.log(error);
// });

// mdLinks("C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md", {validate:true})
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//     }
module.exports = mdLinks;
