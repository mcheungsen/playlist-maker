require('dotenv').config();

const express = require('express');
const router = express.Router();
const dbMiddleware = require('../database');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const axios = require('axios')


router.use(dbMiddleware);
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let client_id = process.env.CLIENT_ID;
let redirect_uri = 'http://localhost:8083/api/user/callback';
let client_secret = process.env.CLIENT_SECRET;

router.get('/', async (req, res) => {
    res.json({
        client_id: client_id,
        client_secret: client_secret
    })
})


function generateRandomString(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    var charLength = chars.length;
    var result = '';
    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
}



router.get('/login', async (req, res) => {
    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email';

    // Construire l'URL d'autorisation Spotify
    const authorizationUrl = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        });

    // Rediriger vers l'URL d'autorisation
    res.redirect(authorizationUrl);
});

router.get('/callback', async (req, res) => {
    let code = req.query.code || null;
    let state = req.query.state || null;

    if (state == null) {
        // Gérer l'erreur de state mismatch
        res.redirect('/#/error?error=state_mismatch');
    } else {
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: '/home',
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        // Effectuer la demande POST pour échanger le code contre un jeton d'accès
        axios.post(authOptions.url, querystring.stringify(authOptions.form), {
            headers: authOptions.headers
        })
        .then(response => {
            // Rediriger l'utilisateur vers votre page après l'autorisation
            res.redirect('/home/success?access_token=' + response.data.access_token);
        })
        .catch(error => {
            // Rediriger l'utilisateur vers une page d'erreur après l'échec de l'échange de code
            res.redirect('/#/error?error=token_exchange_failed');
        });
    }
});



module.exports = router;