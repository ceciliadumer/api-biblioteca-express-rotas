import express, { Request, Response} from 'express';
import * as repositorio from './livros';
import * as Tipos from './tipos';
import { ehLivroNovo, ehLivroParcial, lerId } from './validacao';
import { error } from 'node:console';


const app = express();
app.use(express.json());
const PORT = 3000;

app.get('/', (req, res) => {
    let mensagem: string = "API de Biblioteca Rodando";
    res.status(200).json(mensagem);//ou {mensagem: 'servidor rodando blabla'}
});

app.listen(PORT, () => {
    let mensagem: string = " Servidor rodando em http://localhost:" + PORT;
    console.log(mensagem);
});


    /* MAGICA DO EXPRESS, 
    EU ESTAVA COM DUVIDA DE COMO ELE SABIA Q '/LIVROS/:ID'
    COMO ELE SABIA Q :ID  ERA REALMENTE UMA VARIAVEL DE LIVRO E NÃO 
    UMA STRING, JA QUE ESTA ENTRE ASPAS????
    É PORQUE O EXPRESSSSSS RECONHECE :ID COMO UMA LACUNA NA ROTA
    E SE EU PASSAR 10 POR EXEMPLO, O REQ.PARAMS.ID FAZ ISSO AQUI:
    {
        ID:10
    }
    WOOOWW É MAGICA! :) */

function buscarLivro(req: Request<{ id: string }>, res: Response): void {
  const id = lerId(req.params.id);
  if (id === undefined) {
    res.status(Tipos.StatusCode.NOCONTENT).json({"erro": "id invalido"});
  }
  const livro = repositorio.buscar(id);
  if (!livro) {
    res.status(Tipos.StatusCode.NOTFOUND).json({"erro": "livro não encontrado"});
  }
  res.status(Tipos.StatusCode.OK).json(livro);
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