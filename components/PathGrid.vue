<template>
  <div class="path-grid">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
export default {
  name: "PathGrid",
  props: {
    terrain: { type: Array, required: true },
    path: { type: Array, required: true },
    width: { type: Number, default: 400 },
    height: { type: Number, default: 400 }
  },
  data() {
    return {
      canvas: null
    }
  },
  computed: {
    squareWidth() {
      return this.width / this.terrain.length
    },
    squareHeight() {
      return this.height / this.terrain.length
    }
  },
  watch: {
    terrain() {
      this.draw()
    },
    path() {
      this.draw()
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas.getContext("2d")
    this.draw()
  },
  methods: {
    draw() {
      this.clearCanvas()
      this.drawTerrain()
      this.drawPath()
    },
    clearCanvas() {
      this.canvas.clearRect(0, 0, this.width, this.height)
    },
    drawTerrain() {
      this.canvas.strokeStyle = "#000000"
      this.canvas.fillStyle = "#000000"
      this.canvas.lineWidth = 1
      for (let i = 0; i < this.terrain.length; i++) {
        for (let j = 0; j < this.terrain[i].length; j++) {
          if (this.terrain[i][j]) {
            this.canvas.fillRect(
              j * this.squareWidth,
              i * this.squareHeight,
              this.squareWidth,
              this.squareHeight
            )
          } else {
            this.canvas.strokeRect(
              j * this.squareWidth,
              i * this.squareHeight,
              this.squareWidth,
              this.squareHeight
            )
          }
        }
      }
    },
    drawPath() {
      this.canvas.strokeStyle = "#FF0000"
      this.canvas.fillStyle = "#FF0000"
      this.canvas.lineWidth = 10

      this.canvas.beginPath()
      if (this.path.length === 1) {
        const x = this.path[0].x * this.squareWidth + this.squareWidth / 2
        const y = this.path[0].y * this.squareHeight + this.squareHeight / 2
        this.canvas.moveTo(x - 5, y)
        this.canvas.lineTo(x + 5, y)
      } else {
        for (let i = 0; i < this.path.length; i++) {
          const x = this.path[i].x * this.squareWidth + this.squareWidth / 2
          const y = this.path[i].y * this.squareHeight + this.squareHeight / 2

          if (i === 0) {
            this.canvas.moveTo(x, y)
          } else {
            this.canvas.lineTo(x, y)
          }
        }
      }
      this.canvas.stroke()
    }
  }
}
</script>
