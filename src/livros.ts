import { Livro, LivroNovo, LivroParcial } from './tipos';

const livros: Livro[] = [
  { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', ano: 1899, disponivel: true },
  { id: 2, titulo: 'O Cortiço', autor: 'Aluísio Azevedo', ano: 1890, disponivel: false },
  { id: 3, titulo: 'Vidas Secas', autor: 'Graciliano Ramos', ano: 1938, disponivel: true },
  { id: 4, titulo: 'Capitães da Areia', autor: 'Jorge Amado', ano: 1937, disponivel: true },
];

let proximoId = 5;

export function listar(): Livro[] {
  return livros;
}

export function listarDisponiveis(): Livro[] {
  return livros.filter((livro) => livro.disponivel);
}

export function buscar(id: number): Livro | undefined {
  return livros.find((livro) => livro.id === id);
}

export function criar(dados: LivroNovo): Livro {
  const novo: Livro = { id: proximoId++, ...dados };
  livros.push(novo);
  return novo;
}

export function substituir(id: number, dados: LivroNovo): Livro | undefined {
  const indice = livros.findIndex((livro) => livro.id === id);
  if (indice === -1) {
    return undefined;
  }
  const substituido: Livro = { id, ...dados };
  livros[indice] = substituido;
  return substituido;
}

export function atualizar(id: number, dados: LivroParcial): Livro | undefined {
  const indice = livros.findIndex((livro) => livro.id === id);
  if (indice === -1) {
    return undefined;
  }
  const atualizado: Livro = { ...livros[indice], ...dados, id };
  livros[indice] = atualizado;
  return atualizado;
}

export function remover(id: number): boolean {
  const indice = livros.findIndex((livro) => livro.id === id);
  if (indice === -1) {
    return false;
  }
  livros.splice(indice, 1);
  return true;
}
