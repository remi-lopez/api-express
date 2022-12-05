const userRouter = require('./routes/userRouter');
const groupRouter = require('./routes/groupRouter');

const port = 8080;

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(userRouter);
app.use(groupRouter);

app.listen(port, () => {
  console.log(`Serveur à l'écoute sur le port ${port}`);
})
