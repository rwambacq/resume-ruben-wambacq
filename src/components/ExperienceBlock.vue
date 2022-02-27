<template>
  <div class="experience-wrapper">
    <h1>Experience</h1>
    <div class="experience-list">
      <div v-for="(experience, index) in experiences" :key="index" class="experience">
        <div class="experience-dot"></div>
        <div class="experience-info">
          <p class="experience-name">{{experience.title}}</p>
          <div class="experience-location">
            <p class="highlight">@</p>
            <p v-if="experience.location_url !== ''">
              <a :href="experience.location_url">{{experience.location}}</a>
            </p>
            <p v-else>{{experience.location}}</p>
          </div>
          <p class="experience-duration">{{experience.duration}}</p>
          <P v-if="experience.description !== ''" class="experience-description">{{experience.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExperienceBlock",
  data() {
    return {
      experiences:
        [
          {
            title: "Front-end engineer",
            location: "uman",
            location_url: "https://www.uman.ai/",
            duration: "July 2021 - August 2021",
            description: "An internship that extended into a summer job, where I was the lead front-end engineer. I used Vue.js along with Typescript to add features to the existing web-app, implement redesigns and UI/UX improvements."
          },
          {
            title: "Front-end engineer",
            location: "IDLab imec Ghent",
            location_url: "https://idlab.technology/",
            duration: "July 2020 - December 2020",
            description: "A summer job that turned into a part-time job in which the application UnSHACLed had to be developed to go along with the <a href='http://www.semantic-web-journal.net/content/visual-notations-viewing-rdf-constraints-unshacled'>research paper</a> of PhD student Sven Lieber. This application uses Vue.js along with Konva.js to draw and create interactive representations of SHACL constraint graphs."
          },
          {
            title: "Full stack developer",
            location: "Open summer of code",
            location_url: "https://osoc.be/",
            duration: "July 2019",
            description: "In cooperation with Engie, a prototype application was developed here to detect emotions of callcenter employees and customers in their voice. This was made possible using an LSTM machine learning model, developed in Keras (Python ML framework) and using a frontend created in React to display the results."
          },
          {
            title: "Sales, customer relations, catering &amp administration",
            location: "Several non-computer science related companies",
            location_url: "",
            duration: "Summers 2014 - 2018",
            description: ""
          }
        ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .experience-wrapper {
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  h1 {
    color: $accent-light;
    font-size: 1.8rem;
    font-weight: 500;
  }

  .experience-list {
    text-align: left;
    width: fit-content;
    margin: 2rem 1rem;
    display: flex;
    flex-flow: column wrap;
    gap: 2rem;
    padding: 0 2rem;

    border-left: 1px solid $accent-light;
  }

  .experience {
    line-height: 1.5rem;
    display: flex;
    align-items: center;
    gap: 2rem;

    &-dot {
      width: .5rem;
      height: .5rem;
      background: #1C1C1C;
      border: 2px solid $accent-light;
      border-radius: 100%;
      margin-left: -2.5rem;
    }

    &-name {
      font-size: 1.3rem;
      color: $grey-lightest;
    }

    &-location {
      display: flex;
      gap: 1rem;
    }

    & .highlight {
      color: $accent-light;
    }

    &-description {
      margin: .3rem 0;

      background: $grey-darkest;
      border-radius: 10px;

      width: 30rem;
      max-width: 65vw;

      max-height: 0;
      overflow-y: hidden;
      transition: max-height 1s ease-in-out, padding 1.2s ease-in-out;
    }

    &:hover .experience-description {
      max-height: 10rem;
      padding: .5rem 1rem;
    }

    & a {
      color: $grey-normal;
      text-underline-offset: 2px;
    }
  }
</style>