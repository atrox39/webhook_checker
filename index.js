import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

const webhook = (req, res, next) => {
  const params = req.query;
  const body = req.body;
  const urlParams = req.params;
  console.log(`Params: ${params}\nBody: ${body}\nUrlParams: ${urlParams}\n\n`);
  res.json({
    params,
    body,
    urlParams,
  });
  next();
}

app.get('/webhook', webhook);
app.post('/webhook', webhook);
app.put('/webhook', webhook);
app.delete('/webhook', webhook);

app.listen(PORT, () => {
  console.log('Initialized');
});
