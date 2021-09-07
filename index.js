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
// const fs = require("fs");
const path=require("path");
// path = "C:\\Users\\Casa\\Desktop\\LABORATORIA\\LIM015-md-links";

const extName=path.extname(".md");
if (extName.length>0){
  console.log(extName);
}else{
  console.log("No es una extension");
}

