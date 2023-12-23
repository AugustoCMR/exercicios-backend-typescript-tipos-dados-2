const fileSync = require("fs");

type Endereco = {
    cep: number,
    rua: string,
    complemento: string,
    bairro: string,
    cidade: string
}

type Usuario = {
    nome: string,
    email: string,
    cpf: number,
    profissao: string,
    endereco: Endereco
}

const cadastraUsuario = (usuario: Usuario) => {

    const arquivo = fileSync.readFileSync("../bd.json");

    const converteJS = JSON.parse(arquivo);

    converteJS.push(usuario);
    
    fileSync.writeFileSync("../bd.json", JSON.stringify(converteJS));
}

const listarUsuarios = (arquivo: string): unknown => {

    return JSON.parse(fileSync.readFileSync(arquivo));
}

// cadastraUsuario({
//     nome: "Augusto",
//     email: "augusto@email.com",
//     cpf: 11122233344400,
//     profissao: "Programador",
//     endereco: {
//         cep: 11123456,
//         rua: "Rua 1",
//         complemento: "Casa",
//         bairro: "iapi",
//         cidade: "Salvador" 
//     } 
// })


const atualizarUsuario = (cpf: number): Usuario => {

    const lerArquivo = fileSync.readFileSync("../bd.json");
    
    const converteJSONParaJS = JSON.parse(lerArquivo);

    const buscaUsuario = converteJSONParaJS.find((usuarios: Usuario) => {
        if(usuarios.cpf === cpf) {
            usuarios.nome = "João";
            return usuarios;
        } 
    })

    fileSync.writeFileSync("../bd.json", JSON.stringify(converteJSONParaJS));

    return buscaUsuario;
}

// console.log(atualizarUsuario(11122233344400));

const detalharUsuario = (cpf: number): Usuario => {

    const lerArquivoJSON = JSON.parse(fileSync.readFileSync("../bd.json"));

    const buscaUsuario = lerArquivoJSON.find((usuario: Usuario) => {
        return usuario.cpf === cpf;
    })

    return buscaUsuario
}

// console.log(detalharUsuario(11122233344401));

const excluirUsuario = (cpf: number): Usuario => {

    const lerArquivoJSON = JSON.parse(fileSync.readFileSync("../bd.json"));

    const deletaUsuario = lerArquivoJSON.findIndex((usuario: Usuario) => {
        return usuario.cpf === cpf;
    })

    const usuarioDeletado = lerArquivoJSON[deletaUsuario];

    lerArquivoJSON.splice(deletaUsuario, 1);

    fileSync.writeFileSync("../bd.json", JSON.stringify(lerArquivoJSON));

    return usuarioDeletado
}

// console.log(excluirUsuario(11122233344402));

const filtraUsuarios = (profissao: string): {}[] => {
    
    const lerArquivoJSON = JSON.parse(fileSync.readFileSync("../bd.json"));

    const novoArray: {}[] = [];

    lerArquivoJSON.find((usuarios: Usuario) => {
        if(usuarios.profissao === profissao) {
            novoArray.push(usuarios);
        }
    })

    return novoArray
}

console.log(filtraUsuarios("Cozinheiro"));