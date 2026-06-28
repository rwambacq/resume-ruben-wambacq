<template>
  <section class="experience">
    <p class="section-label" data-num="02">{{ t("experience.label") }}</p>
    <div class="experience-timeline" ref="timelineRef">
      <span class="experience-line" aria-hidden="true">
        <span class="experience-line-fill" :style="{ transform: `scaleY(${lineProgress})` }"></span>
      </span>
      <div
        v-for="(experience, index) in experiences"
        :key="index"
        class="experience-item"
        v-reveal
        :style="{ '--reveal-delay': `${index * 0.08}s` }"
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
import { useElementBounding, useWindowSize } from "@vueuse/core";
import { useReducedMotion } from "../composables/useReducedMotion";

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

const timelineRef = ref(null);
const { top, height } = useElementBounding(timelineRef);
const { height: viewportHeight } = useWindowSize();
const { reducedMotion } = useReducedMotion();

const lineProgress = computed(() => {
  if (reducedMotion.value) return 1;
  if (!height.value) return 0;
  const anchor = viewportHeight.value * 0.55;
  return Math.min(1, Math.max(0, (anchor - top.value) / height.value));
});
</script>

<style lang="scss" scoped>
.experience {
  @include section;

  .section-label { @include section-label; }

  &-timeline {
    position: relative;
    padding-left: 1.75rem;
  }

  &-line {
    position: absolute;
    left: 0;
    top: 0.35rem;
    bottom: 0.35rem;
    width: 2px;
    background: var(--border);
    overflow: hidden;

    &-fill {
      position: absolute;
      inset: 0;
      transform-origin: top;
      background: linear-gradient(180deg, var(--accent), var(--accent-strong));
      box-shadow: 0 0 10px var(--accent-soft);
    }
  }

  &-item {
    position: relative;
    padding-bottom: 2.5rem;

    &:last-child { padding-bottom: 0; }
  }

  &-dot {
    position: absolute;
    left: calc(-1.75rem - 6px);
    top: 0.35rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--surface);
    border: 2px solid var(--border-strong);
    transition: border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;
  }

  &-item.reveal--in &-dot {
    background: var(--bg);
    border-color: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-soft), 0 0 12px var(--accent-soft);
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
</style>
