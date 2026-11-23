import { Router } from "express";
import {produtosRotas} from './produtos.rotas';
import { categoriasRotas } from "./categorias.rotas";

export const rotas = Router();

rotas.use('/produtos', produtosRotas);

rotas.use('/categorias',categoriasRotas);