<template>
  <div class="grid-game">
    <path-grid :terrain="terrain" :path="path" :dest="dest" />
    <move-controls @movePressed="onMovePressed" />
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
  data() {
    return {
      terrain: [
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0]
      ],
      path: [{ x: 0, y: 0 }],
      currentPos: { x: 0, y: 0 },
      dest: { x: 0, y: 0 }
    }
  },
  beforeMount() {
    const level = Generator.generate(15)
    this.terrain = level.grid
    Object.assign(this.currentPos, level.start)
    Object.assign(this.path[0], level.start)
    Object.assign(this.dest, level.end)
  },
  mounted() {
    window.addEventListener("keyup", this.onKeyPress)
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.onKeyPress)
  },
  methods: {
    onKeyPress(e) {
      if (e.code.indexOf("Arrow") === 0) {
        this.onMovePressed(e.code.substring(5).toLowerCase())
      }
    },
    onMovePressed(direction) {
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

<style></style>
