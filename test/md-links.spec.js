// const mdLinks = require('../');
const {
  checkPathExists, convertToAbsolutePath,
  // convertToAbsolutePath
} = require("../src/md-links");

const path = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/readme.md";
const wrongPath = "C:/Angelica/LABO3/LIM018-md-links/sampleFiles/index.md";
const absolutePath = "C:\\Angelica\\LABO3\\LIM018-md-links\\sampleFiles/readme.md";
const relativePath = "./readme.md";

describe('checkPathExists', () => {

  it('should return True if a path exists', () => {
    expect(checkPathExists(path)).toBe(true);
  });
  it('should return False if a path does not exists', () => {
    expect(checkPathExists(wrongPath)).toBe(false);
  })
});

describe('convertToAbsolutePath', () => {
  it('should returns the absolute path if the path is absolute',() => {
    expect(convertToAbsolutePath(absolutePath));
  })
  it('should convert relative path to absolut path' , () =>{
    expect(convertToAbsolutePath(relativePath)).toBe(absolutePath);
  });
});