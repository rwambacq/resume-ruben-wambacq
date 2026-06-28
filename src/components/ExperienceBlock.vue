<template>
  <section class="experience">
    <p class="section-label">Experience</p>
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
import { ref } from "vue";

const experiences = [
  {
    title: "Senior front-end developer",
    location: "uman",
    location_url: "https://www.uman.ai/",
    duration: "Summer 2021 & September 2022 — Present",
    description:
      "An internship, turned summer job, turned full-time job. As main frontend developer, I was responsible for implementing new features and maintaining the existing codebase of the uman web-app, mobile app and various smaller projects. This was done using Vue.js.",
  },
  {
    title: "Front-end developer",
    location: "Lighthouse",
    location_url: "https://www.mylighthouse.com/",
    duration: "February 2022 — May 2022",
    description:
      "A part-time job in which I was responsible for implementing a new design for the existing web-app. This was done using Ember.js and Typescript.",
  },
  {
    title: "Front-end developer",
    location: "IDLab imec Ghent",
    location_url: "https://idlab.technology/",
    duration: "July 2020 — December 2020",
    description:
      "Implementation of the UnSHACLed application to go along with the <a href='https://www.researchgate.net/publication/356502382_Visual_notations_for_viewing_RDF_constraints_with_UnSHACLed'>research paper</a> of PhD student Sven Lieber. This application uses Vue.js along with Konva.js to draw and create interactive representations of SHACL constraint graphs.",
  },
  {
    title: "Full stack developer",
    location: "Open summer of code",
    location_url: "https://osoc.be/",
    duration: "July 2019",
    description:
      "In cooperation with Engie, a prototype AI app was developed to detect emotions of callcenter employees and customers. This was made possible using an LSTM machine learning model, developed in Keras (Python) and using a frontend created in React to display the results.",
  },
];

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
