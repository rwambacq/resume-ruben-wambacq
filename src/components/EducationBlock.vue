<template>
  <section class="education">
    <p class="section-label" data-num="01">{{ t("education.label") }}</p>
    <div class="education-grid">
      <div
        v-for="(item, index) in tm('education.items')"
        :key="index"
        class="education-cell"
        v-reveal
        :style="{ '--reveal-delay': `${index * 0.1}s` }"
      >
        <div class="education-card">
          <p class="education-duration">{{ rt(item.duration) }}</p>
          <h3 class="education-kind">{{ rt(item.kind) }}</h3>
          <p class="education-major">{{ rt(item.major) }}</p>
          <p class="education-location">{{ rt(item.location) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t, tm, rt } = useI18n({ useScope: "global" });
</script>

<style lang="scss" scoped>
.education {
  @include section;

  .section-label { @include section-label; }

  &-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem;
  }

  &-card {
    @include card;
    height: 100%;
    padding: 1.6rem;

    &:hover {
      @include card-hover;
    }
  }

  &-duration {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--accent);
    margin-bottom: 0.7rem;
  }

  &-kind {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--text);
  }

  &-major {
    color: var(--text-muted);
    margin-top: 0.15rem;
  }

  &-location {
    margin-top: 0.6rem;
    font-size: 0.9rem;
    color: var(--text-faint);
  }
}
</style>
