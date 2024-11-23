import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config';
import Finka from './theme/Finka';
import Ripple from 'primevue/ripple';

import App from './App.vue'
import router from './router'
import setInterceptors from "@/helpers/apiInterceptors"
import currencyFormatter from './plugins/currencyFormatter'
import DialogService from 'primevue/dialogservice';

const app = createApp(App)
app.use(router);
app.use(createPinia())
setInterceptors();
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
app.use(currencyFormatter, {});
app.use(DialogService);
app.directive('ripple', Ripple);
app.mount('#app')
