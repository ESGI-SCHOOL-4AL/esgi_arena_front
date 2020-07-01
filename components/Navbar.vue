<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link to="/" class="navbar-item is-size-2">
        ESGI ARENA
      </nuxt-link>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        :aria-expanded="isActive"
        @click="isActive = !isActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div :class="{ 'navbar-menu': true, 'is-active': isActive }">
      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="$auth.loggedIn" class="buttons is-flex">
            <span class="navbar-span">
              Bonjour,
              {{ $auth.user.username }}
            </span>
            <button class="button is-light" @click="$auth.logout()">
              Déconnexion
            </button>
          </div>
          <div v-else class="buttons">
            <nuxt-link to="/register" class="button is-primary">
              <strong>Inscription</strong>
            </nuxt-link>
            <nuxt-link to="/login" class="button is-light">
              Connexion
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "BNavbar",
  data() {
    return {
      isActive: false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-span {
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
}

@media screen and (max-width: 768px) {
  .navbar-menu {
    transition: transform 0.5s ease;
    transform: translateX(100%);
    position: absolute;
    right: 0;
    height: calc(100vh - #{$navbar-height});
    display: block !important;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

    &.is-active {
      transform: translateX(0);
    }

    .navbar-item .buttons {
      display: flex;
      flex-direction: column;

      .button {
        margin-right: 0;
      }
    }
  }
}
</style>
