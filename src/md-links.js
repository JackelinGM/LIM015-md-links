const fs = require("fs");
const path = require("path");
const marked = require("marked");
const fetch = require("node-fetch");

//Verifica si la ruta existe
const verifyPath = (route) => fs.existsSync(route);

//Verifica si es directorio
const verifyTypePath = (routeSend) => fs.lstatSync(routeSend).isDirectory();

// enlista mi directorio && join elemento
const arrayFileRoute = (route) => {
const directory = verifyTypePath(route);
let files = [];
if (directory) {
    const paths = fs.readdirSync(route);
    paths.forEach((element) => {
    files = files.concat(arrayFileRoute(path.join(route, element)));
    });
} else {
    files.push(route);
}
return files;
};

//listar los archivos md
const listFilesMd = (list) =>
list.filter((file) => path.extname(file) === ".md");

//Pasar a ruta absoluta
const toPathAbsolute = (list) => {
return list.map((element) => {
    return path.resolve(element);
});
};

//Función que devuelve un array de objetos con href, text, file
const readFileMd = (route) => {
const links = [];
const renderer = new marked.Renderer();
const arrFiles = arrayFileRoute(route);
arrFiles.forEach((file) => {
//forEach que recorrera el array de as rutas de archivos .md
    const filesData = fs.readFileSync(file, "utf8"); // almacenar en una constante  la funcionde leer el archivo
    renderer.link = (href, title, text) => {
//buscar los link del archivo y solicitar los argumentos
    links.push({ hrefPath: href, textPath: text, filePath: file });
    };
    marked(filesData, { renderer });
});
return links;
};

//Función para validar los links OK or FAIL
const linksValidate = (route) => {
const arrObjLinks = readFileMd(route);
const arrLinksPromise = arrObjLinks.map((link) =>
    fetch(link.hrefPath)
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
        statusText: "FAIL",
        status: response.status,
        };
    })
    .catch(() => ({
        ...link,
        statusText: "FAIL",
        status: "500",
    }))
);
return Promise.all(arrLinksPromise);
};

//Función que devuelve en string los links validados
const optionValidate = (route) =>
new Promise((resolve) => {
    linksValidate(route).then((arrLinks) => {
    const strLinks = arrLinks.map(
        (link) =>
        `${path.relative(process.cwd(), link.filePath)} ${link.hrefPath} ${
            link.statusText
        } ${link.status} ${link.textPath}`
    );
    resolve(strLinks.join("\n"));
    });
});

const uniqueLinks = (arrLinks) => [
...new Set(arrLinks.map((link) => link.hrefPath)),
];
const brokenLinks = (arrValidateLinks) =>
arrValidateLinks.filter((link) => link.status >= 400);

//Función que devuelve los stats de los links en string
const optionStats = (route) =>
new Promise((resolve) => {
    const arrMdLinks = readFileMd(route);
    resolve(
    `Total: ${arrMdLinks.length}\nUnique: ${uniqueLinks(arrMdLinks).length}`
    );
});

//Función que devuelve los stats y validación de los links en string
const OptionsValidateStats = (route) =>
new Promise((resolve) => {
    linksValidate(route).then((links) => {
    resolve(
        `Total: ${links.length}\nUnique: ${
        uniqueLinks(links).length
        }\nBroken: ${brokenLinks(links).length}`
    );
    });
});

module.exports = {
verifyPath,
verifyTypePath,
listFilesMd,
toPathAbsolute,
readFileMd,
arrayFileRoute,
optionValidate,
linksValidate,
uniqueLinks,
brokenLinks,
optionStats,
OptionsValidateStats,
};
