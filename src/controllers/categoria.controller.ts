import { Request, Response } from "express";
import * as repositorio from '../repositorios/categoria.repositorio';
import { HttpStatus } from "../tipos/http";
import { lerId, lerInteiro, lerTexto } from "../validacao/produto.validacao";
import { ErroHttp } from "../middlewares/erros/erro-http";
import { unlink } from "node:fs";
import { ehCategoriaNova } from "../validacao/categoria.validacao";
import { Categoria, FiltroCategoria } from "../tipos/categoria";

type REQUISICAO_ID = Request<{id:string}>;

export function listarCategorias(req:Request, res:Response) {
    const nomeComecaCom = lerTexto(req.query.nomeComecaCom);
    const pagina = lerInteiro(req.query.pagina, 1);
    const limite = lerInteiro(req.query.limite, 10);

    if (typeof nomeComecaCom !== 'string' || nomeComecaCom.trim() === "") {
        console.log(typeof nomeComecaCom)
        throw new ErroHttp(HttpStatus.badRequest, 'query string invalida');
    }

    if (pagina === undefined || pagina <= 0 || typeof pagina !== 'number') {
        throw new ErroHttp(HttpStatus.invalidEntity, 'pagina deve ser um número')
    }

     if (limite === undefined || limite <= 0 || typeof limite !== 'number') {
        throw new ErroHttp(HttpStatus.invalidEntity, 'limite deve ser um número')
    }

    const resultado = repositorio.listarFiltros({nomeComecaCom, limite, pagina});

    return res.status(HttpStatus.ok).json(resultado);

}


export function buscar(req:REQUISICAO_ID, res:Response):void {
    const id = lerId(req.params.id);

    if (id === undefined) {
        throw new ErroHttp(HttpStatus.invalidEntity, 'id inválido');
    }

    const categoria = repositorio.buscar(id);

    if (categoria === undefined) {
        throw new ErroHttp(HttpStatus.notFound, 'categoria não encontrada');
    }

    res.status(HttpStatus.ok).json(categoria);
}

export function criar(req:REQUISICAO_ID, res:Response):void {
    const id = lerId(req.params.id);
    const corpo: unknown = req.body;

    if (id === undefined) {
        throw new ErroHttp(HttpStatus.invalidEntity, 'id inválido');
    }

    if (!ehCategoriaNova(corpo)) {
        throw new ErroHttp(HttpStatus.invalidEntity, 'corpo inválido');
    }

    const categoria: Categoria = repositorio.criar(corpo);
    
    res.status(HttpStatus.created).location(`/categoria/${categoria.id}`).json(categoria);
}

export function substituir(req:REQUISICAO_ID, res:Response):void {
    const id = lerId(req.params.id);
    const corpo = req.body;

    if (id === undefined) {
        throw new ErroHttp(HttpStatus.invalidEntity, 'id invalido');
    }

    if (!ehCategoriaNova(corpo)) {
        throw new ErroHttp(HttpStatus.invalidEntity, 'corpo inválido');
    }

    const categoria = repositorio.substituir(id, corpo);

    if (categoria === undefined) {
        throw new ErroHttp(HttpStatus.notFound, "categoria não encontrada");
    }

    res.status(HttpStatus.ok).json(categoria);
}

export function atualizar(req:REQUISICAO_ID, res:Response):void {
    const id = lerId(req.params.id);
    const corpo = req.body;

    if (id === undefined) {
        throw new ErroHttp(HttpStatus.invalidEntity, 'id inválido');
    }

    if (!ehCategoriaNova(corpo)) {
        throw new ErroHttp(HttpStatus.invalidEntity, 'corpo inválido');
    }

    const categoria = repositorio.atualizar(id,corpo);

    if (categoria === undefined) {
        throw new ErroHttp(HttpStatus.notFound, 'categoria não encontrada');
    }

    res.status(HttpStatus.ok).json(categoria);
}

export function remover(req:REQUISICAO_ID, res:Response):void {
    const id = lerId(req.params.id);

    if (id === undefined) {
        throw new ErroHttp(HttpStatus.invalidEntity, 'id inválido');
    }

    const removeu = repositorio.remover(id);

    if (!removeu) {
        throw new ErroHttp(HttpStatus.notFound, 'categoria não encontrada');
    }

    res.status(HttpStatus.noContent).end();
}