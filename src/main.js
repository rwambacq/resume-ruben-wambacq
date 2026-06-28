import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { ObserveVisibility } from 'vue-observe-visibility';
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

app.directive('visible', {
  beforeMount: (el, binding, vnode) => {
    vnode.context = binding.instance;
    ObserveVisibility.bind(el, binding, vnode);
  },
  update: ObserveVisibility.update,
  unmounted: ObserveVisibility.unbind,
});

app.mount('#app');