// const mdLinks = require('../');
const {
  checkPathExists,
  // convertToAbsolutePath
} = require("../src/md-links");

const path = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md";
const wrongPath = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/index.md";
// const absolutePathFile = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles";
// const relativePathFile = "./md-links.spec.js";

describe('checkPathExists', () => {

  it('should return True if a path exists', () => {
    expect(checkPathExists(path)).toBe(true);
  });
  it('should return False if a path does not exists', () => {
    expect(checkPathExists(wrongPath).toBe(false))
  })
});
