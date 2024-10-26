import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config';
import Finka from './theme/Finka';
import Ripple from 'primevue/ripple';

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router);
app.use(createPinia())
app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Finka,
        options: {
            darkModeSelector: false,
            prefix: 'p',
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
});

app.directive('ripple', Ripple);
app.mount('#app')
