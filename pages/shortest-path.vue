<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-size-4 is-centered">
        Chemin le plus court
      </p>
    </header>
    <div class="card-content">
      <div
        ref="content"
        class="content is-flex is-flex-column is-centered is-relative"
      >
        <div
          v-if="overlayShown"
          class="game-overlay is-flex is-flex-column is-centered"
        >
          <div class="card">
            <div class="card-content">
              <p
                v-if="success"
                class="title is-2 has-text-success has-text-centered"
              >
                Victoire !
              </p>
              <p
                v-else-if="!success"
                class="title is-2 has-text-danger has-text-centered"
              >
                Raté !
              </p>
              <p class="has-text-centered">
                <button class="button is-medium is-success" @click="restart()">
                  Rejouer
                </button>

                <button
                  v-if="!success"
                  class="button is-medium is-danger"
                  @click="playSolution()"
                >
                  Solution
                </button>
              </p>
            </div>
          </div>
        </div>
        <grid-game
          ref="game"
          :enabled="!ended"
          @end="destReached()"
          @reset="reset()"
        />
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
  data() {
    return {
      ended: false,
      overlayMessage: "",
      overlayShown: false,
      solution: null,
      interval: null,
      current: 0
    }
  },
  computed: {
    success() {
      return this.solution.length === this.$refs.game.path.length - 1
    }
  },
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
      this.ended = true
      try {
        const res = await this.$axios.$post(
          "/algorithm/labyrinth",
          this.buildRequestMatrix()
        )
        this.solution = res
        this.solution.shift()
        this.checkVictory()
      } catch (err) {
        console.error(err)
      }
    },
    checkVictory() {
      if (this.solution.length === this.$refs.game.path.length) {
        this.overlayMessage = "Victoire !"
      } else {
        this.overlayMessage = "Raté !"
      }
      this.overlayShown = true
    },
    restart() {
      this.$refs.game.reset()
    },
    reset() {
      this.stopSolution()
      this.overlayMessage = ""
      this.overlayShown = false
      this.solution = null
      this.ended = false
    },
    playSolution() {
      this.$refs.game.resetPath()
      this.overlayShown = false
      this.interval = setInterval(() => {
        const pos = this.solution[this.current]
        this.$refs.game.pushPath({ x: pos.y, y: pos.x })
        this.current++
        if (this.current === this.solution.length) {
          this.overlayShown = true
          this.stopSolution()
        }
      }, 150)
    },
    stopSolution() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
      this.current = 0
    }
  }
}
</script>
