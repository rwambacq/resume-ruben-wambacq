<template>
  <header class="hero">
    <div class="hero-inner">
      <div class="hero-intro">
        <p class="hero-greeting" v-reveal style="--reveal-delay: 0.05s">
          {{ t("header.greeting") }}
        </p>

        <h1 class="hero-name" :class="{ 'is-ready': ready }">
          <span
            v-for="(word, index) in nameLines"
            :key="index"
            class="hero-name-mask"
          >
            <span class="hero-name-line" :style="{ '--line': index }">{{ word }}</span>
          </span>
        </h1>

        <p class="hero-role" v-reveal style="--reveal-delay: 0.35s">
          {{ t("header.role") }}
        </p>
        <p class="hero-tagline top" v-reveal style="--reveal-delay: 0.45s">
          {{ t("header.taglineTop") }}
        </p>
        <p class="hero-tagline" v-reveal style="--reveal-delay: 0.55s">
          {{ t("header.taglineBottom") }}
        </p>

        <div class="hero-links" v-reveal style="--reveal-delay: 0.65s">
          <Button
            v-for="(link, index) in links"
            :key="index"
            :href="link.href"
            :icon="link.icon"
            target="_blank"
            rel="noopener"
            :aria-label="link.name"
          >
            {{ t(link.textKey) }}
            <template #append>
              <span class="hero-link-tip">{{ link.tip }}</span>
            </template>
          </Button>
        </div>
      </div>

      <div class="hero-photo-wrap" :style="photoStyle">
        <div class="hero-photo-glow" :style="glowStyle"></div>
        <img
          src="../assets/headshot.webp"
          alt="Ruben Wambacq"
          class="hero-photo"
        />
        <span class="hero-status">
          <span class="hero-status-dot"></span>
          {{ t("header.status") }}
        </span>
      </div>
    </div>

    <div class="hero-scroll-hint" aria-hidden="true">
      <span class="hero-scroll-line"></span>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useMouse, useWindowSize } from "@vueuse/core";
import Button from "./library/Button.vue";
import { useReducedMotion } from "../composables/useReducedMotion";

const { t } = useI18n({ useScope: "global" });

const ready = ref(false);
onMounted(() => (ready.value = true));

const nameLines = computed(() => t("header.name").split(" "));

const { x, y } = useMouse({ type: "client" });
const { width, height } = useWindowSize();
const { reducedMotion, finePointer } = useReducedMotion();
const parallaxOn = computed(() => !reducedMotion.value && finePointer.value);

const offset = computed(() => ({
  dx: x.value / width.value - 0.5,
  dy: y.value / height.value - 0.5,
}));

const photoStyle = computed(() =>
  parallaxOn.value
    ? { transform: `translate3d(${offset.value.dx * -18}px, ${offset.value.dy * -18}px, 0)` }
    : {}
);
const glowStyle = computed(() =>
  parallaxOn.value
    ? { transform: `translate3d(${offset.value.dx * 34}px, ${offset.value.dy * 34}px, 0)` }
    : {}
);

