const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { port, apiKey, apiBaseUrl } = require('./environment');

const app = express();
app.use(logger, bodyParser.json(), cors());

function logger (req, res, next) {
  console.log('Request', 'method', req.method, 'pathanme', req.url);
  next();
}

app.use(express.static('dist'));

app.get('/sentiment-analysis',
  (req, res, next) => req.body && req.body.text ? next() : res.status(400).send(),
  async (req, res) => {
    const text = req.body.text;
    const url = `${apiBaseUrl}?key=${apiKey}&txt=${text}&lang=auto`;
    const APIRequest = await fetch(url, { method: 'POST' });
    const APIResponse = await APIRequest.json();
    console.log('API response', APIResponse);
    if (APIResponse.status.msg !== 'OK') {
      // probably something wrong with the request parameters
      res.status(449).json(APIResponse.status.msg || 'unknown error');
      return;
    }
    res.json(APIResponse);
  }
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
