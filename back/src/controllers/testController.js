const express = require('express');
const router = express.Router();
const dbMiddleware = require('../database');

const bodyParser = require('body-parser');
router.use(dbMiddleware);
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    try{
        const result = await req.dbConnection.query('SELECT * FROM test_table');
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send('Erreur lors de la récupération des tables');
      } finally {
        req.dbConnection.release(); 
      }
});

module.exports = router;