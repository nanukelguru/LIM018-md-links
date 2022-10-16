// const mdLinks = require('../');
//const { mdLinks } = require("../src/index");
const { totalStats, uniqueStats, brokenStats } = require("../src/cli-options");

const {
  checkPathExists,
  convertToAbsolutePath,
  findLinks,
  getStatusLinks,
  // convertToAbsolutePath
} = require("../src/md-links");

const axios = require("axios");
jest.mock("axios");

const path = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md";
const pathTest =
  "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/samples/otherSamples/hola.md";
const wrongPath = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/index.md";
const absolutePath =
  "C:\\Angelica\\LABO3\\LIM018-md-links\\sampleFiles\\readme.md";
const relativePath = "./sampleFiles/readme.md";

const arrayTest = [
  {
    href: "https://curriculum.laboratoria.la/es/topics/javascript/04-arrays",
    text: "Arreglos",
    file: "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/samples/otherSamples/hola.md",
  },
];

const arrayTestFailed = [
  {
    href: "https://github/workshopper/learnyounode",
    text: "learnyounode",
    file: "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md",
  },
];

describe("checkPathExists", () => {
  it("should return True if a path exists", () => {
    expect(checkPathExists(path)).toBe(true);
  });
  it("should return False if a path does not exists", () => {
    expect(checkPathExists(wrongPath)).toBe(false);
  });
});

describe("convertToAbsolutePath", () => {
  it("should returns the absolute path if the path is absolute", () => {
    expect(convertToAbsolutePath(absolutePath));
  });
  it("should convert relative path to absolut path", () => {
    console.log(convertToAbsolutePath(relativePath));
    expect(convertToAbsolutePath(relativePath)).toBe(absolutePath);
  });
});

describe("findLinks", () => {
  it("should find links with extension .md in a file and return an array", () =>
    expect(findLinks(pathTest)).toEqual(arrayTest));
});

describe("getStatusLinks", () => {
  it("Should return the links in a file and shows: href, text, file, message and status", () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ statusText: "OK", status: 200 })
    );
    return getStatusLinks(arrayTest).then((response) =>
      expect(response).toStrictEqual([
        {
          href: "https://curriculum.laboratoria.la/es/topics/javascript/04-arrays",
          text: "Arreglos",
          file: "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/samples/otherSamples/hola.md",
          message: "OK",
          status: 200,
        },
      ])
    );
  });

  it("Should return an HTTP failed request and shows message: FAIL and Status: Failed", () => {
    axios.get.mockImplementation(() =>
      Promise.reject({ statusText: "FAIL", status: "Failed request" })
    );
    return getStatusLinks(arrayTestFailed).catch((response) =>
      expect(response).toEqual([
        {
          href: "https://github/workshopper/learnyounode",
          text: "learnyounode",
          file: "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md",
          message: "FAIL",
          status: "Failed request",
        },
      ])
    );
  });
});

describe('totalStats', () =>{
  it("should be a function", () =>{
    expect(typeof totalStats).toBe('function');
  });
  it('should show Total Links found in array', () =>{
      expect(totalStats(arrayTest)).toEqual(1);
  });
});

describe("uniqueStats", () => {
  it("should show Unique Links found in array", () =>
    expect(uniqueStats(arrayTest)).toEqual(1));
});

describe("brokenStats", () => {
  it("should show Broken Links found in array", () =>
    expect(brokenStats(arrayTest)).toStrictEqual(0));
});

// describe("md-Links", () => {
//   it('should return an array ')
// })
