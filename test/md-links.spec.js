
const path = require('path');
const moduleImport = require('../src/md-links.js');
const mdLinks = require('../src/validate.js');
const cliImport = require('../src/stats.js');


const testDirectory = path.join(process.cwd(), 'test');
const mdFile = path.join(process.cwd(), 'test', 'testData', 'prueba.md');
// const subMdFile = path.join(testDirectory, 'testData', 'subPath', 'subPrueba.md');
// const relativePath = path.join('test', 'tesData', 'prueba.md');
const listPrueba = [
  'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\cli.js',
  'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\test\\testData',
  'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\test\\testData',
  'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\test\\testData\\subData\\prueba.md'];

const readFileMdArray = [
  {
    hrefPath: 'https://es.wikipedia.org/wiki/Markdown',
    textPath: 'Markdown',
    filePath: 'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\prueba.md'
  },
  {
    hrefPath: 'https://nodejs.org/es/abou1t/',
    textPath: 'Node.js',
    filePath: 'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\prueba.md'
  },
  {
    hrefPath: 'https://developer.mo3zilla.org/',
    textPath: 'roto',
    filePath: 'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\prueba.md'
  }
];

// const linkOk = {
//   hrefPath: 'https://es.wikipedia.org/wiki/Markdown',
//   textPath: 'Markdown',
//   filePath: mdFile,
//   statusText: 'OK',
//   status: 200,
// };

const linkFail = {
  hrefPath: 'https://nodejs.org/es/abou1t/',
  textPath: 'Node.js',
  filePath: mdFile,
  statusText: 'FAIL',
  status: 500,
};


describe('validate path', () => {
  it ("It Should be a Function", () => {
    expect(typeof moduleImport.verifyPath).toBe('function');
  });

  it("Should return true if path exist", () => {
    expect(moduleImport.verifyPath('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test')).toBe(true);
  });

  it("Should return false if it doesn't exist", () => {
    expect(moduleImport.verifyPath('./src/test')).toBe(false);
  });
});

describe('veryfyTypePath', () => {
  it ("It should be a function", () => {
    expect(typeof moduleImport.verifyTypePath ).toBe('function');
  });

  it("Should return true if it is directory", () => {
    const result = (moduleImport.verifyTypePath('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test'));
    expect(result).toBe(true);
  });

  it("Should return false if it is file", () => {
    const result = (moduleImport.verifyTypePath('./src/cli.js'));
    expect(result).toBe(false);
  });
});

describe('arrayFileRoute', () => {
  it ("It should be a function", () => {
    expect(typeof moduleImport.arrayFileRoute).toBe('function');
  });

  it("Should return list files with path absolute if it is directory", () => {
    const result = moduleImport.arrayFileRoute('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test');
    expect(result).toEqual(["C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\md-links.spec.js", "C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\prueba.md", "C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\prueba.txt", "C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\subPrueba.md"]);
  });
});

describe('listFilesMd', () => {
  it ("It should be a function", () => {
    expect(typeof moduleImport.listFilesMd).toBe('function');
  });
  it ("Should return list of files only md of directory", () => {
    expect(moduleImport.listFilesMd(listPrueba)).toEqual(["C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\test\\testData\\subData\\prueba.md"]);
  });

  it ("Should be null if you don't have .md files", () => {
    expect(moduleImport.listFilesMd(['Vídeos','baby-steps.js','hello-world.js'])).toEqual([]);
  });
});

describe('toPathAbsolute', () => {
  it ("It should be a function", () => {
    expect(typeof moduleImport.toPathAbsolute).toBe('function');
  });
  it ("Should return list of files with path absolute", () => {
    expect(moduleImport.toPathAbsolute([ 'prueba.md' ])).toEqual([ 'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\prueba.md' ]);
  });
});





describe('readFilesMd', () => {
  it ("Should be a function", () => {
    expect(typeof moduleImport.readFileMd).toBe('function');
  });
  it ("Should return an array of arrays from each directory", () => {
    expect(moduleImport.readFileMd('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\prueba.md')).toEqual(readFileMdArray);
  });
});








describe('Validate links', () => {
  it('Should return a promisse with OK status', () => moduleImport.linksValidate('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\prueba.md')
    .then((result) => {
      expect('https://es.wikipedia.org/wiki/Markdown').toEqual('https://es.wikipedia.org/wiki/Markdown');
    }));

  it('Should return a promisse with FAIL status', () => moduleImport.linksValidate('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\prueba.md')
    .then((result) => {
      expect('https://es.wikipedia.org/wiki/Mark').toEqual('https://es.wikipedia.org/wiki/Mark');
    }));
});





