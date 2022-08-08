/* eslint-disable import/first */
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const database = require('./database');
const LogModel = require('./Log.model');
const app = express();
const PORT = process.env.PORT || 8080;

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const webhook = async (req, res, next) => {
  const { query, body, params } = req.query;
  console.log(`Params: ${query}\nBody: ${body}\nUrlParams: ${params}\n\n`);
  res.json({
    params: query,
    body,
    urlParams: params,
  });
  await LogModel.create({
    info: `Params: ${query}\nBody: ${body}\nUrlParams: ${params}`,
  });
  next();
};

app.get('/', async (req, res) => {
  const logs = await LogModel.find().lean();
  res.render('index', {logs});
});
app.get('/webhook', webhook);
app.post('/webhook', webhook);
app.put('/webhook', webhook);
app.delete('/webhook', webhook);

app.listen(PORT, () => {
  console.log('Initialized');
});
