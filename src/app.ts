import express from "express";
import { rotas } from "./rotas/index";
import { registrarRequisicao } from "./middlewares/registrar-requisicao";
import { rotaNaoEncontrada } from "./middlewares/rota-nao-encontrada";
import { tratarErros } from "./middlewares/tratar-erros";

export const app = express();

app.disable('x-powered-by');
app.use(registrarRequisicao);

app.use(express.json({
    limit: '10kb'
}));

app.use(rotas);

app.use(rotaNaoEncontrada);
app.use(tratarErros)