import { NextFunction, Request, Response } from "express";
import { ErroHttp } from "./erros/erro-http";
import { HttpStatus } from "../tipos/http";

export function metodoNaoPermitido(req:Request, res:Response):void {
    throw new ErroHttp(HttpStatus.methodNotAllowed, `Método ${req.method} não permitido nesta URI`);
}