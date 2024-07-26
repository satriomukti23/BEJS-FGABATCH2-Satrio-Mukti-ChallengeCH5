const express = require('express');
const app = express();
const port = 3000;

const indexRouter = require('./route/index');

app.use(express.json());
app.use(indexRouter);


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});