import { Livros } from "./tipos";
import * as Tipos from "./tipos"


const vetLivros: Livros[] = [

    { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', ano: 1899, disponivel: true },
    { id: 2, titulo: 'O Cortiço', autor: 'Aluísio Azevedo', ano: 1890, disponivel: false },
    { id: 3, titulo: 'Vidas Secas', autor: 'Graciliano Ramos', ano: 1938, disponivel: true },
    { id: 4, titulo: 'Capitães da Areia', autor: 'Jorge Amado', ano: 1937, disponivel: true },

];

var proximoID: number = 5;

export function listar(): Livros[] {
    return vetLivros;
};

export function listarDisponiveis(): Livros[] {
    return vetLivros.filter(livrosDisponiveis => livrosDisponiveis.disponivel == true);
};

export function buscar(idBusca: number): Livros | undefined {
    let findIndex = vetLivros.findIndex(livro => livro.id == idBusca)
    if (!findIndex) {
        return undefined
    }

    return vetLivros[findIndex];
};

export function criar(dados: Tipos.LivroNovo): Livros {

    const novosDados: Livros = {
        id: proximoID,
        ...dados
    };

    vetLivros.push(novosDados);
    proximoID++;
    return novosDados;
};

// =============== CRIANDO UM NOVO LIVRO
const livroAlienista = criar({
    titulo: "O Alienista",
    autor: "Machado de Assis",
    ano: 1882,
    disponivel: true
});
console.log(livroAlienista);

export function substituir(idBusca: number, dados: Tipos.LivroNovo): Livros | undefined {

    const indice:number = vetLivros.findIndex(livro => livro.id == idBusca)

    if (indice === -1) {
        return undefined;
    }

    const livroSubstituido: Livros = { //tem que ser do tipo Livros simples, pq o livroNovo omiti o id, então nunca da certo? tirar duvida
        ...dados,
        id: idBusca,
    }
    vetLivros[indice] = livroSubstituido;
    return livroSubstituido;
}

export function atualizar(idBusca: number, dados: Tipos.LivroParcial): Livros | undefined {
    const indice = vetLivros.findIndex(livro => livro.id === idBusca);

    if (indice === -1) {
        return undefined;
    }

    const dadosAtualizados: Livros = {
        ...vetLivros[indice],
        ...dados,
        id: idBusca,
    }

    vetLivros[indice] = dadosAtualizados;
    return dadosAtualizados;
}

export function excluir(id:number):boolean {
let indice = vetLivros.findIndex( livro => livro.id ===id)

if (indice === -1) {
    return false;
}

vetLivros.splice(indice, 1);
return true;
}