<template>
  <div class="move-controls">
    <div class="control-button-row">
      <button
        class="control-button"
        @mousedown="$emit('movePressed', 'up')"
        @mouseup="$emit('moveReleased', 'up')"
      >
        <b-icon icon="chevron-up" size="is-large" icon-size="mdi-48px" />
      </button>
    </div>
    <div class="control-button-row">
      <button
        class="control-button"
        @mousedown="$emit('movePressed', 'left')"
        @mouseup="$emit('moveReleased', 'left')"
      >
        <b-icon icon="chevron-left" size="is-large" icon-size="mdi-48px" />
      </button>
      <button
        class="control-button"
        @mousedown="$emit('movePressed', 'right')"
        @mouseup="$emit('moveReleased', 'right')"
      >
        <b-icon icon="chevron-right" size="is-large" icon-size="mdi-48px" />
      </button>
    </div>
    <div class="control-button-row">
      <button
        class="control-button"
        @mousedown="$emit('movePressed', 'down')"
        @mouseup="$emit('moveReleased', 'down')"
      >
        <b-icon icon="chevron-down" size="is-large" icon-size="mdi-48px" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoveControls"
}
</script>

<style lang="scss" scoped>
.move-controls {
  display: flex;
  flex-direction: column;

  .control-button-row {
    display: flex;
    justify-content: center;
  }
}
</style>
