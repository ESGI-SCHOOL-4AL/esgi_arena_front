<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
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

export default {
  components: {
    MoveControls
  },
  methods: {
    onMovePressed(direction) {
      console.log(direction, "pressed")
    },
    onMoveReleased(direction) {
      console.log(direction, "released")
    }
  }
}
</script>
