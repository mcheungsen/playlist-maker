// Connexion à la bdd
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host : 'mariadb',
  database : 'tracks_db',
  user : 'root',
  password : 'mdp',
  port: 3306,
  connectionLimit: 5,
});

const dbMiddleware = async (req, res, next) => {
    try {
      const conn = await pool.getConnection();
      req.dbConnection = conn; // <-- la connexion dans l'objet req pour y accéder dans les routes (évite la répétition de code pour se connecter à chaque fois)
      next();
    } catch (error) {
      res.status(500).send('Erreur de connexion à la base de données');
    }
  };
  
  module.exports = dbMiddleware;