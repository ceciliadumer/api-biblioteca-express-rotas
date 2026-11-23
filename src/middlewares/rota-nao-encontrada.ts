import { NextFunction, Request, Response } from "express";
import { ErroHttp } from "./erros/erro-http";
import { HttpStatus } from "../tipos/http";

export function  rotaNaoEncontrada(req:Request, res:Response):void {
    throw new ErroHttp(HttpStatus.notFound, `Rota ${req.method}${req.path} não encontrada`);
}