import React from 'react';

const Login = () => {
  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }


  const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }

  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  const getToken = async code => {

    // stored in the previous step
    let codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    }

    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem('access_token', response.access_token);
  }



  const loginClick = async () => {
    try {
      const response = await fetch('/api/user/')
        .then(res => {
          return res.json()
        })
      console.log(response)

      const client_id = response.client_id;
      const client_secret = response.client_secret;
      const redirectUri = 'http://localhost:8083/home'

      const codeVerifier = generateRandomString(64);
      const hashed = await sha256(codeVerifier)
      const codeChallenge = base64encode(hashed);


      // request user authorization
      const scope = 'user-read-private user-read-email';
      const authUrl = new URL("https://accounts.spotify.com/authorize")

      // generated in the previous step
      window.localStorage.setItem('code_verifier', codeVerifier);

      const params = {
        response_type: 'code',
        client_id: client_id,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
      }

      authUrl.search = new URLSearchParams(params).toString();
      window.location.href = authUrl.toString();

      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get('code');


    } catch (error) {

    }
  }

  return (
    <div>
      <h2>Playlist Maker</h2>
      <button onClick={loginClick}>Se connecter</button>
    </div>
  );
};

export default Login;
