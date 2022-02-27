<template>
  <div class="education-wrapper">
    <h1>Education</h1>
    <div class="education-list">
      <div class="education">
        <p class="education-kind">Bachelor of Science</p>
        <p class="education-major">Informatics</p>
        <p class="education-location">Ghent University</p>
        <p class="education-duration">2016 - 2020</p>
      </div>
      <div class="education">
        <p class="education-kind">Master of Science</p>
        <p class="education-major">Informatics</p>
        <p class="education-location">Ghent University</p>
        <p class="education-duration">2020 - 2022</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EducationBlock"
}
</script>

<style lang="scss" scoped>
  .education-wrapper {
    text-align: center;
  }

  h1 {
    color: $accent-light;
    font-size: 1.8rem;
    font-weight: 500;
  }

  .education-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    column-gap: 10rem;
    row-gap: 2rem;
  }

  .education {
    margin: 2rem 1rem;
    line-height: 1.5rem;

    &-kind {
      font-size: 1.2rem;
      color: $grey-lightest;
    }

    &-major {
      font-size: 1.15rem;
      color: rgba($accent-light, 0.6);
    }

    &-location {
      font-weight: 100;
    }

    &-duration {
      color: $grey-normal;
    }
  }
</style>