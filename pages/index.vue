<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <path-grid :terrain="terrain" :path="path" />
        <move-controls
          @movePressed="onMovePressed"
          @moveReleased="onMoveReleased"
        />
      </div>
    </div>
  </section>
</template>

<script>
import MoveControls from "~/components/MoveControls.vue"
import PathGrid from "~/components/PathGrid.vue"

export default {
  components: {
    MoveControls,
    PathGrid
  },
  data() {
    return {
      terrain: [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1]
      ],
      path: [{ x: 0, y: 0 }],
      currentPos: { x: 0, y: 0 }
    }
  },
  methods: {
    onMovePressed(direction) {
      console.log(direction, "pressed")
      switch (direction) {
        case "up":
          this.currentPos.y--
          break
        case "down":
          this.currentPos.y++
          break
        case "left":
          this.currentPos.x--
          break
        case "right":
          this.currentPos.x++
          break
      }
      const newPos = Object.assign({}, this.currentPos)
      this.path.push(newPos)
    },
    onMoveReleased(direction) {
      console.log(direction, "released")
    }
  }
}
</script>
