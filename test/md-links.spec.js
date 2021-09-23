// const mdLinks = require('../');


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
const {verifyPath} = require('../src/md-links.js') 

describe('Función que valida la ruta:', () => {
  it('Debería retornar true, si la ruta existe', () => {
    expect(verifyPath('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src')).toBe(true);
  });

  it('Debería retornar false, la ruta no existe', () => {
    expect(verifyPath('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015\\crs')).toBe(false);
  });
});
