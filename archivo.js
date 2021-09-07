// const arrayFilePath = (pathSent) => {
//     const isDirectory = checkTypePath(pathSent);
//     let files = [];
//     if (isDirectory) {
//         const paths = fs.readdirSync(pathSent);
//         paths.forEach(element => {
//             files = files.concat(arrayFilePath(path.join(pathSent, element)));
//         })
//     } else {
//         files.push(pathSent);
//     }
//     return files;
// };