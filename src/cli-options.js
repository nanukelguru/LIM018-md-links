const chalk = require('chalk');
const {mdLinks} = require('./index.js');

// const newArrayTest = [
//   {
//     href: "https://github/workshopper/learnyounode",
//     text: "learnyounode",
//     file: "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md",
//     status: "Failed request",
//     message: "FAIL",
//   },
//   {
//     href: "https://github.com/workshopper/how-to-npm",
//     text: "how-to-npm",
//     file: "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md",
//     status: 200,
//     message: "OK",
//   },
//   {
//     href: "https://github.com/stevekane/promise-it-wont-hurt",
//     text: "promise-it-wont-hurt",
//     file: "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md",
//     status: 200,
//     message: "OK",
//   },
// ];
// Total Stats
const totalStats = (arrayOfLinks) => {
  const totalLinks = arrayOfLinks.length;
  return totalLinks;
};
// console.log(totalStats(newArrayTest));

// Unique Stats
const uniqueStats = (arrayOfLinks) => {
  const uniqueLinks = [...new Set(arrayOfLinks.map((link) => {
    return link.href;
  }))];
  return uniqueLinks.length;
};
// console.log(uniqueStats(newArrayTest));

// Broken Stats
const brokenStats = (arrayOfLinks) => {
  // console.log('links rotos', arrayOfLinks);
  const arrayBrokenLinks = arrayOfLinks.filter(link => link.message ==='FAIL');
  return arrayBrokenLinks.length;
};
// console.log(brokenStats(newArrayTest));

module.exports = {
  totalStats,
  uniqueStats,
  brokenStats,
};
