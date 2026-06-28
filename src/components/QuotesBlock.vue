<template>
  <section class="quotes">
    <p class="section-label">{{ t("references.label") }}</p>
    <div class="quotes-grid">
      <figure
        v-for="(reference, index) in references"
        :key="index"
        class="quotes-card"
      >
        <span class="quotes-mark">&ldquo;</span>
        <blockquote class="quotes-text">{{ reference.quote }}</blockquote>
        <figcaption class="quotes-author">
          <span class="quotes-author-avatar">{{ initials(reference.person) }}</span>
          <span class="quotes-author-meta">
            <span class="quotes-author-name">{{ reference.person }}</span>
            <span class="quotes-author-title" v-html="reference.title"></span>
          </span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm, rt } = useI18n({ useScope: "global" });

const people = ["Charles Boutens", "Rutger Bevers"];

const references = computed(() =>
  tm("references.items").map((item, index) => ({
    person: people[index],
    title: rt(item.title),
    quote: rt(item.quote),
  }))
);

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
</script>

<style lang="scss" scoped>
.quotes {
  @include section;

  .section-label { @include section-label; }

  &-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  &-card {
    @include card;
    position: relative;
    padding: 2rem 1.75rem 1.75rem;
    display: flex;
    flex-direction: column;
  }

  &-mark {
    font-size: 3rem;
    line-height: 1;
    font-weight: 700;
    color: var(--accent);
    opacity: 0.35;
    margin-bottom: 0.25rem;
  }

  &-text {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.7;
    flex: 1;
  }

  &-author {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-top: 1.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--border);

    &-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.4rem;
      height: 2.4rem;
      flex-shrink: 0;
      border-radius: 50%;
      background: var(--accent-soft);
      color: var(--accent-strong);
      font-size: 0.78rem;
      font-weight: 700;
    }

    &-meta {
      display: flex;
      flex-direction: column;
      line-height: 1.35;
    }

    &-name {
      font-weight: 600;
      color: var(--text);
      font-size: 0.92rem;
    }

    &-title {
      font-size: 0.82rem;
      color: var(--text-faint);

      :deep(a) {
        color: var(--accent);
        text-decoration: none;
        &:hover { text-decoration: underline; }
      }
    }
  }
}
</style>
