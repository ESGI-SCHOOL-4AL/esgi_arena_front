<template>
  <div class="baguenaudier">
    <span v-for="(val, index) in grid" :key="index" class="field">
      <input
        v-model="grid[index].checked"
        class="is-checkradio is-large"
        type="checkbox"
        :value="val.checked"
        :disabled="val.disabled || !enabled"
        :name="'baguenaudier-box-' + index"
      />
      <label :for="'baguenaudier-box-' + index" @click="onClick(val)"></label>
    </span>
  </div>
</template>

<script>
export default {
  name: "Baguenaudier",
  props: {
    size: { type: Number, default: 4 },
    enabled: { type: Boolean, default: true }
  },
  data() {
    return {
      grid: []
    }
  },
  watch: {
    size: {
      handler(val) {
        this.reset()
      }
    }
  },
  beforeMount() {
    this.reset()
  },
  methods: {
    onClick(val) {
      if (!val.disabled) {
        val.checked = !val.checked
        this.onChange()
      }
    },
    update(grid) {
      if (grid.length !== this.size) {
        throw new Error("Grid length must be the same as the component length")
      }
      for (let i = 0; i < this.size; i++) {
        this.grid[i].checked = grid[i]
      }
    },
    reset() {
      this.grid = []
      for (let i = 0; i < this.size; i++) {
        this.grid.push({ checked: true, disabled: true })
      }
      this.onChange()
    },
    onChange() {
      if (this.checkVictory()) {
        for (let i = 0; i < this.grid.length; i++) {
          this.grid[i].disabled = true
        }
        return
      }
      this.grid[0].disabled = false

      for (let i = 1; i < this.size; i++) {
        this.grid[i].disabled = false
        if (this.grid[i - 1].checked) {
          for (let j = i - 2; j >= 0; j--) {
            if (this.grid[j].checked) {
              this.grid[i].disabled = true
              break
            }
          }
        } else {
          for (let j = i - 2; j >= 0; j--) {
            if (!this.grid[j].checked) {
              this.grid[i].disabled = true
              break
            }
          }
        }
      }
    },
    checkVictory() {
      for (let i = 0; i < this.grid.length; i++) {
        if (this.grid[i].checked) {
          return false
        }
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.field:last-child {
  label {
    margin-right: 0;
  }
}

.is-checkradio[type="checkbox"].is-large + label {
  padding-left: 2.25rem;
  padding-right: 0;
}

.is-checkradio[type="checkbox"].is-large + label::after,
.is-checkradio[type="checkbox"].is-large + label::after {
  width: 1.75rem;
  height: 1.75rem;
  top: 0.25rem;
  left: 0.25rem;
  transform: rotate(0);
  border: none;
  border-radius: 4px;
  background-color: $primary;
}
</style>
