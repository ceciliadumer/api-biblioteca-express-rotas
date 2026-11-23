export interface Categoria{
    readonly id: number;
    nome: string;
}

export type CategoriaNova = Omit<Categoria, 'id'>;

export type CategoriaParcial = Partial<CategoriaNova>;


export interface FiltroCategoria{
    nomeComecaCom: String;
    limite: number;
    pagina: number;
}

