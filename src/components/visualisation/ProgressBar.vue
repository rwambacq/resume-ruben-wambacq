<template>
  <div class="progress-bar">
    <div v-if="name !== ''" class="progress-bar-name">
      {{name}}
    </div>
    <div class="progress-bar-slider" v-visible="visibilityChanged">
      <div class="progress-bar-slider-fill" :style="progressBarFill"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    value: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      canAnimate: false
    }
  },
  computed: {
    progressBarFill() {
      const ratio = this.canAnimate ? Math.round((this.value / this.max) * 100) : 0
      return `width: ${ratio}%`
    }
  },
  methods: {
    visibilityChanged(isVisible) {
      this.canAnimate = isVisible;
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  display: grid;
  grid-template-columns: 30% auto;

  &-name {
    text-align: start;
    display: flex;
    align-items: center;
  }

  &-slider {
    border: 2px solid $accent-light;
    height: 1rem;
    border-radius: 4px;
    padding: 2px;

    &-fill {
      height: 100%;
      background: $accent-light;
      filter: brightness(.7);
      border-radius: 2px;
      transition: width 1s ease;
    }
  }
}
</style>