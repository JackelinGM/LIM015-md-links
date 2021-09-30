
const path = require('path');
const obj = require('./md-links.js');
const mdLinks = require('./validate.js');

const statsMdLinks = (route, options) => new Promise((resolve, reject) => {
mdLinks.mdLinks(route, options)
    .then((links) => {
    if (links.length === 0) {
        resolve('El archivo o directorio no contiene links');
    } else if (options && options.stats && options.validate) {
        resolve(obj.OptionsValidateStats(route));
    } else if (options && options.stats) {
        resolve(obj.optionStats(route));
    } else if (options && options.validate) {
        resolve(obj.optionValidate(route));
    } else {
        const stringLinks = links.map((link) => `${path.relative(process.cwd(),link.filePath)} ${link.hrefPath} ${link.textPath}`);
        resolve(stringLinks.join('\n'));
    }
    }).catch((err) => {
    reject(err);
    });
});


// statsMdLinks('./src/prueba/prueba.md',obj).then (response =>
//     console.log(response)
// ).catch(err => console.log(err,'este es el error'))



module.exports = { statsMdLinks };
