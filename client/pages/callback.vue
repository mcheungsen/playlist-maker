<script setup lang="ts">
const { $locally } = useNuxtApp()
// On récupère le code dans l'URL
const route = useRoute()

// Fonction pour traiter le callback
async function handleSpotifyCallback() {
  const code = route.query.code;
  if (code) {
    console.log('Authorization code:', code);
    
    // Affiche un message indiquant que la requête est en cours
    console.log('Envoi de la requête à l\'API Spotify...');

    // Effectue la requête fetch
    fetch('http://localhost/api/spotify/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Indique que le body est du JSON
      },
      body: JSON.stringify({
        code: code,
        state: route.query.state || null
      })
    })
    .then(async (res) => {
      // Vérifie si la réponse est OK
      if (!res.ok) {
        throw new Error('Erreur lors de la requête: ' + res.status);
      }
      const jsonResponse = await res.json(); // Lire le corps de la réponse
      console.log('Réponse de l\'API:', jsonResponse); // Affiche le contenu de la réponse
      // TODO stocker les donénes dans le localStorage
      $locally.setItem("access_token", jsonResponse['access_token'])
      $locally.setItem("refresh_token", jsonResponse['refresh_token'])
      $locally.setItem("token_type", jsonResponse['token_type'])
      $locally.setItem("scope", jsonResponse['scope'])
    })
    .catch((error) => {
      // Gère les erreurs
      console.error('Erreur:', error);
    })
    .finally(() => {
      // Ce bloc s'exécute toujours à la fin, peu importe le résultat
      console.log('La requête a été traitée.');
      navigateTo('/')
    });

  } else {
    console.error('No authorization code found');
  }
}


// Appel lorsque la page est montée
onMounted(() => {
  handleSpotifyCallback();
});
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <h1>Callback de Spotify</h1>
    <div class="flex items-end gap-1">
      <p class="inline-block align-middle">Traitement en cours</p>
      <UIcon name="svg-spinners:3-dots-scale" />

    </div>
    <UIcon class="h-10 w-10" name="svg-spinners:bouncing-ball" />
  </div>
</template>
