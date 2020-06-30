<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-size-4 is-centered">
        Chemin le plus court
      </p>
    </header>
    <div class="card-content">
      <div ref="content" class="content is-flex is-flex-column is-centered">
        <grid-game ref="game" @end="destReached()" />
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
  transition: "fade",
  mounted() {
    window.addEventListener("resize", this.onResize)
    this.onResize()
  },
  beforeMount() {
    if (!this.$auth.loggedIn) {
      this.$router.push("/login")
    }
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
    },
    buildRequestMatrix() {
      const m = []
      const game = this.$refs.game
      const terrain = game.terrain
      for (let i = 0; i < terrain.length; i++) {
        const row = []
        for (let j = 0; j < terrain[i].length; j++) {
          row.push(-terrain[i][j])
        }
        m.push(row)
      }

      // Start
      m[game.start.y][game.start.x] = 1

      // Destination
      m[game.dest.y][game.dest.x] = 2
      return m
    },
    async destReached() {
      try {
        const res = await this.$axios.$post(
          "/algorithm/labyrinth",
          this.buildRequestMatrix()
        )
        console.log(res)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
