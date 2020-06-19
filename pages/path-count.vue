<template>
  <section class="hero is-primary is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-size-4 is-centered">
              Nombre de chemins
            </p>
          </header>
          <div class="card-content">
            <div class="content is-flex is-flex-column is-centered">
              <grid-game />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GridGame from "~/components/GridGame.vue"

export default {
  components: {
    GridGame
  }
}
</script>
