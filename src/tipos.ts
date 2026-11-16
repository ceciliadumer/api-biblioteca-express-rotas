export interface Livro {
  readonly id: number;
  titulo: string;
  autor: string;
  ano: number;
  disponivel: boolean;
}

export type LivroNovo = Omit<Livro, 'id'>;
export type LivroParcial = Partial<LivroNovo>;

export enum StatusHttp {
  OK = 200,
  Criado = 201,
  SemConteudo = 204,
  RequisicaoInvalida = 400,
  NaoEncontrado = 404,
  MetodoNaoPermitido = 405,
  EntidadeInvalida = 422,
}
