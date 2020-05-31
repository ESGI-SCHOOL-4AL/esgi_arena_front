<template>
  <div class="baguenaudier">
    <span v-for="(val, index) in grid" :key="index" class="baguenaudier-box">
      <input
        v-model="grid[index].checked"
        :value="val.checked"
        type="checkbox"
        :disabled="val.disabled"
        @change="onChange"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: "Baguenaudier",
  props: {
    size: { type: Number, default: 4 }
  },
  data() {
    return {
      grid: []
    }
  },
  beforeMount() {
    this.grid = []
    for (let i = 0; i < this.size; i++) {
      this.grid.push({ checked: true, disabled: true })
    }
    this.onChange()
  },
  methods: {
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
