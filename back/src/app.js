// index.js
const express = require('express');
const testRouter = require('./controllers/testController')

const app = express();
const port = 80;

app.use('/test', testRouter);



// Middleware pour le parsing du corps des requêtes en JSON
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', '*'); // Autoriser tous les en-têtes à être exposés
  next();
});
// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
