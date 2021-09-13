// module.exports = () => {
  
// };
// leer un archivo 
// const fs = require('fs');
// const path = require('path');

//     fs.readdirSync(path, (err, files) => {
//       if (err)
//         console.log(err);
//       else {
//         fs.readFile('index.js', 'utf8', (error, datos) => {
//           if (error) console.log('error');
//           console.log("El contenido es: ", datos);
//       });
//       console.log(process.argv);
//         console.log("\nCurrent directory filenames:");
//         console.log(files.filter(file =>file==="index.js"))
//       }
//     })

 //   extension de un archivo

// const fs = require("fs");prueba
// const path=require("path");
// path = "C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links"; prueba

// const extName=path.extname("index.js");
// if (extName.length>0){
//   console.log(extName);
// }else{
//   console.log("No es una extension");
// }

// obtener 

//metodos de fs
// *Para leer un archivo de un directorio fs.readFileSync (ejecuta una forma sincrona)*
const fs = require('fs');

var texto = fs.readFileSync("./src/text.txt", {encoding:'utf-8'});

console.log(texto);

// *Para leer un archivo de un directorio fs.readFile (ejecuta una forma asincrona)*
const fs = require('fs');

fs.readFile('./src/text.txt', (error, text) => {
  if (error) {
    console.log(error.message);
  }
  console.log(text);
});

// *Un archivo que no existe, marcara error (ENOENT: no such file or directory, open)*
const fs = require('fs');

fs.readFile('./src/texto.txt', (error, text) => {
  if (error) {
    console.log(error.message);
  }
  console.log(text);
});

// *Para crear un directorio la funcion mkdir, crea un directorio llamado (Files) de forma asincrona*
const fs = require('fs');

fs.mkdir('Files', (error) => {
  if (error) {
    console.log(error.message);
  }
  console.log('Directorio Creado');
});

// *Validando el directorio creado (src)
const fs = require('fs');

if (fs.existsSync('src')) {
  console.log('El directorio ya ha sido creado');
} else {
  fs.mkdir('src', (error) => {
    if (error) {
      console.log(error.message);
    }
    console.log('Directorio Creado');
  });
}

// *Para leer un directorio la funcion fs.readdirSync (ejecuta una forma sincrona)*
const fs = require('fs');

console.log('Iniciando Lectura')
var files = fs.readdirSync('./src');

console.log('Finalizando Lectura')
console.log(files);


// *Para leer un directorio la funcion fs.readdir (ejecuta una forma asincrona)*
const fs = require ('fs');

console.log('Iniciando Lectura')
fs.readdir('./src', (error, files) => {
  if (error) {
    throw error
  }
  console.log('Finalizando Lectura')
  console.log(files);
});

// *Crear un modulo, se inicia con una exportacion de esta forma estara disponible en cualquier parte de la app*
// 1ero en otro js module.exports = 'Carmelita'
// 2do en en js principal const nombre = require(direccion/../);
// 3ero te devuelve el string 'Carmelita'

const nombre = require('./src/md-links');

console.log(nombre);

// *Destructuracion de modulos*
// 1ero en otro js
    let count = 0;
    const incrementar = () => count++;
    const decrementar = () => count--;
    const obtenerContador = () => count;

    module.exports = {
      incrementar,
      decrementar,
      obtenerContador
    }

// 2do en el js principal
// SIN FUNCIONAR
const utilidades = required('./src/md-links.js');

utilidades.incrementar();
utilidades.incrementar();

console.log(utilidades.obtenerContador());

// *Leer la extencion de un archivo*
const path = require('path');

path.extname('text.txt');

console.log(path.extname('text.txt'));