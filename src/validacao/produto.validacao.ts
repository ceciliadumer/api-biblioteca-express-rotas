import { futimes } from "node:fs";
import { CampoOrdenacao, ProdutoNovo, ProdutoParcial } from "../tipos/produto";


export function lerId(text:String): number | undefined {
    const id = Number(text);

    if (id <= 0 || !Number.isInteger(id)) {
        return undefined;
    }

    return id;
}

export function ehProdutoParcial(valor: unknown): valor is ProdutoParcial {
    if (typeof valor !== 'object' || valor == null) {
        return false;
    }

    const candidado = valor as Record<string, unknown>;

    return (
        (candidado.nome === String || candidado.nome === undefined) &&
        (candidado.preco === Number || candidado.preco === undefined) &&
        (candidado.estoque === Number || candidado.estoque === undefined)
    )
}

export function ehProdutoNovo(valor:unknown): valor is ProdutoNovo {
    if (typeof valor !== 'object' || valor == null) {
        return false;
    }

    const candidato = valor as Record<string, unknown>;

    return(
        typeof candidato.nome === 'string' &&
        typeof candidato.preco === 'number'
    );
}

export function lerTexto(valor:unknown): string | undefined {
    return typeof valor === 'string' && valor.trim() !== '' ? valor.trim() : undefined;
}

export function lerNumero(valor:unknown): number | undefined {
    const texto = lerTexto(valor);
    return texto === undefined ? undefined : Number(texto);
}

export function lerInteiro(valor:unknown, padrao: number): number | undefined {
    const texto = lerTexto(valor);
    return texto === undefined ? padrao : lerId(texto);
}


const CAMPOS_ORDENACAO: string[] = ['nome', 'preco', 'estoque'];

export function ehCampoOrdenacao(valor:string): valor is CampoOrdenacao {
    return CAMPOS_ORDENACAO.includes(valor);
}

export function ehBoolean(valor:unknown): boolean {
    if (valor == 'true') {
        return true;
    }

    return false;
}