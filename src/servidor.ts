import express, { type Request, type Response } from "express";
import {app} from './app'


const PORTA = 3000;

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost${PORTA}`);
});

