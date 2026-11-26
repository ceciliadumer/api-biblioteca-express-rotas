import { app } from './app';
import { ambiente } from './config/ambiente';



app.listen(ambiente.porta, () => {
  console.log(`Servidor rodando em http://localhost:${ambiente.porta} (${ambiente.nodeEnv})`);
});

