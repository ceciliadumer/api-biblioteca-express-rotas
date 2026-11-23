import { NextFunction, Request, Response } from "express";
import { ErroHttp } from "./erros/erro-http";
import { HttpStatus } from "../tipos/http";

export function tratarErros(erro:unknown, req:Request, res:Response, next:NextFunction):void {
    
    if (res.headersSent) {
        next(erro);
        return;
    }

    if (erro instanceof ErroHttp) {
        res.status(erro.status).json({erro: erro.message});
        return;
    }

    if (erro instanceof Error && 'status' in erro && typeof erro.status === 'number' && erro.status < 500) {
        res.status(erro.status).json({erro:erro.message});
        return;
    }

    console.error(erro);
    res.status(HttpStatus.internalError).json({erro: 'Erro interno do servidor'});
}