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
      <div class="card">
        <header class="card-header solution-header" @click="toggleSolution()">
          <p class="card-header-title">
            Solution
          </p>
          <div class="card-header-icon">
            <span class="icon">
              <b-icon
                :icon="solution ? 'chevron-down' : 'chevron-up'"
                size="is-medium"
                icon-size="mdi-24px"
              />
            </span>
          </div>
        </header>
        <div :class="{ 'card-content': true, 'is-hidden': !solution }">
          <div class="content is-flex is-flex-column is-centered">
            <baguenaudier ref="solution" :size="size" :enabled="false" />
          </div>
        </div>
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
      size: 4,
      solution: null,
      interval: null,
      current: 0
    }
  },
  watch: {
    size: {
      handler() {
        this.stopSolution()
        this.solution = null
      }
    }
  },
  beforeMount() {
    if (!this.$auth.loggedIn) {
      this.$router.push("/login")
    }
  },
  methods: {
    async toggleSolution() {
      if (!this.solution) {
        await this.fetchSolution()
        this.playSolution()
      } else {
        this.stopSolution()
        this.solution = null
      }
    },
    async fetchSolution() {
      try {
        const res = await this.$axios.$post(
          "/algorithm/chinese-rings",
          this.size
        )
        this.solution = res
        for (let i = 0; i < this.solution.length; i++) {
          for (let j = 0; j < this.solution[i].length; j++) {
            this.solution[i][j] = !this.solution[i][j]
          }
        }
      } catch (err) {
        console.error(err)
      }
    },
    playSolution() {
      this.interval = setInterval(() => {
        this.$refs.solution.update(this.solution[this.current])
        this.current++
        if (this.current === this.solution.length) {
          this.stopSolution()
        }
      }, 1000)
    },
    stopSolution() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
      this.current = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.solution-header {
  &:hover {
    cursor: pointer;
  }
}
</style>
