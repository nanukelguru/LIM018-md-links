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

mdLinks(pathArg, { stats: isStats, validate: isValidate })
  .then((arrayLinks) => {
    if (isValidate && isStats) {
      console.log(`
     ★ STATS && VALIDATE★
      Total Links : ${chalk.blueBright(totalStats(arrayLinks))};
      Unique Links: ${chalk.blue(uniqueStats(arrayLinks))};
      Broken Links: ${chalk.cyan(brokenStats(arrayLinks))};
    `);
    } else if (isStats && !isValidate) {
      console.log(`
     ★ STATS ★
      Total Links   : ${chalk.blueBright(totalStats(arrayLinks))};
      Unique Links  : ${chalk.blue(uniqueStats(arrayLinks))}  
    `);
    } else {
      arrayLinks.forEach((link) => {
        if (!isStats && !isValidate) {
          console.log(`
          ❀  LINKS FOUND ❀  
          Href : ${chalk.yellow(link.href)};
          Text : ${chalk.magenta(link.text)};
          File : ${chalk.blue(link.file)};`);
        } else {
          console.log(`
       ✿  STATUS LINKS FOUND ✿
     ${chalk.blueBright(link.file)} 
     ${chalk.magentaBright(link.text)}
     ${chalk.cyan(link.href)} 
     ${
       link.message === "OK"
         ? chalk.whiteBright(link.message)
         : chalk.yellow(link.message)
     } 
     ${link.status}`);
        }
      });
    }
  })
  .catch((e) => console.log(chalk.red(" ● "), chalk.red.italic(e.message)));
