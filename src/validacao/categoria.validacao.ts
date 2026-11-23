import { CategoriaNova } from "../tipos/categoria";

export function ehCategoriaNova(valor: unknown):valor is CategoriaNova {
    
    if (typeof valor !== 'object' || valor === undefined) {
        return false;
    }

    const candidato = valor as Record<string, unknown>;

    return typeof candidato.nome === 'string';
}

