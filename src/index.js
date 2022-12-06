const userRouter = require('./router/userRouter');
const groupRouter = require('./router/groupRouter');
const port = 3000;

const express = require('express');
const app = express();

const db = require("./models");

db.sequelize.sync()
.then(() => {
  console.log("Synced db.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(userRouter);
app.use(groupRouter);

app.get('*', (req, res) => {
  return res.status(404).json({ 
    message: 'Page not found. You can try the followings: /users ; /groups ; /groups/users ; /register ; /login' 
  })
})

app.listen(port, () => {
  console.log(`Serveur à l'écoute sur le port ${port}`);
})
