<template>
  <section class="hobbies">
    <p class="section-label">Hobbies</p>
    <div class="hobbies-list">
      <span v-for="(hobby, index) in hobbies" :key="index" class="hobbies-item">
        <span class="hobbies-icon" v-html="hobby.icon"></span>
        {{ hobby.name }}
      </span>
    </div>
  </section>
</template>

<script setup>
const hobbies = [
  { name: "Woodworking", icon: "🪚" },
  { name: "Cooking", icon: "🍳" },
  { name: "Drawing", icon: "✏️" },
  { name: "Boardgames", icon: "🎲" },
  { name: "Video games", icon: "🎮" },
];
</script>

<style lang="scss" scoped>
.hobbies {
  @include section;

  .section-label { @include section-label; }

  &-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  &-item {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.6rem 1.1rem;
    border-radius: 14px;
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    font-size: 0.92rem;
    font-weight: 500;
    color: var(--text);
    transition: transform 0.2s ease, border-color 0.2s ease;

    &:hover {
      transform: translateY(-3px);
      border-color: var(--accent);
    }
  }

  &-icon {
    font-size: 1.05rem;
    line-height: 1;
  }
}
</style>
