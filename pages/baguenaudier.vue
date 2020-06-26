<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-size-4 is-centered">
        Baguenaudier
      </p>
    </header>
    <div class="card-content">
      <div class="content is-flex is-flex-column is-centered">
        <baguenaudier />
      </div>
    </div>
  </div>
</template>

<script>
import Baguenaudier from "~/components/Baguenaudier.vue"

export default {
  components: {
    Baguenaudier
  },
  beforeMount() {
    if (!this.$auth.loggedIn) {
      this.$router.push("/login")
    }
  }
}
</script>
