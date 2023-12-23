const fs = require("fs");

const lerArquivo = (arquivo: string): unknown => {

    const readArquivo = fs.readFileSync(arquivo);

    const conversorJSONParaJS = JSON.parse(readArquivo);

    return conversorJSONParaJS;
}
 
const escreveArquivo = (arquivo: string, dados: any) => {

    fs.writeFileSync(arquivo, JSON.stringify(dados));
}

escreveArquivo("../bd.json", {
    nome: "João"
});

console.log(lerArquivo("../bd.json"));

