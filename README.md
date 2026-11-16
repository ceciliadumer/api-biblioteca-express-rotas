# API Biblioteca — Gabarito do Simulado da Prova Prática 01

Desenvolvimento Backend II — Prof. Matheus Oliveira Jagi

Solução de referência do simulado: uma API RESTful de livros com **Express 5** e **TypeScript**.

## Como executar (Windows)

1. Descompacte o arquivo e abra a pasta `api-biblioteca` no VS Code (**Arquivo → Abrir Pasta...**).
2. Abra o terminal (**Terminal → Novo Terminal**) e instale as dependências:

   ```
   npm install
   ```

3. Inicie o servidor em modo de desenvolvimento:

   ```
   npm run dev
   ```

4. Teste em um segundo terminal (clique no **+** do painel de terminais):

   ```
   curl.exe -i http://localhost:3000/livros
   ```

Para simular o fluxo de produção: `npm run build` e depois `npm start`.

## Onde está cada parte do simulado

| Parte | Arquivo |
|---|---|
| 1 — Ambiente | `package.json`, `tsconfig.json`, `.gitignore` e a rota `GET /` em `src/servidor.ts` |
| 2 — Tipos | `src/tipos.ts` |
| 3 — Repositório | `src/livros.ts` |
| 4 — Validação | `src/validacao.ts` |
| 5 — Rotas | `src/servidor.ts` |
| 6 — Postman | pasta `postman/` |

## Testes no Postman

1. No Postman, clique em **Import** e selecione os dois arquivos da pasta `postman/`.
2. No canto superior direito, selecione o environment **Local**.
3. **Reinicie o servidor** (os dados ficam em memória e o roteiro depende do estado inicial).
4. Clique com o botão direito na collection **Biblioteca - Gabarito** → **Run collection** → **Run**.

As requisições seguem a ordem do Roteiro de autoavaliação. O item 06 salva o id do livro criado na variável `ultimo_id`, usada pelo item 06.1.

## Pontos de atenção

- `GET /livros/disponiveis` é registrada **antes** de `/livros/:id`; caso contrário, o `:id` captura a palavra `disponiveis` e a resposta é 400.
- No POST e no PUT, o padrão de `disponivel` é aplicado com `{ ...corpo, disponivel: corpo.disponivel ?? true }`. A forma `{ disponivel: true, ...corpo }` roda, mas o `npx tsc --noEmit` acusa o erro TS2783.
- O `ano` precisa ser inteiro: a validação usa `Number.isInteger`, e não apenas `typeof === 'number'`.
