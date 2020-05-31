<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <grid-game />
        <baguenaudier />
      </div>
    </div>
  </section>
</template>

<script>
import GridGame from "~/components/GridGame.vue"
import Baguenaudier from "~/components/Baguenaudier.vue"

export default {
  components: {
    GridGame,
    Baguenaudier
  }
}
</script>
