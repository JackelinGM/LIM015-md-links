const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fetch = require('node-fetch')

//Verifica si la ruta existe 
const verifyPath = (route) => fs.existsSync(route); 

//Verifica si es directorio
const verifyTypePath = (routeSend) =>  fs.lstatSync(routeSend).isDirectory(); 
//console.log(verifyPath('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src'));
//console.log(verifyTypePath('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src'));

// enlista mi directorio && join elemento
const arrayFileRoute = (route) => {
    const directory = verifyTypePath(route);
    let files = [];
if (directory) {
    const paths = fs.readdirSync(route);
        paths.forEach(element => {
            files = files.concat(arrayFileRoute(path.join(route, element)));
        })
    } else {
        files.push(route);
    }
    return files;
};
//console.log(arrayFileRoute('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src'));

//listar los archivos md
const listFilesMd = (list) => list.filter(file => path.extname(file) === '.md'); 
// console.log((listFilesMd([ 
//     'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\cli.js',
//     'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\md-links.js',
//     'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\method.js',
//     'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\prueba\\preuba.md',
//     'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\prueba\\prueba1.md',
//     'C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\text.txt'])));
    

// Pasar a ruta absoluta
const toPathAbsolute = (list) => { 
    return list.map(element => {
        return path.resolve(element);
    })
};

//console.log(toPathAbsolute(['C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\prueba\\prueba1.md']),'ruta absoluta');

// Función que devuelve un array de objetos con href, text, file
const readFileMd = (route) => {
    const links = [];
    const renderer = new marked.Renderer();
    const arrFiles = arrayFileRoute(route);
    arrFiles.forEach((file) => {
    const filesData = fs.readFileSync(file, 'utf8');
    renderer.link = (href, title, text) => {
        links.push({ hrefPath: href, textPath: text, filePath: file });
    };
    marked(filesData, { renderer });
    });
    return links;
};
//  console.log(readFileMd('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\README.md'));

 // Función para validar los links OK or FAIL
const linksValidate = (route) => {
    const arrObjLinks = readFileMd(route);
    const arrLinksPromise = arrObjLinks.map((link) => fetch(link.hrefPath)
    .then((response) => {
        if (response.ok) {
        return {
            ...link,
            statusText: response.statusText,
            status: response.status,
        };
        }
        return {
        ...link,
        statusText: 'FAIL',
        status: response.status,
        };
    })
    .catch(() => ({
        ...link,
        statusText: 'FAIL',
        status: 'ERROR',
    })));
    return Promise.all(arrLinksPromise);
};
console.log(linksValidate('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\README.md'));

module.exports = { 
    verifyPath, 
    verifyTypePath, 
    listFilesMd, 
    arrayFileRoute, 
    toPathAbsolute,
}
