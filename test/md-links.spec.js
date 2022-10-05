// const mdLinks = require('../');
const {
  checkPathExists,
  convertToAbsolutePath,
  findLinksmd,
  // convertToAbsolutePath
} = require("../src/md-links");

const axios = require("axios");
jest.mock("axios");

const path = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md";
const wrongPath = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/index.md";
const absolutePath =
  "C:\\Angelica\\LABO3\\LIM018-md-links\\sampleFiles\\readme.md";
const relativePath = "./sampleFiles/readme.md";

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
  it("should find links with extension .md and returns an array", () => {
    const pathTest ="C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md";
    const result = [
      {
        href: "https://github/workshopper/learnyounode",
        text: "learnyounode",
        file: "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md",
      },
      {
        href: "https://github.com/workshopper/how-to-npm",
        text: "how-to-npm",
        file: "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md",
      },
      {
        href: "https://github.com/stevekane/promise-it-wont-hurt",
        text: "promise-it-wont-hurt",
        file: "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md",
      },
    ];
    expect(findLinksmd(pathTest)).toEqual(result);
  });
});

// describe('getStatusLink', () => {
//   it('This function must ')
// })

