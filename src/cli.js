#!/usr/bin/env node
//const mdLinks = require('../src/md-links.js')
// const arg = process.argv;
// console.log(`hola ${arg}`);

const chalk = require("chalk");
// console.log(chalk.magenta("Hello world!"));

const mdLinks = require("./index.js");
const { totalStats, uniqueStats, brokenStats } = require("./cli-options.js");

// arg[0] node route
// arg[1] md-links route
// arg[2] file route
// arg[3] options --validate or --stats
const args = process.argv;
const pathArg = args.filter((x) => !["--stats", "--validate"].includes(x))[2];
const isValidate = args.includes("--validate");
const isStats = args.includes("--stats");

// if (pathArg === undefined) {
//   // console.log(chalk.cyan.italic(" Please enter the route"));
//   // console.log(chalk.cyan.italic("* Please enter help for more advice *"));
// }

// mdLinks(pathArg, { validate: isValidate })
//   .then((links) =>
//     links.forEach((link) =>
//       console.log(`
//     ** LINKS FOUND **
//     ${chalk.yellow(link.file)}
//     ${chalk.blue(link.text)}
//     ${chalk.cyan(link.href)}
//     `)
//     )
//   )
//   .catch((e) => console.log(chalk.bgRed(" * "), chalk.red.italic(e.message)));

mdLinks(pathArg, { stats: isStats, validate: isValidate })
  .then((arrayLinks) => {
    arrayLinks.forEach((link) => {
      console.log(`
 ❀  STATUS LINKS FOUND ❀  
  ${chalk.blueBright(link.file)} 
  ${chalk.magentaBright(link.text)}
  ${chalk.cyan(link.href)} 
  ${link.message === "OK" ? link.message : chalk.yellow(link.message)} ${
        link.status
      }`);
    });
  })
  .catch((e) => console.log(chalk.bgRed(" * "), chalk.red.italic(e.message)));
