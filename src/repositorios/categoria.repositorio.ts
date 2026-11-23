import { Categoria, CategoriaNova, CategoriaParcial, FiltroCategoria } from "../tipos/categoria";
import { Pagina } from "../tipos/produto";
const categorias: Categoria[] = [
  { id: 1, nome: "auxiliares" },
  { id: 2, nome: "Monitores" },
  { id: 3, nome: "Mouse" },
  { id: 4, nome: "Notebook" },
];

const PROXIMO_ID = 5;

export function listar(): Categoria[] {
  return categorias;
}


export function listarFiltros(filtro:FiltroCategoria ): Pagina<Categoria> {
  const pagina = filtro.pagina;
  const limite = filtro.limite;

  const filtrados = categorias.filter((categoria)=>{
    if (categoria.nome.charAt(0).toUpperCase() != filtro.nomeComecaCom.charAt(0).toUpperCase()) {
      return false;
    }
    return true;
  });


  const inicio = (pagina - 1 ) * limite;
  console.log(filtrados)
  return  {
    dados: filtrados.splice(inicio, limite),
    total: filtrados.length,
    pagina: pagina,
    limite: limite
  }
}

export function buscar(id: number): Categoria | undefined {
  return categorias.find((categoria) => categoria.id === id);
}

export function remover(id: number): boolean {
  const indice = categorias.findIndex((categoria) => categoria.id === id);

  if (indice === -1) {
    return false;
  }

  categorias.splice(indice, 1);
  return true;
}

export function criar(valor: CategoriaNova): Categoria {
  const categoria: Categoria = { id: PROXIMO_ID, ...valor };
  categorias.push(categoria);
  return categoria;
}

export function substituir(
  id: number,
  valor: CategoriaNova,
): Categoria | undefined {
  const indice = categorias.findIndex((categoria) => categoria.id === id);

  if (indice === -1) {
    return undefined;
  }

  categorias[indice] = { id: id, ...valor };
  return categorias[indice];
}

export function atualizar(
  id: number,
  valor: CategoriaNova,
): Categoria | undefined {
  const indice = categorias.findIndex((categoria) => categoria.id === id);

  if (indice === -1) {
    return undefined;
  }

  categorias[indice] = {...categorias[indice],...valor, id:id};
  return categorias[indice];
}
