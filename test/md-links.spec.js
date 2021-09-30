
const path = require('path');
const moduleImport = require('../src/md-links.js');
const mdLinks = require('../src/validate.js');
const cliImport = require('../src/stats.js');

const mdFile = path.join(process.cwd(), 'test', 'testData', 'prueba.md');
const listPrueba = [
  'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\cli.js',
  'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\test\\testData',
  'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\test\\testData',
  'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\test\\testData\\subData\\prueba.md',];

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

const linkOk = {
  hrefPath: 'https://es.wikipedia.org/wiki/Markdown',
  textPath: 'Markdown',
  filePath: 'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\prueba.md',
  statusText: 'OK',
  status: 200,
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

describe('option stats', () => {
  it('Should return links statistics in a string', () => moduleImport.optionStats('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\prueba.md')
    .then((result) => {
      expect(result).toEqual('Total: 3\nUnique: 3');
    }));
});

describe('option validate and stats', () => {
  it('Should return the links statistics and links validations in a string', () => moduleImport.OptionsValidateStats('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\subPrueba.md')
    .then((result) => {
      expect(result).toEqual('Total: 3\nUnique: 3\nBroken: 2');
    }));
});

describe('option validate', () => {
  it('Should return the validated links', () => moduleImport.optionValidate('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\subPrueba.md')
    .then((result) => {
      expect(result).toEqual(`test\\testData\\subPrueba.md https://es.wikipedia.org/wiki/Markdown OK 200 Markdown\ntest\\testData\\subPrueba.md https://nodejs.org/es/abou1t/ FAIL 404 Node.js\ntest\\testData\\subPrueba.md https://developer.mo3zilla.org/ FAIL 500 roto`);
    }));
});

// test funcion md-links
describe('mdLinks', () => {
  it('Should return an array of link objects', () => mdLinks.mdLinks('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\prueba.md')
    .then((result) => {
      expect(result).toEqual(readFileMdArray);
    }));
  it('should return an array of objects with validated links', () => mdLinks.mdLinks(mdFile, { validate: true })
    .then((result) => {
      expect(result[0]).toEqual(linkOk);
    }));
  it('should show a message: No se encuentra la ruta', () => mdLinks.mdLinks('no-route')
    .catch((err) => {
      expect(err.message).toEqual(`No se encuentra la ruta: ${path.join(process.cwd(), 'no-route')}`);
    }));
});

//test a cli.js
describe('cli mdlinks', () => {
  it('should show a message: El archivo o directorio no contiene links ', () => cliImport.statsMdLinks(path.join(process.cwd(), 'src'))
    .then((result) => {
      expect(result).toEqual('El archivo o directorio no contiene links');
    }));

  it('should return an string with the validation and status of the links', () => cliImport.statsMdLinks(mdFile, { validate: true, stats: true })
    .then((result) => {
      expect(result).toEqual('Total: 3\nUnique: 3\nBroken: 2');
    }));

  it('should return an string with the status of the links', () => cliImport.statsMdLinks(mdFile, { stats: true })
    .then((result) => {
      expect(result).toEqual('Total: 3\nUnique: 3');
    }));

  it('should return an string with validated links', () => cliImport.statsMdLinks(mdFile, { validate: true })
    .then((result) => {
      expect(result).toEqual(`test\\testData\\prueba.md https://es.wikipedia.org/wiki/Markdown OK 200 Markdown\ntest\\testData\\prueba.md https://nodejs.org/es/abou1t/ FAIL 404 Node.js\ntest\\testData\\prueba.md https://developer.mo3zilla.org/ FAIL 500 roto`);
    }));

  it('should return an string with the links', () => cliImport.statsMdLinks(mdFile)
    .then((result) => {
      expect(result).toEqual(`test\\testData\\prueba.md https://es.wikipedia.org/wiki/Markdown Markdown\ntest\\testData\\prueba.md https://nodejs.org/es/abou1t/ Node.js\ntest\\testData\\prueba.md https://developer.mo3zilla.org/ roto`);
    }));

  it('should show a message: No se encuentra la ruta', () => cliImport.statsMdLinks('no-route')
    .catch((err) => {
      expect(err.message).toEqual(`No se encuentra la ruta: ${path.join(process.cwd(), 'no-route')}`);
    }));
});