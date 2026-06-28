<template>
  <section class="experience">
    <p class="section-label">{{ t("experience.label") }}</p>
    <div
      :class="{ 'experience-timeline': true, visible }"
      v-visible="visibilityChanged"
    >
      <div
        v-for="(experience, index) in experiences"
        :key="index"
        class="experience-item"
        :style="{ '--i': index }"
      >
        <span class="experience-dot"></span>
        <div class="experience-head">
          <h3 class="experience-name">{{ experience.title }}</h3>
          <a
            v-if="experience.location_url"
            :href="experience.location_url"
            class="experience-company"
            target="_blank"
            rel="noopener"
            >{{ experience.location }}</a
          >
          <span v-else class="experience-company">{{ experience.location }}</span>
        </div>
        <p class="experience-duration">{{ experience.duration }}</p>
        <p
          v-if="experience.description"
          class="experience-description"
          v-html="experience.description"
        ></p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm, rt } = useI18n({ useScope: "global" });

const locationUrls = [
  "https://www.uman.ai/",
  "https://www.mylighthouse.com/",
  "https://idlab.technology/",
  "https://osoc.be/",
];

const experiences = computed(() =>
  tm("experience.items").map((item, index) => ({
    title: rt(item.title),
    location: rt(item.location),
    duration: rt(item.duration),
    description: rt(item.description),
    location_url: locationUrls[index],
  }))
);

const visible = ref(false);

function visibilityChanged(isVisible) {
  if (isVisible) visible.value = true;
}
</script>

<style lang="scss" scoped>
.experience {
  @include section;

  .section-label { @include section-label; }

  &-timeline {
    position: relative;
    padding-left: 1.75rem;
    border-left: 2px solid var(--border);
  }

  &-item {
    position: relative;
    padding-bottom: 2.5rem;

    &:last-child { padding-bottom: 0; }

    .visible & {
      animation: fade-up 0.6s ease both;
      animation-delay: calc(var(--i) * 0.1s);
    }
  }

  &-dot {
    position: absolute;
    left: calc(-1.75rem - 7px);
    top: 0.35rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--bg);
    border: 2px solid var(--accent);
    box-shadow: 0 0 0 4px var(--accent-soft);
  }

  &-head {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text);
  }

  &-company {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--accent);

    &[href]:hover { text-decoration: underline; }
  }

  &-duration {
    margin-top: 0.2rem;
    font-size: 0.82rem;
    color: var(--text-faint);
  }

  &-description {
    margin-top: 0.85rem;
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.7;
    max-width: 42rem;

    :deep(a) {
      color: var(--accent);
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
