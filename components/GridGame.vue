<template>
  <div class="grid-game">
    <div class="moves-counter-container is-flex">
      <span class="moves-counter is-size-5">
        {{ path.length - 1 }} déplacements
      </span>
      <button
        v-if="controls"
        class="control-button reset-button"
        title="Réinitialiser"
        @click="reset()"
      >
        <b-icon icon="refresh" size="is-large" icon-size="mdi-36px" />
      </button>
    </div>
    <path-grid
      :terrain="terrain"
      :path="path"
      :dest="dest"
      :width="width"
      :height="height"
    />
    <div v-if="controls">
      <move-controls @movePressed="onMovePressed" />
    </div>
  </div>
</template>

<script>
import MoveControls from "~/components/MoveControls.vue"
import PathGrid from "~/components/PathGrid.vue"
import Generator from "~/scripts/generator.js"

export default {
  name: "GridGame",
  components: {
    MoveControls,
    PathGrid
  },
  props: {
    enabled: { type: Boolean, default: true },
    minSize: { type: Number, default: 10 },
    maxSize: { type: Number, default: 20 },
    controls: { type: Boolean, default: true }
  },
  data() {
    return {
      width: 400,
      height: 400,
      terrain: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      path: [{ x: 0, y: 0 }],
      currentPos: { x: 0, y: 0 },
      start: { x: 0, y: 0 },
      dest: { x: 0, y: 0 }
    }
  },
  watch: {
    currentPos: {
      handler(val) {
        if (
          this.currentPos.x === this.dest.x &&
          this.currentPos.y === this.dest.y
        ) {
          this.$emit("end")
        }
      },
      deep: true
    }
  },
  beforeMount() {
    this.reset()
  },
  mounted() {
    window.addEventListener("keydown", this.onKeyPress)
    window.addEventListener("resize", this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.onKeyPress)
    window.removeEventListener("resize", this.onResize)
  },
  methods: {
    reset() {
      const size = Math.floor(
        Math.random() * (this.maxSize - this.minSize + 1) + this.minSize
      )
      const level = Generator.generate(size)
      this.terrain = level.grid
      this.path = [{ x: 0, y: 0 }]
      Object.assign(this.start, level.start)
      this.resetPath()
      Object.assign(this.dest, level.end)
      this.$emit("reset")
    },
    resetPath() {
      this.path = [{ x: 0, y: 0 }]
      Object.assign(this.currentPos, this.start)
      Object.assign(this.path[0], this.start)
    },
    pushPath(pos) {
      this.path.push(pos)
    },
    setPath(path) {
      this.path = path
    },
    setTerrain(terrain) {
      this.terrain = terrain
    },
    setStart(pos) {
      this.start = pos
    },
    setDest(pos) {
      this.dest = pos
    },
    setDimensions(width, height) {
      this.width = width
      this.height = height
    },
    onKeyPress(e) {
      if (e.code.indexOf("Arrow") === 0) {
        e.preventDefault()
        this.onMovePressed(e.code.substring(5).toLowerCase())
      }
    },
    onMovePressed(direction) {
      if (!this.enabled) {
        return
      }
      const newPos = Object.assign({}, this.currentPos)
      switch (direction) {
        case "up":
          if (this.validateMove(this.currentPos.x, this.currentPos.y - 1)) {
            newPos.y--
          }
          break
        case "down":
          if (this.validateMove(this.currentPos.x, this.currentPos.y + 1)) {
            newPos.y++
          }
          break
        case "left":
          if (this.validateMove(this.currentPos.x - 1, this.currentPos.y)) {
            newPos.x--
          }
          break
        case "right":
          if (this.validateMove(this.currentPos.x + 1, this.currentPos.y)) {
            newPos.x++
          }
          break
      }
      if (
        this.path.length > 1 &&
        this.path[this.path.length - 2].x === newPos.x &&
        this.path[this.path.length - 2].y === newPos.y
      ) {
        // Backwards move
        Object.assign(this.currentPos, newPos)
        this.path.pop()
      } else if (
        this.currentPos.x !== newPos.x ||
        this.currentPos.y !== newPos.y
      ) {
        Object.assign(this.currentPos, newPos)
        this.path.push(newPos)
      }
    },
    validateMove(x, y) {
      return (
        x >= 0 &&
        y >= 0 &&
        y < this.terrain.length &&
        x < this.terrain[y].length &&
        !this.terrain[y][x] &&
        !this.beenThere(x, y)
      )
    },
    beenThere(x, y) {
      for (let i = 0; i < this.path.length - 2; i++) {
        if (this.path[i].x === x && this.path[i].y === y) {
          return true
        }
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.moves-counter-container {
  justify-content: space-between;
  margin-bottom: 0.75rem;

  .moves-counter {
    align-self: center;
  }

  .control-button {
    margin: 0;
  }

  .reset-button {
    z-index: 2;
  }
}
</style>
