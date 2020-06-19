<template>
  <section class="hero is-primary is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
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
      </div>
    </div>
  </section>
</template>

<script>
import Baguenaudier from "~/components/Baguenaudier.vue"

export default {
  components: {
    Baguenaudier
  }
}
</script>
