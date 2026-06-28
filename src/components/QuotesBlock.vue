<template>
  <section class="quotes">
    <p class="section-label">References</p>
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
const references = [
  {
    person: "Charles Boutens",
    title: "CEO @ <a href='https://www.uman.ai/'>uman</a>",
    quote:
      "Ruben worked with us on developing the frontend application of uman.ai using vue.js. He is a really talented software engineer, you can see it in the speed at which he implements new features, while keeping his eye for detail. He wants things to be perfect and goes the extra mile if necessary. Clear communication and fun guy to work with all round. Also important: he can make some tasty burritos!",
  },
  {
    person: "Rutger Bevers",
    title:
      "CEO @ <a href='https://www.conversationstarter.net/'>Conversation Starter</a>",
    quote:
      "Ruben has a broad technical skillset and the ability to improve skills, such as user interface design, very quickly. Ruben is also a sharp communicator, both inside the team as well as towards external stakeholders.",
  },
];

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
