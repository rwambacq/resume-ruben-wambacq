<script setup>
</script>

<template>
  <div class="header-wrapper">
    <img src="../assets/headshot_cutout.png" alt="" class="face-img">
    <div class="introduction">
      <h1>Hi there!</h1>
      <h1>My name is</h1>
      <div class="typewriter">
        <h1 v-html="typedname"></h1>
      </div>
      <div v-if="showLinks" class="links">
        <p>{{"<"}}</p>
        <a v-for="(link, index) in links" :key="index" :href="link.href" class="link-wrapper">
          <img v-if="link.name == 'LinkedIn'" src="../assets/linkedin.svg" alt="" class="link-img accent-svg-light">
          <img v-if="link.name == 'Github'" src="../assets/github.svg" alt="" class="link-img accent-svg-light">
          <img v-if="link.name == 'Email'" src="../assets/mail.svg" alt="" class="link-img accent-svg-light">
          <img v-if="link.name == 'Phone'" src="../assets/phone.svg" alt="" class="link-img accent-svg-light">
          <div class="link-text">{{link.text}}</div>
        </a>
        <p>{{"/>"}}</p>
      </div>
    </div>
    <div class="bottom-divider"></div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      typedname: '<p> </p>',
      showLinks: false,
      links: [
        {
          name: "LinkedIn",
          href: "https://www.linkedin.com/in/ruben-wambacq/",
          text: "/in/ruben-wambacq"
        },
        {
          name: "Github",
          href: "https://github.com/rwambacq",
          text: "rwambacq"
        },
        {
          name: "Email",
          href: "mailto:ruben.wambacq@gmail.com",
          text: "ruben.wambacq@gmail.com"
        },
        {
          name: "Phone",
          href: "tel:+32471325437",
          text: "+32 471 32 54 37"
        }
      ]
    }
  },
  mounted() {
    const name = "Ruben Wambacq"
    let idx = 0;
    let typer = setInterval(() => {
      if (idx >= name.length) {
        clearInterval(typer);
        this.showLinks = true;
      } else {
        this.typedname = `<p>${name.substring(0, idx + 1)}</p>`;
        idx += 1;
      }
    }, 150);
  }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  width: 100%;
  height: 60vh;

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 8rem;

  position: relative;

  margin-bottom: 4rem;
}

.face-img {
  height: 90%;
}

.down-arrow {
  height: 50px;
  transform: rotate(270deg);

  opacity: .3;

  position: absolute;
  left: 50%;
  right: 50%;
  bottom: 40px;

  animation-name: bounce;
  animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

@keyframes bounce {
    0%   { transform: rotate(270deg) scale(1,1)      translateX(0); }
    10%  { transform: rotate(270deg) scale(1.1,.9)   translateX(0); }
    30%  { transform: rotate(270deg) scale(.9,1.1)   translateX(50px); }
    50%  { transform: rotate(270deg) scale(1.05,.95) translateX(0); }
    57%  { transform: rotate(270deg) scale(1,1)      translateX(7px); }
    64%  { transform: rotate(270deg) scale(1,1)      translateX(0); }
    100% { transform: rotate(270deg) scale(1,1)      translateX(0); }
}

.introduction {
  font-size: 4rem;
  line-height: 5rem;
  color: $grey-lightest;
  width: 40rem;
}

.typewriter h1 {
  border-right: .15em solid $accent-light;
  animation: blink-caret .75s step-end infinite;
  width: fit-content;
  padding-right: 2px;
  font-weight: 500;
}


/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: $accent-light; }
}

.links {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  line-height: 1rem;
  gap: 1.5rem;
  margin-top: 20px;

  color: $accent-light;
  font-weight: 600;
  font-size: 2rem;
  animation: fadein 1s ease;
}

@keyframes fadein {
  0% {opacity:0;}
  100% {opacity:1;}
}

.link-wrapper {
  position: relative;

  &:hover .link-text {
    display: flex;
  }
}

.link-img {
  height: 40px;
  width: auto;
}

.link-text {
  display: none;
  position: absolute;
  bottom: -60px;
  font-size: 1rem;
  font-weight: 400;
  white-space: nowrap;
  padding: 1rem;


  background: $grey-darkest;
  color: #61FFD7;
  

  border-radius: 4px;
}

.bottom-divider {
  background: $accent-light;
  height: 1px;
  width: calc(100vw - 600px);
  position: absolute;
  bottom: 0;
  left: 50%;
  right: 50;
  transform: translateX(-50%);
}
</style>
