<template>
  <div class="path-grid is-flex is-centered">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
export default {
  name: "PathGrid",
  props: {
    terrain: { type: Array, required: true },
    path: { type: Array, required: true },
    dest: { type: Object, required: true },
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
    },
    width() {
      this.$nextTick(() => {
        this.draw()
      })
    },
    height() {
      this.$nextTick(() => {
        this.draw()
      })
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
      this.drawDest()
    },
    clearCanvas() {
      this.canvas.clearRect(0, 0, this.width, this.height)
    },
    drawTerrain() {
      this.canvas.strokeStyle = "#363636"
      this.canvas.fillStyle = "#363636"
      this.canvas.lineWidth = 1
      this.canvas.strokeRect(0, 0, this.width, this.height)
      for (let i = 0; i < this.terrain.length; i++) {
        for (let j = 0; j < this.terrain[i].length; j++) {
          if (this.terrain[i][j]) {
            this.canvas.fillRect(
              j * this.squareWidth,
              i * this.squareHeight,
              this.squareWidth,
              this.squareHeight
            )
          }
        }
      }
    },
    drawDest() {
      const x = this.dest.x * this.squareWidth + this.squareWidth / 2
      const y = this.dest.y * this.squareHeight + this.squareHeight / 2
      this.canvas.fillStyle = "#247540"
      this.canvas.beginPath()
      this.canvas.arc(x, y, this.squareWidth / 2.25, 0, 2 * Math.PI, false)
      this.canvas.fill()
      this.canvas.beginPath()
      this.canvas.fillStyle = "#48c774"
      this.canvas.arc(x, y, this.squareWidth / 4.5, 0, 2 * Math.PI, false)
      this.canvas.fill()
    },
    drawPath() {
      this.canvas.strokeStyle = "#ff3860"
      this.canvas.fillStyle = "#ff3860"
      this.canvas.lineWidth = this.squareWidth / 2

      this.canvas.beginPath()
      if (this.path.length === 1) {
        const x = this.path[0].x * this.squareWidth + this.squareWidth / 2
        const y = this.path[0].y * this.squareHeight + this.squareHeight / 2
        this.canvas.moveTo(x - this.canvas.lineWidth / 2, y)
        this.canvas.lineTo(x + this.canvas.lineWidth / 2, y)
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
