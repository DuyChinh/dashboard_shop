// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
  })
  app.vueApp.use(vuetify);
  app.vueApp.use(Vue3Toastify, { autoClose: 1000 });
  return {
    provide: { toast },
  };
})
