<script setup>
import Header from './components/Header.vue'
import EducationBlock from './components/EducationBlock.vue'
import ExperienceBlock from './components/ExperienceBlock.vue'
</script>

<template>
  <div id="app-container">
    <Header/>
    <div class="content">
      <EducationBlock/>
      <ExperienceBlock/>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: { Header }
}
</script>

<style lang="scss">
#app-container {
  color: $grey-light;
}

.content {
  width: 100%;
}

.accent-svg {
  filter: invert(24%) sepia(43%) saturate(522%) hue-rotate(165deg) brightness(98%) contrast(86%);
}

.accent-svg-light {
  filter: invert(82%) sepia(45%) saturate(3290%) hue-rotate(341deg) brightness(102%) contrast(95%);
}
</style>
