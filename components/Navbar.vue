<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
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
          <div class="buttons">
            <a class="button is-primary">
              <strong>Inscription</strong>
            </a>
            <a class="button is-light">
              Connexion
            </a>
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
