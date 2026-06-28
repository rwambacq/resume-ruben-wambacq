<template>
  <header class="hero">
    <div class="hero-inner">
      <div class="hero-photo-wrap">
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

      <div class="hero-intro">
        <p class="hero-greeting">{{ t("header.greeting") }}</p>
        <h1 class="hero-name">{{ t("header.name") }}</h1>
        <p class="hero-role">{{ t("header.role") }}</p>
        <p class="hero-tagline top">
          {{ t("header.taglineTop") }}
        </p>
        <p class="hero-tagline">
          {{ t("header.taglineBottom") }}
        </p>

        <div class="hero-links">
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
    </div>
  </header>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import Button from "./library/Button.vue";

const { t } = useI18n({ useScope: "global" });

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
  padding: 5.5rem 1.25rem 4rem;

  &-inner {
    max-width: 880px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 3.5rem;
  }

  &-photo-wrap {
    position: relative;
    flex-shrink: 0;
    animation: rise 0.7s ease both;
  }

  &-photo {
    width: 280px;
    height: 280px;
    object-fit: cover;
    border-radius: 12px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
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
    }
  }

  &-intro {
    animation: rise 0.7s 0.1s ease both;
  }

  &-greeting {
    color: var(--accent);
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 0.02em;
  }

  &-name {
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0.3rem 0 0.5rem;
    color: var(--text);
  }

  &-role {
    font-size: 1.25rem;
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
    margin-top: 1.8rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
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
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 680px) {
  .hero {
    padding-top: 3.5rem;

    &-inner {
      flex-direction: column;
      text-align: center;
      gap: 2.5rem;
    }
    &-name {
      font-size: 2.4rem;
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
