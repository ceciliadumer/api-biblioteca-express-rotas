import { Router } from "express";
import *  as controller from '../controllers/categoria.controller'
import { metodoNaoPermitido } from "../middlewares/metodo-nao-permitido";

export const categoriasRotas = Router();

categoriasRotas.route('/')
.get(controller.listarCategorias)
.post(controller.criar)
.all(metodoNaoPermitido)

categoriasRotas.route('/:id')
.get(controller.buscar)
.patch(controller.atualizar)
.put(controller.substituir)
.delete(controller.remover)
.all(metodoNaoPermitido);

