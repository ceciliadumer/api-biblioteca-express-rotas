import {
  Produto,
  ProdutoNovo,
  ProdutoParcial,
  FiltrosProduto,
  Pagina,
} from "../tipos/produto";
import { ehProdutoNovo } from "../validacao/produto.validacao";

const produtos: Produto[] = [
  { id: 1, nome: "Notebook", preco: 3500, estoque: 10, descricao: "100%" },
  { id: 2, nome: "Mouse Microsoft", preco: 80, estoque: 50 },
  { id: 3, nome: "Teclado", preco: 250, estoque: 30 },
  { id: 4, nome: "Monitor LG", preco: 1200, estoque: 15 },
  { id: 5, nome: "Mouse Pad Dell", preco: 40, estoque: 100 },
  {
    id: 6,
    nome: "Webcam",
    preco: 300,
    estoque: 0,
    descricao: "possui trincado",
  },
];

let proximoId = 7;

export function listar(): Produto[] {
  return produtos;
}

export function adicionar(produto: Produto): Produto {
  produtos.push(produto);
  return produto;
}

export function buscarId(id: number): Produto | undefined {
  return produtos.find((p) => p.id === id);
}

export function criar(dados: ProdutoNovo): Produto {
  const novo: Produto = { id: proximoId, ...dados };
  produtos.push(novo);
  return novo;
}

export function remover(id: number): boolean {
  const indice = produtos.findIndex((p) => p.id === id);

  if (indice == -1) {
    return false;
  }

  produtos.splice(indice, 1);
  return true;
}

export function atualizar(
  id: number,
  dados: ProdutoParcial,
): Produto | undefined {

  const indice = produtos.findIndex((p) => p.id === id);

  if (indice === -1) {
    return undefined;
  }

  const produtoAtualizado: Produto = {
    ...produtos[indice],
    ...dados,
    id,
  };
  produtos[indice] = produtoAtualizado;
  return produtoAtualizado;
}

export function substituir(
  id: number,
  dados: ProdutoNovo,
): Produto | undefined {
  const indice = produtos.findIndex((p) => p.id === id);

  if (indice === -1) {
    return undefined;
  }

  produtos[indice] = {
    id,
    ...dados,
  };
  return produtos[indice];
}

export function pesquisar(filtros: FiltrosProduto): Pagina<Produto> {
  const resultado = produtos.filter((produto) => {
    if (
      filtros.busca &&
      !produto.nome.toLowerCase().includes(filtros.busca.toLowerCase()) &&
      !produto.descricao?.toLowerCase().includes(filtros.busca.toLowerCase())
    ) {
      return false;
    }


    if (filtros.precoMin !== undefined && produto.preco < filtros.precoMin) {
      console.log("a")
      return false;
    }

    if (filtros.precoMax !== undefined && produto.preco > filtros.precoMax) {
      console.log("b")
      return false;
    }

    if (filtros.emEstoque == false && produto.estoque == 0) {
      return true;
    }

    if (filtros.emEstoque && produto.estoque === 0) {
      return false;
    }
    return true;
  });

  if (filtros.ordem) {
    const campo = filtros.ordem;
    const fator = filtros.direcao === "desc" ? -1 : 1;

    resultado.sort((a, b) => {
      if (a[campo] < b[campo]) {
        return -1 * fator;
      }
      if (a[campo] > b[campo]) {
        return 1 * fator;
      }

      return 0;
    });
  }
  const inicio = (filtros.pagina - 1) * filtros.limite;

  return {
    dados: resultado.slice(inicio, inicio + filtros.limite),
    total: resultado.length,
    pagina: filtros.pagina,
    limite: filtros.limite,
  };
}
