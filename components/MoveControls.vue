<template>
  <div class="move-controls">
    <div class="button-row">
      <button
        class="button"
        @mousedown="$emit('movePressed', 'up')"
        @mouseup="$emit('moveReleased', 'up')"
      >
        <b-icon icon="chevron-up" size="is-large" icon-size="mdi-48px" />
      </button>
    </div>
    <div class="button-row">
      <button
        class="button"
        @mousedown="$emit('movePressed', 'left')"
        @mouseup="$emit('moveReleased', 'left')"
      >
        <b-icon icon="chevron-left" size="is-large" icon-size="mdi-48px" />
      </button>
      <button
        class="button"
        @mousedown="$emit('movePressed', 'right')"
        @mouseup="$emit('moveReleased', 'right')"
      >
        <b-icon icon="chevron-right" size="is-large" icon-size="mdi-48px" />
      </button>
    </div>
    <div class="button-row">
      <button
        class="button"
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

  .button {
    width: 40px;
    height: 40px;
    padding: 0;
    margin: 0 20px;
    border: none;
    border-radius: 50%;
    box-shadow: none;
    transition: transform 0.1s ease, background-color 0.1s ease;

    &:active {
      background-color: rgba(0, 0, 0, 0.1);
      transform: scale(1.15);
    }
  }

  .button-row {
    display: flex;
    justify-content: center;
  }
}
</style>
