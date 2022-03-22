<template>
  <div class="skills">
    <h1>Skills</h1>
    <div class="skills-block">
      <div class="skills-block-proficiencies">
        <h2>Proficiencies</h2>
        <ul>
          <li v-for="(proficiency, index) in proficiencies" :key="index" class="skills-block-proficiencies-item">{{proficiency}}</li>
        </ul>
      </div>
      <div class="skills-block-experiences">
        <h2>Experience</h2>
        <ul>
          <li v-for="(experience, index) in experience" :key="index" class="skills-block-experiences-item">{{experience}}</li>
        </ul>
      </div>
    </div>
    <h2>Languages</h2>
    <div class="skills-languages">
      <div v-for="(language, index) in Object.keys(languages)" :key="index">
        <ProgressBar :value="languages[language]" :max="10" :name="language" class="skills-languages-item"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from './visualisation/ProgressBar.vue'

export default {
  name: "SkillsBlock",
  components: {ProgressBar},
  data() {
    return {
      proficiencies: ["Web Development", "Design", "Styling", "Scripting Languages"],
      experience: ["Data Science", "Java", "C/C++", "Android development", "SQL/NoSQL Databases", "Linked Data"],
      languages: { // With a score /10 of skill level
        Dutch: 10,
        English: 8.5,
        French: 5.5
      },
      visible: false
    }
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      this.visible = isVisible;
    }
  }
}
</script>

<style lang="scss" scoped>

.skills {
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  &-languages {
    width: 50%;
    margin: 2rem;

    &-item {
      margin: .4rem;
    }
  }

  &-block {
    width: 60%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    text-align: start;

    & > * {
      & ul {
        margin-top: 1rem;
      }
    }

    &-proficiencies {
      &-item {
        padding: .2rem;

        &::before {
          content: "\2022";
          color: $accent-light;
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }
      }
    }

    &-experiences {
      &-item {
        padding: .2rem;

        &::before {
          content: "\2022";
          color: $accent-light;
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }
      }
    }
  }
}

h1 {
  color: $accent-light;
  font-size: 1.8rem;
  font-weight: 500;
}

h2 {
  width: 60%;
  text-align: left;
  font-size: 1.7rem;
  font-weight: 500;

  width: 100%;
  text-align: center;
  padding: 2rem 0 0 0;
}
</style>