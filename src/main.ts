import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

// UI UX
import "bootstrap/dist/css/bootstrap.min.css"  
import 'bootstrap-icons/font/bootstrap-icons.css';



import router from './router'

const app = createApp(App)

app.use(createPinia());
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(router)

app.mount('#app')
