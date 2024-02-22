const express = require('express');
const cors = require('cors');
const testRouter = require('./controllers/testController');
const userRouter = require('./controllers/userController');

const app = express();
const port = 80;

// Utiliser le middleware CORS
app.use(cors());

// Utiliser les routes
app.use('/test', testRouter);
app.use('/user', userRouter);

// Middleware pour le parsing du corps des requêtes en JSON
app.use(express.json());

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
