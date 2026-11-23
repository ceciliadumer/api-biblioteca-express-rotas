import express, { type Request, type Response } from "express";
import * as repositorioProduto from "../repositorios/produtos.repositorio";
import { tratarErros } from "../middlewares/tratar-erros";
import { exigirJson } from "../middlewares/exigir-json";
import { registrarRequisicao } from "../middlewares/registrar-requisicao";
import {Produto, ProdutoParcial, ProdutoNovo } from "../tipos/produto";
import { HttpStatus } from "../tipos/http";
import {
  ehProdutoNovo,
  ehProdutoParcial,
  lerId,
  ehCampoOrdenacao,
  lerInteiro,
  lerNumero,
  lerTexto,
  ehBoolean,
} from "../validacao/produto.validacao";
import { ErroHttp } from "../middlewares/erros/erro-http";

type RequisicaoComId = Request<{id:string}>;

export function obterId(req:RequisicaoComId):number {
    const id = lerId(req.params.id);

    if (id === undefined) {
        throw new ErroHttp(HttpStatus.badRequest, 'id inválido');
    }
    return id;
}

export function listarProdutos(req: Request, res: Response): void {
  const pagina = lerInteiro(req.query.pagina, 1);
  const limite = lerInteiro(req.query.limite, 10);
  const precoMin = lerNumero(req.query.precoMin);
  const precoMax = lerNumero(req.query.precoMax);
  const ordem = lerTexto(req.query.ordem);
  const direcao = lerTexto(req.query.direcao) ?? "asc";
  const emEstoque = ehBoolean(req.query.emEstoque);

  if (pagina === undefined || limite === undefined || limite > 100) {
    throw new ErroHttp(HttpStatus.badRequest,'pagina e limite devem ser inteiros positivos (limite máximo: 100)' );
  }

  if (Number.isNaN(precoMin) || Number.isNaN(precoMax)) {
    throw new ErroHttp(HttpStatus.badRequest, 'precoMin e precoMax devem ser números');
  }

  if (ordem !== undefined && !ehCampoOrdenacao(ordem)) {
    throw new ErroHttp(HttpStatus.badRequest, 'ordem deve ser nome, preco ou estoque');
  }

  if (direcao !== "asc" && direcao !== "desc") {
    throw new ErroHttp(HttpStatus.badRequest, 'direcao deve ser asc ou desc');
  }

  if (typeof emEstoque !== "boolean") {
    throw new ErroHttp(HttpStatus.badRequest, 'emEstoque deve ser boolean')
  }

  const resultado = repositorioProduto.pesquisar({
    busca: lerTexto(req.query.busca),
    precoMin,
    precoMax,
    ordem,
    direcao,
    pagina,
    limite,
    emEstoque,
  });

  res.status(HttpStatus.ok).json(resultado);
}


export function estatisticaProdutos(req: Request, res: Response): void {
  const valorEmEstoque = repositorioProduto
    .listar()
    .reduce((total, produto) => total + produto.preco * produto.estoque, 0);
  res
    .status(HttpStatus.ok)
    .json({ Total: repositorioProduto.listar().length, valorEmEstoque });
}

/*function listarProdutos(req: Request, res: Response): void {
  res.status(httpStatus.ok).json(repositorioProduto.listar());
}
*/


export function buscarProduto(req: Request<{ id: string }>, res: Response): void {
  const id = lerId(req.params.id);

  if (id === undefined) {
    throw new ErroHttp(HttpStatus.badRequest, "Id inválido");
  }

  const produto = repositorioProduto.buscarId(id);

  if (!produto) {
    throw new ErroHttp(HttpStatus.notFound, "Produto não encontrado");
  }

  res.status(HttpStatus.ok).json(produto);
}

export function criarProduto(req: Request, res: Response): void {
  const corpo: unknown = req.body;

  if (!ehProdutoNovo(corpo)) {
    res.status(HttpStatus.badRequest).json({ erro: "Corpo inválido" });
  }

  const novo: Produto = repositorioProduto.criar({
    ...(corpo as ProdutoNovo),
    estoque: 0,
  });

  res.status(HttpStatus.created).location(`/produtos/${novo.id}`).json(novo);
}

export function substituirProduto(req: Request<{ id: string }>, res: Response) {
  const idProduto = lerId(req.params.id);
  const corpo: unknown = req.body;

  if (!idProduto) {
    throw new ErroHttp(HttpStatus.badRequest, 'Id inválido');
  }

  if (!ehProdutoNovo(corpo)) {
    throw new ErroHttp(HttpStatus.invalidEntity, 'corpo inválido');
  }

  const produto = repositorioProduto.substituir(idProduto, corpo);

  if (!produto) {
    throw new ErroHttp(HttpStatus.notFound, 'produto não encontrado');
  }
  res.status(HttpStatus.ok).json(produto);
}

export function atualizarProduto(req: Request<{ id: string }>, res: Response): void {
  const id = lerId(req.params.id);
  const body: unknown = ehProdutoParcial(req.params);

  if (!id) {
    throw new ErroHttp(HttpStatus.badRequest, 'Id inválido');
  }

  if (!body) {
    throw new ErroHttp(HttpStatus.invalidEntity, 'corpo inválido')
  }

  const produtoAtualizado = repositorioProduto.atualizar(id, body);

  if (!produtoAtualizado) {
    throw new ErroHttp(HttpStatus.notFound, 'produto não encontrado');
  }

  res.status(HttpStatus.ok).json(produtoAtualizado);
}

export function remover(req: Request<{ id: string }>, res: Response): void {
  const id = lerId(req.params.id);

  if (!id) {
    throw new ErroHttp(HttpStatus.badRequest, 'Id inválido');
  }

  if (!repositorioProduto.remover(id)) {
    throw new ErroHttp(HttpStatus.notFound, 'produto não encontrado');
  }

  res.status(HttpStatus.noContent).end();
}
