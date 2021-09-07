const fs = require('fs');
const path = require('path');

//Verifica si la ruta existe 
const verifyPath = (route) => fs.existsSync(route); 


//Verifica si es directorio
const verifyTypePath = (routeSend) =>  fs.lstatSync(routeSend).isDirectory(); 
console.log(verifyPath('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src'));
console.log(verifyTypePath('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src'));


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
console.log(arrayFileRoute('C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links\\src'));




module.exports = { 
    verifyPath, 
    verifyTypePath, 
    // listFilesMd, 
    // readFilesMd, 
    arrayFileRoute, 
    // toPathAbsolute,
    // getLinks
}
