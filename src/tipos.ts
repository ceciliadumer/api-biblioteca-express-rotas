export interface Livros {

    readonly id:number,
    titulo:string,
    autor:string,
    ano:number,
    disponivel:boolean

}

export type LivroNovo = Omit<Livros, 'id'>;

export type LivroParcial = Partial<LivroNovo>;

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    NOCONTENT = 204, //DELETE
    NOTFOUND = 404, 
    METODONAOPERMITIDO = 405,
    ENTIDADEINVALIDA = 422,
}