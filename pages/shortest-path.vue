<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-size-4 is-centered">
        Chemin le plus court
      </p>
    </header>
    <div class="card-content">
      <div ref="content" class="content is-flex is-flex-column is-centered">
        <grid-game ref="game" />
      </div>
    </div>
  </div>
</template>

<script>
import GridGame from "~/components/GridGame.vue"

export default {
  components: {
    GridGame
  },
  mounted() {
    window.addEventListener("resize", this.onResize)
    this.onResize()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize)
  },
  methods: {
    onResize(e) {
      const game = this.$refs.game
      const width = this.$refs.content.clientWidth
      if (width < 400) {
        game.width = width
      } else {
        game.width = 400
      }
      game.height = game.width
    }
  }
}
</script>
