/* eslint-disable import/first */
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const database = require('./database');
const LogModel = require('./Log.model');
const app = express();
const PORT = process.env.PORT || 8080;

const webhook = async (req, res, next) => {
  const { query, body, params } = req.query;
  console.log(`Params: ${query}\nBody: ${body}\nUrlParams: ${params}\n\n`);
  res.json({
    params: query,
    body,
    urlParams: params,
  });
  await LogModel.create({
    info: `Params: ${query}\nBody: ${body}\nUrlParams: ${params}\n\n`,
  });
  next();
};

app.get('/webhook', webhook);
app.post('/webhook', webhook);
app.put('/webhook', webhook);
app.delete('/webhook', webhook);
// Data
app.get('/logs', async (req, res) => {
  const logs = await LogModel.find().lean();
  res.json(logs);
});

app.listen(PORT, () => {
  console.log('Initialized');
});
