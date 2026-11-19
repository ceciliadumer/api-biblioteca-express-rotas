import express, { Request, Response } from 'express';
import * as repositorio from './livros';
import { StatusHttp } from './tipos';
import { ehLivroNovo, ehLivroParcial, lerId } from './validacao';
import { registrarRequisicao } from './middlewares/registrar-aquisicao';

const app = express();
const PORTA = 3000;

app.disable('x-powered-by');
app.use(registrarRequisicao); // primeiro da fila do next
app.use(express.json());

const NAO_ENCONTRADO = 'Livro não encontrado';
const ID_INVALIDO = 'Id inválido';

function responderErro(res: Response, status: StatusHttp, mensagem: string): void {
  res.status(status).json({ erro: mensagem });
}

function listarLivros(req: Request, res: Response): void {
  res.status(StatusHttp.OK).json(repositorio.listar());
}

function listarDisponiveis(req: Request, res: Response): void {
  res.status(StatusHttp.OK).json(repositorio.listarDisponiveis());
}

function buscarLivro(req: Request<{ id: string }>, res: Response): void {
  const id = lerId(req.params.id);
  if (id === undefined) {
    return responderErro(res, StatusHttp.RequisicaoInvalida, ID_INVALIDO);
  }
  const livro = repositorio.buscar(id);
  if (!livro) {
    return responderErro(res, StatusHttp.NaoEncontrado, NAO_ENCONTRADO);
  }
  res.status(StatusHttp.OK).json(livro);
}

function criarLivro(req: Request, res: Response): void {
  const corpo: unknown = req.body;
  if (!ehLivroNovo(corpo)) {
    return responderErro(res, StatusHttp.EntidadeInvalida, 'Campos obrigatórios: titulo, autor e ano');
  }
  const novo = repositorio.criar({ ...corpo, disponivel: corpo.disponivel ?? true });
  res.status(StatusHttp.Criado).location(`/livros/${novo.id}`).json(novo);
}

function substituirLivro(req: Request<{ id: string }>, res: Response): void {
  const id = lerId(req.params.id);
  const corpo: unknown = req.body;
  if (id === undefined) {
    return responderErro(res, StatusHttp.RequisicaoInvalida, ID_INVALIDO);
  }
  if (!ehLivroNovo(corpo)) {
    return responderErro(res, StatusHttp.EntidadeInvalida, 'Campos obrigatórios: titulo, autor e ano');
  }
  const livro = repositorio.substituir(id, { ...corpo, disponivel: corpo.disponivel ?? true });
  if (!livro) {
    return responderErro(res, StatusHttp.NaoEncontrado, NAO_ENCONTRADO);
  }
  res.status(StatusHttp.OK).json(livro);
}

function atualizarLivro(req: Request<{ id: string }>, res: Response): void {
  const id = lerId(req.params.id);
  const corpo: unknown = req.body;
  if (id === undefined) {
    return responderErro(res, StatusHttp.RequisicaoInvalida, ID_INVALIDO);
  }
  if (!ehLivroParcial(corpo)) {
    return responderErro(res, StatusHttp.EntidadeInvalida, 'Campos com tipo inválido');
  }
  const livro = repositorio.atualizar(id, corpo);
  if (!livro) {
    return responderErro(res, StatusHttp.NaoEncontrado, NAO_ENCONTRADO);
  }
  res.status(StatusHttp.OK).json(livro);
}

function removerLivro(req: Request<{ id: string }>, res: Response): void {
  const id = lerId(req.params.id);
  if (id === undefined) {
    return responderErro(res, StatusHttp.RequisicaoInvalida, ID_INVALIDO);
  }
  if (!repositorio.remover(id)) {
    return responderErro(res, StatusHttp.NaoEncontrado, NAO_ENCONTRADO);
  }
  res.status(StatusHttp.SemConteudo).end();
}

function metodoNaoPermitido(req: Request, res: Response): void {
  responderErro(res, StatusHttp.MetodoNaoPermitido, `Método ${req.method} não permitido nesta URI`);
}

// Parte 1 — verificação do ambiente
app.get('/', (req, res) => {
  res.status(StatusHttp.OK).json({ mensagem: 'API da biblioteca no ar' });
});

// Específica antes da genérica
app.get('/livros/disponiveis', listarDisponiveis);

app.route('/livros')
  .get(listarLivros)
  .post(criarLivro)
  .all(metodoNaoPermitido);

app.route('/livros/:id')
  .get(buscarLivro)
  .put(substituirLivro)
  .patch(atualizarLivro)
  .delete(removerLivro)
  .all(metodoNaoPermitido);

app.use((req, res) => {
  responderErro(res, StatusHttp.NaoEncontrado, `Rota ${req.method} ${req.path} não encontrada`);
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
