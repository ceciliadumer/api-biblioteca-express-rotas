import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../tipos/http";

export function exigirJson(req:Request, res:Response, next:NextFunction):void {
    if (!req.is('application/json')) {
        res.status(HttpStatus.typeNotSuported).json({erro: 'O corpo deve ser enviado com Content-Type: application/json'});
        return;
    }

    next();
    
}