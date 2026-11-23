export interface Produto{
    id : number,
    nome : string,
    preco : number,
    estoque : number,
    descricao?: string,
}

export type ProdutoNovo = Omit<Produto, "id">;

export type ProdutoParcial = Partial<Produto>;



export type CampoOrdenacao = 'nome' | 'preco' | 'estoque';
export type Direcao = 'asc' | 'desc';

export interface FiltrosProduto {
    busca?: string;
    precoMin?: number;
    precoMax?: number;
    ordem?: CampoOrdenacao;
    emEstoque?:boolean;
    direcao: Direcao;
    pagina:number;
    limite: number;
}

export interface Pagina<T>{
    dados: T[];
    total: number;
    pagina: number;
    limite: number;

}