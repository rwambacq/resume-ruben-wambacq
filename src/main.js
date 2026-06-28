import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import reveal from './directives/reveal';
import i18n from './locales';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faGlobe,
  faMoon,
  faSun,
  faEnvelope,
  faPhone,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(faGlobe, faMoon, faSun, faEnvelope, faPhone, faBars, faXmark, faLinkedin, faGithub);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia());
app.use(i18n);

app.directive('reveal', reveal);

app.mount('#app');