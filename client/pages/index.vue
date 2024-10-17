<script setup lang="ts">
const config = useRuntimeConfig()
const client = config.public.clientId
const redirectUri = config.public.redirectUri
const scopes = config.public.scopes

console.log(client)
function redirectToSpotifyAuth() {
    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client}&redirect_uri=${redirectUri}&scope=${scopes}`;
}
</script>

<template>
    <UButton label="Spotify" @click="redirectToSpotifyAuth"/>
</template>