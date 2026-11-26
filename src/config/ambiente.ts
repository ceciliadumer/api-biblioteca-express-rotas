import dotenv from 'dotenv';

//Para não ficar jogando resposta para o terminal o tempo todo
dotenv.config({quiet:true});


// verifica se por exemplo, a variavel PORTA=3000 está undefined
// é string porque tudo que vem do .env vem em string
// Devolve o valor da variável ou não retorna nada
function obrigatoria(nome:string):string{
    const valor = process.env[nome];

    console.log(`Variável de ambiente ${nome}: ${valor}`);
    if (valor === undefined || valor.trim() === '') {
        throw new Error(` Variável de ambiente obrigatória ausente: ${nome}`);
    }
    return valor;
}

function lerPorta(): number {
    const porta = Number.parseInt(obrigatoria('PORTA'));

    if(!Number.isInteger(porta) || porta < 1 || porta > 65535){
        throw new Error(' PORTA deve ser um n inteiro entre 1 d 65535');
    }
    return porta;
}

const nodeEnv = process.env.NODE_ENV ?? 'development';

export const ambiente = {

    porta: lerPorta(),
    nodeEnv,
    emProducao: nodeEnv === 'production',
    limiteCorpo: process.env.LIMITE_CORPO ?? '100mb',

}
