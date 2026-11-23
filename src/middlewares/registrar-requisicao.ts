import { NextFunction, Request, Response } from "express";

export function registrarRequisicao(req: Request, res: Response, next:NextFunction):void {
    const inicio = Date.now();


    // finish é disparado quando a resposta termina de ser enviada
    res.on('finish',()=>{
        const duracao = Date.now() - inicio;
        console.log(`${req.method}${req.originalUrl} -> ${res.statusCode} (${duracao}ms)`);
    });

    next();
}