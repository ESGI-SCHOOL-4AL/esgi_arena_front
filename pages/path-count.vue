<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-size-4 is-centered">
        Nombre de chemins
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
                  @click="showSolution()"
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
          :min-size="4"
          :max-size="8"
          @reset="reset()"
        />
        <form @submit.prevent="submit()">
          <div class="field has-addons">
            <div class="control has-icons-left">
              <b-icon icon="routes" size="is-small" icon-size="mdi-24px" />
              <input
                v-model.number="count"
                :disabled="solutionShown"
                class="input"
                type="number"
                placeholder="Nombre de chemins"
              />
            </div>
            <div class="control">
              <button
                type="submit"
                class="button is-primary"
                :disabled="solutionShown"
              >
                Envoyer
              </button>
            </div>
          </div>
        </form>
        <div v-if="solutionShown" class="solution-container">
          <h2 class="title is-2 has-text-dark has-text-centered">
            Solution
          </h2>
          <h4 class="title is-4 has-text-dark has-text-centered">
            Il existe {{ solution.length }} chemins possibles.
          </h4>
          <div class="columns is-multiline is-7 is-variable">
            <grid-game
              v-for="(path, index) in solution"
              ref="solution-grids"
              :key="index"
              class="column"
              :enabled="false"
              :controls="false"
              :min-size="2"
              :max-size="2"
            />
          </div>
        </div>
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
      overlayShown: false,
      overlayMessage: "",
      solution: null,
      solutionShown: false,
      ended: false,
      count: undefined
    }
  },
  computed: {
    success() {
      return this.solution.length === this.count
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
    restart() {
      this.$refs.game.reset()
    },
    reset() {
      this.overlayMessage = ""
      this.solutionShown = false
      this.overlayShown = false
      this.solution = null
      this.ended = false
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
    async submit() {
      if (this.solutionShown) {
        return
      }
      this.ended = true
      try {
        const res = await this.$axios.$post(
          "/algorithm/escape-ways",
          this.buildRequestMatrix()
        )
        this.solution = res
        this.fixSolution()
        this.checkVictory()
      } catch (err) {
        console.error(err)
      }
    },
    fixSolution() {
      const ref = this.$refs.game
      for (let i = 0; i < this.solution.length; i++) {
        this.solution[i].unshift({ x: ref.start.x, y: ref.start.y })
        for (let j = 1; j < this.solution[i].length; j++) {
          const pos = this.solution[i][j]
          this.solution[i][j] = { x: pos.y, y: pos.x }
        }
      }
    },
    checkVictory() {
      if (this.solution.length === this.count) {
        this.overlayMessage = "Victoire !"
      } else {
        this.overlayMessage = "Raté !"
      }
      this.overlayShown = true
    },
    showSolution() {
      this.solutionShown = true
      this.overlayShown = false
      this.$nextTick(() => {
        const ref = this.$refs.game
        for (let i = 0; i < this.solution.length; i++) {
          const grid = this.$refs["solution-grids"][i]
          grid.setDimensions(200, 200)
          grid.setStart({ x: ref.start.x, y: ref.start.y })
          grid.setDest({ x: ref.dest.x, y: ref.dest.y })
          grid.setTerrain(ref.terrain)
          grid.resetPath()
          grid.setPath(this.solution[i])
        }
      })
    }
  }
}
</script>

<style lang="scss">
.solution-container {
  margin-top: 1.5rem;

  .grid-game {
    .moves-counter-container {
      justify-content: center;
    }
  }
}
</style>
