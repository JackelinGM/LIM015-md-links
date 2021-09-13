//funcion que devuelve archivos md
const obj = require('./md-links');

const getMdFile  = (route) => {
    if ( obj.verifyPath(route)) {
    const routeResult = obj.arrayFileRoute (route);
    const fileMdResult =obj.listFilesMd(routeResult);

    return obj.toPathAbsolute(fileMdResult); 
    }
};

console.log(getMdFile('src\\prueba.js'));

