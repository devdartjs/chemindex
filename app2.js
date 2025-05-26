import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Servidor funcionando!</h1>');
});

app.listen(6000, () => {
  console.log('Servidor rodando na porta 6000');
});

//

