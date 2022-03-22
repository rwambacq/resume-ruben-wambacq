<template>
  <div class="quotes">
    <h1>References</h1>
    <div class="quotes-block">
      <div v-for="(reference, index) in references" :key="index" class="quotes-block-item">
        <p class="quotes-block-item-quote">{{reference.quote}}</p>
        <div class="quotes-block-item-author">
          <p class="quotes-block-item-author-name">{{reference.person}}</p>
          <p class="quotes-block-item-author-dot">•</p>
          <p class="quotes-block-item-author-title" v-html="reference.title"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "QuotesBlock",
  data() {
    return {
      references: [
        {
          person: "Charles Boutens",
          title: "CEO @ <a href='https://www.uman.ai/' style='color: #61FFD7; text-decoration: none;'>uman</a>",
          quote: "Ruben worked with us on developing the frontend application of uman.ai using vue.js. He is a really talented software engineer, you can see it in the speed at which he implements new features, while keeping his eye for detail. He wants things to be perfect and goes the extra mile if necessary. Clear communication and fun guy to work with allround. Also important: he can make some tasty burrito's! "
        },
        {
          person: "Rutger Bevers",
          title: "CEO @ <a href='https://www.conversationstarter.net/' style='color: #61FFD7; text-decoration: none;'>Conversation Starter</a>",
          quote: "Ruben has a broad technical skillset and the ability to improve skills, such as user interface design, very quickly. Ruben is also a sharp communicator, both inside the team as well as towards external stakeholders."
        },
      ],
      visible: false
    }
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      this.visible = isVisible;
    }
  }
}
</script>

<style lang="scss" scoped>

.quotes {
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  
  &-block {
    width: 60%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    gap: 5rem;

    margin: 2rem;

    &-item {
      width: 50%;
      text-align: start;
      &-quote {
        position: relative;
        &::before, &::after {
          content: "\"";
          color: $accent-light;
          font-size: 3rem;
          font-style: italic;
          position: absolute;
        }

        &::before {
          top: -1.5rem;
          left: -1.5rem;
        }

        &::after {
          bottom: -1.5rem;
          right: 0;
        }

      }

      &-author {
        display: flex;
        margin: 1.5rem;
        gap: 2rem;

        &-name {

        }

        &-dot {

          color: $accent-light;
        }

        &-title {
        }
      }
    }
  }
}

h1 {
  color: $accent-light;
  font-size: 1.8rem;
  font-weight: 500;
}
</style>