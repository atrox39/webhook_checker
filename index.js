import express from 'express';
import path from 'path';
import fs from 'fs';
import shelljs from 'shelljs';

const dirname = shelljs.pwd();
const LOG_PATH = path.join(dirname, 'data.log');
const app = express();
const PORT = process.env.PORT || 8080;

const webhook = (req, res, next) => {
  const { query, body, params } = req.query;
  console.log(`Params: ${query}\nBody: ${body}\nUrlParams: ${params}\n\n`);
  res.json({
    params: query,
    body,
    urlParams: params,
  });
  fs.writeFileSync(LOG_PATH, `Params: ${query}\nBody: ${body}\nUrlParams: ${params}\n\n`);
  next();
};

app.get('/webhook', webhook);
app.post('/webhook', webhook);
app.put('/webhook', webhook);
app.delete('/webhook', webhook);
// Data
app.get('/logs', (req, res) => {
  const logs = fs.readFileSync(LOG_PATH);
  res.send(logs);
});

app.listen(PORT, () => {
  console.log('Initialized');
});
