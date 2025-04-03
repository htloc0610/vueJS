import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"  
import 'bootstrap-icons/font/bootstrap-icons.css';
import PrimeVue from 'primevue/config';

import router from './router'

const app = createApp(App)

app.use(createPinia());
app.use(PrimeVue);
app.use(router)

app.mount('#app')
