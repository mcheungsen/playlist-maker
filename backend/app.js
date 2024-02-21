// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware pour analyser le corps des requêtes
app.use(bodyParser.json());

// Vos routes API iront ici
// Ajoutez cela après le middleware body-parser
app.get('/api/songs', (req, res) => {
    // Logique pour récupérer les chansons depuis la base de données ou un autre service
    const songs = [{ id: 1, title: 'Song 1' }, { id: 2, title: 'Song 2' }];
    res.json(songs);
  });
  
  app.post('/api/songs', (req, res) => {
    // Logique pour ajouter une chanson à la base de données
    const newSong = req.body;
    // Ajoutez la nouvelle chanson à votre base de données ou à la liste existante
    res.json({ message: 'Chanson ajoutée avec succès' });
  });
  

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
