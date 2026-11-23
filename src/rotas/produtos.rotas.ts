import { Router } from "express";
import * as controller from '../controllers/produtos.controller';
import {metodoNaoPermitido} from '../middlewares/metodo-nao-permitido'

export const produtosRotas = Router();

produtosRotas.get('/estatisticas', controller.estatisticaProdutos);


produtosRotas.route('/')
.get(controller.listarProdutos)
.post(controller.criarProduto)
.all(metodoNaoPermitido);

produtosRotas.route('/:id')
.get(controller.buscarProduto)
.patch(controller.atualizarProduto)
.put(controller.substituirProduto)
.delete(controller.remover)
.all(metodoNaoPermitido)