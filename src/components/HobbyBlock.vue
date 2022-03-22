<template>
  <div class="hobby">
    <h1>Hobbies</h1>
    <ul class="hobby-list">
      <li v-for="(hobby, index) in hobbies" :key="index" class="hobby-list-item">{{hobby}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "SkillsBlock",
  data() {
    return {
      hobbies: ["Drawing", "3D Modeling & Design", "D&D", "Cooking", "Gaming"],
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

.hobby {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  &-list {
    margin: 2rem;
    &-item {
      padding: .3rem;
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

h1 {
  color: $accent-light;
  font-size: 1.8rem;
  font-weight: 500;
}
</style>