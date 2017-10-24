'use strict';

const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/build`));
// app.get('*', (req, res) => res.sendFile(`${__dirname}/build/index.html`));

app.listen(process.env.PORT, () => {
  console.log('__SERVER_RUNNING__', process.env.PORT);
});
