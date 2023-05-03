import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "bootstrap/dist/css/bootstrap.min.css";
import '@popperjs/core';
import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import 'gitart-vue-dialog/dist/style.css';
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
