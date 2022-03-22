<script setup>
import Header from './components/Header.vue'
import EducationBlock from './components/EducationBlock.vue'
import ExperienceBlock from './components/ExperienceBlock.vue'
import SkillsBlock from './components/SkillsBlock.vue'
import HobbyBlock from './components/HobbyBlock.vue'
import QuotesBlock from './components/QuotesBlock.vue'
</script>

<template>
  <div id="app-container">
    <Header />
    <div class="content">
      <EducationBlock ref="education"/>
      <ExperienceBlock ref="experience"/>
      <SkillsBlock ref="skills"/>
      <HobbyBlock ref="hobbies"/>
      <QuotesBlock ref="references" />
    </div>
    <div class="app-index">
      <span v-for="(block, index) in blocks" :key="index" @click="scrollToBlock(block)">{{block}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: { Header, EducationBlock, ExperienceBlock, SkillsBlock, HobbyBlock, QuotesBlock },
  data() {
    return {
      blocks: ["Education", "Experience", "Skills", "Hobbies", "References"]
    }
  },
  methods: {
    scrollToBlock(block) {
      const element = this.$refs[block.toLowerCase()].$el;
      console.log("Kletse", element);
      element.scrollIntoView({
        behavior: "smooth",
        block: "center"
      })
    }
  }
}
</script>

<style lang="scss">
#app-container {
  color: $grey-light;
  position: relative;
}

.content {
  width: 100%;

  & > * {
    padding: 1rem;
  }
}

.accent-svg {
  filter: invert(24%) sepia(43%) saturate(522%) hue-rotate(165deg) brightness(98%) contrast(86%);
}

.accent-svg-light {
  filter: invert(82%) sepia(45%) saturate(3290%) hue-rotate(341deg) brightness(102%) contrast(95%);
}

.app-index {
  position: fixed;
  left: 1rem;
  top: 50%;
  bottom: 50%;
  transform: translateY(-50%);

  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;

  & span {
    font-size: 1.2rem;
    padding: .3rem;
    margin-bottom: -1px;
    border-bottom: solid 1px $grey-dark;

    &:hover {
      border-bottom: solid 1px $accent-light;
      
      cursor: pointer;
    }
  }
}
</style>
