import { HttpStatus } from "../../tipos/http";

export class ErroHttp extends Error{
    readonly status: HttpStatus;

    constructor(status: HttpStatus, mensagem:string){
        super(mensagem);
        this.name = 'ErroHttp';
        this.status = status;
    }
}