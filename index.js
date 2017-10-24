'use strict';

const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/build`));

app.listen(process.env.PORT, () => {
  console.log('__SERVER_RUNNING__', process.env.PORT);
});
