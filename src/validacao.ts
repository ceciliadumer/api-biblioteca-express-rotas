import { LivroNovo, LivroParcial } from './tipos';

export function lerId(texto: string): number | undefined {
  const id = Number(texto);
  return Number.isInteger(id) && id > 0 ? id : undefined;
}

function ehAnoValido(valor: unknown): boolean {
  return typeof valor === 'number' && Number.isInteger(valor) && valor > 0;
}

export function ehLivroNovo(valor: unknown): valor is LivroNovo {
  if (typeof valor !== 'object' || valor === null) {
    return false;
  }
  const candidato = valor as Record<string, unknown>;
  return (
    typeof candidato.titulo === 'string' && candidato.titulo.trim() !== '' &&
    typeof candidato.autor === 'string' && candidato.autor.trim() !== '' &&
    ehAnoValido(candidato.ano) &&
    (candidato.disponivel === undefined || typeof candidato.disponivel === 'boolean')
  );
}

export function ehLivroParcial(valor: unknown): valor is LivroParcial {
  if (typeof valor !== 'object' || valor === null) {
    return false;
  }
  const candidato = valor as Record<string, unknown>;
  return (
    (candidato.titulo === undefined || typeof candidato.titulo === 'string') &&
    (candidato.autor === undefined || typeof candidato.autor === 'string') &&
    (candidato.ano === undefined || ehAnoValido(candidato.ano)) &&
    (candidato.disponivel === undefined || typeof candidato.disponivel === 'boolean')
  );
}