const links = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ruben-wambacq/",
    textKey: "header.links.linkedin",
    tip: "/ruben-wambacq/",
    icon: ["fab", "linkedin"],
  },
  {
    name: "Github",
    href: "https://github.com/rwambacq",
    textKey: "header.links.github",
    tip: "/rwambacq/",
    icon: ["fab", "github"],
  },
  {
    name: "Email",
    href: "mailto:ruben.wambacq@gmail.com",
    textKey: "header.links.email",
    tip: "ruben.wambacq@gmail.com",
    icon: "envelope",
  },
  {
    name: "Phone",
    href: "tel:+32471325437",
    textKey: "header.links.call",
    tip: "+32 471 32 54 37",
    icon: "phone",
  },
];
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  // contain the decorative photo glow + hover tooltips so they never push
  // horizontal page scroll on narrow screens. clip (not hidden) preserves the
  // sticky nav and lets tooltips still overflow vertically.
  overflow-x: clip;
  padding: 7rem 1.25rem 5rem;

  &-inner {
    max-width: 880px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 3.5rem;
  }

  &-greeting {
    color: var(--accent);
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 0.04em;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;

    &::before {
      content: "";
      width: 1.6rem;
      height: 1px;
      background: var(--accent);
    }
  }

  &-name {
    font-size: clamp(3rem, 9vw, 5.5rem);
    font-weight: 700;
    line-height: 1.02;
    letter-spacing: -0.03em;
    margin: 0.5rem 0 0.8rem;
    color: var(--text);
  }

  &-name-mask {
    display: block;
    overflow: hidden;
    padding-bottom: 0.16em;
    margin-bottom: -0.12em;
  }

  &-name-line {
    display: block;
    transform: translateY(110%);
  }

  &-name.is-ready &-name-line {
    animation: line-rise 1s var(--ease-cinematic) both;
    animation-delay: calc(0.12s + var(--line) * 0.12s);
  }

  &-name-mask:last-child &-name-line {
    background: linear-gradient(120deg, var(--accent), var(--accent-strong));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  &-role {
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--text-muted);
  }

  &-tagline {
    &.top {
      margin-top: 1.1rem;
    }
    max-width: 34rem;
    color: var(--text-muted);
    font-size: 1rem;
    line-height: 1.7;
  }

  &-links {
    margin-top: 1.9rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
  }

  &-photo-wrap {
    position: relative;
    flex-shrink: 0;
    animation: rise 0.9s var(--ease-cinematic) both;
    will-change: transform;
  }

  &-photo-glow {
    position: absolute;
    inset: -18%;
    z-index: -1;
    border-radius: 50%;
    background: radial-gradient(circle, var(--accent-soft), transparent 65%);
    filter: blur(28px);
    will-change: transform;
  }

  &-photo {
    width: 280px;
    height: 280px;
    object-fit: cover;
    border-radius: 18px;
    border: 1px solid var(--border-strong);
    box-shadow: var(--glow), var(--shadow);
  }

  &-status {
    position: absolute;
    bottom: -0.9rem;
    left: 50%;
    transform: translateX(-50%);
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    white-space: nowrap;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    color: var(--text-muted);

    &-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-soft);
      animation: pulse-dot 2.4s ease-in-out infinite;
    }
  }

  &-link-tip {
    position: absolute;
    bottom: calc(100% + 0.55rem);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    white-space: nowrap;
    padding: 0.4rem 0.7rem;
    border-radius: 8px;
    background: var(--text);
    color: var(--bg);
    font-size: 0.78rem;
    font-weight: 500;
    box-shadow: var(--shadow);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: var(--text);
    }
  }

  &-links :deep(.button:hover) .hero-link-tip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  &-scroll-hint {
    display: flex;
    justify-content: center;
    margin-top: 3.5rem;
  }

  &-scroll-line {
    width: 1px;
    height: 3rem;
    background: linear-gradient(180deg, var(--accent), transparent);
    animation: scroll-pulse 2s var(--ease-cinematic) infinite;
    transform-origin: top;
  }
}

@keyframes line-rise {
  from { transform: translateY(110%); }
  to { transform: translateY(0); }
}

@keyframes rise {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 3px var(--accent-soft); }
  50% { box-shadow: 0 0 0 6px var(--accent-soft); }
}

@keyframes scroll-pulse {
  0% { transform: scaleY(0); opacity: 0; }
  40% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(1) translateY(3rem); opacity: 0; }
}

@media (max-width: 720px) {
  .hero {
    padding-top: 4.5rem;

    &-inner {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
      gap: 3rem;
    }
    &-intro {
      order: 2;
    }
    &-photo-wrap {
      order: 1;
    }
    &-greeting {
      justify-content: center;
    }
    &-tagline {
      margin-left: auto;
      margin-right: auto;
    }
    &-links {
      justify-content: center;
    }
  }
}
</style>
