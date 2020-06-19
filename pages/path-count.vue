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
            <div
              ref="content"
              class="content is-flex is-flex-column is-centered"
            >
              <grid-game ref="game" :restart-on-complete="false" />
              <div class="field has-addons">
                <div class="control has-icons-left">
                  <b-icon icon="routes" size="is-small" icon-size="mdi-24px" />
                  <input
                    class="input"
                    type="number"
                    placeholder="Nombre de chemins"
                  />
                </div>
                <div class="control">
                  <button class="button is-primary">
                    Envoyer
                  </button>
                </div>
              </div>
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
