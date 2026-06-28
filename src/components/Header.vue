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
          <a
            v-for="(link, index) in links"
            :key="index"
            :href="link.href"
            class="hero-link"
            target="_blank"
            rel="noopener"
            :aria-label="link.name"
          >
            <span class="hero-link-icon" v-html="link.icon"></span>
            <span class="hero-link-label">{{ t(link.textKey) }}</span>
            <span class="hero-link-tip">{{ link.tip }}</span>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const links = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ruben-wambacq/",
    textKey: "header.links.linkedin",
    tip: "/ruben-wambacq/",
    icon: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.5H5.67V18h2.67V9.5zM7 6a1.55 1.55 0 1 0 0 3.1A1.55 1.55 0 0 0 7 6zm11.33 6.27c0-2.3-1.46-3.07-2.91-3.07a2.6 2.6 0 0 0-2.28 1.18h-.04V9.5h-2.56V18h2.67v-4.49c0-1.18.22-2.32 1.69-2.32 1.44 0 1.46 1.35 1.46 2.4V18h2.66l.01-5.73z"/></svg>`,
  },
  {
    name: "Github",
    href: "https://github.com/rwambacq",
    textKey: "header.links.github",
    tip: "/rwambacq/",
    icon: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.9c-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.8-4.58 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.59.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg>`,
  },
  {
    name: "Email",
    href: "mailto:ruben.wambacq@gmail.com",
    textKey: "header.links.email",
    tip: "ruben.wambacq@gmail.com",
    icon: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>`,
  },
  {
    name: "Phone",
    href: "tel:+32471325437",
    textKey: "header.links.call",
    tip: "+32 471 32 54 37",
    icon: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
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

  &-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-size: 0.88rem;
    font-weight: 500;
    transition: all 0.2s ease;

    &-icon {
      display: inline-flex;
      color: var(--text-muted);
      transition: color 0.2s ease;
    }

    &-tip {
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

    &:hover &-tip {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    &:hover {
      border-color: var(--accent);
      color: var(--accent);
      transform: translateY(-2px);
      box-shadow: var(--shadow);

      .hero-link-icon {
        color: var(--accent);
      }
    }
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
