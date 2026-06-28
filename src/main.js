import { createApp } from 'vue'
import App from './App.vue'
import { ObserveVisibility } from 'vue-observe-visibility';
import i18n from './locales';

const app = createApp(App);

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