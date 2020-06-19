<template>
  <section class="hero is-primary is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-size-4 is-centered">
              {{ title }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true }
  }
}
</script>

<style></style>
