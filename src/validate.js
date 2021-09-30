// retorna una promesa con los links del path
const fs = require('fs');
const path = require('path');
const obj = require('../src/md-links.js');

const mdLinks = (route, options) => new Promise((resolve, reject) => {
if (fs.existsSync(route)) {
    if (options?.validate) {
    resolve(obj.linksValidate(route));
    } else {
    resolve(obj.readFileMd(route));
    }
} else {
    reject(new Error(`No se encuentra la ruta: ${path.resolve(route)}`));
}
});
//   console.log(mdLinks('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\test\\testData\\prueba.md',obj));

module.exports = { mdLinks };
