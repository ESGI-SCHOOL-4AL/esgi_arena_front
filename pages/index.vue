<template>
  <div class="container">
    <div class="card">
      <div class="card-content has-text-centered">
        <h1 class="title is-1 has-text-dark">
          ESGI ARENA
        </h1>
        <h4 class="subtitle is-4 has-text-grey">
          Bienvenue
        </h4>
        <nuxt-link
          v-if="!$auth.loggedIn"
          to="/register"
          class="button is-primary"
        >
          <strong>Inscription</strong>
        </nuxt-link>
        <nuxt-link v-if="!$auth.loggedIn" to="/login" class="button is-light">
          Connexion
        </nuxt-link>
        <nuxt-link v-if="$auth.loggedIn" to="/games" class="button is-primary">
          Jouer !
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  transition: "fade"
}
</script>
