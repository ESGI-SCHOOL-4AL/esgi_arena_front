<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-size-4 is-centered">
        Baguenaudier
      </p>
    </header>
    <div class="card-content">
      <div class="is-flex is-centered content">
        <div class="field is-horizontal">
          <div class="field-label is-normal is-paddingless">
            <label class="label">Difficulté</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  v-model.number="size"
                  class="slider is-primary is-circle is-marginless"
                  step="1"
                  min="4"
                  max="15"
                  type="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content is-flex is-flex-column is-centered">
        <baguenaudier :size="size" />
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
  transition: "fade",
  data() {
    return {
      size: 4
    }
  },
  beforeMount() {
    if (!this.$auth.loggedIn) {
      this.$router.push("/login")
    }
  }
}
</script>
