import express from "express";
import { rotas } from "./rotas/index";
import { registrarRequisicao } from "./middlewares/registrar-requisicao";
import { rotaNaoEncontrada } from "./middlewares/rota-nao-encontrada";
import { tratarErros } from "./middlewares/tratar-erros";
import { ambiente } from './config/ambiente';

export const app = express();

app.disable('x-powered-by');

app.use(registrarRequisicao);
app.use(express.json({ limit: ambiente.limiteCorpo }));
console.log('Limite do corpo:', ambiente.limiteCorpo);
app.use(rotas);
app.use(rotaNaoEncontrada);
app.use(tratarErros);

