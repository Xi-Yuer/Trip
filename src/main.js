import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css'
import './assets/css/common.css'

import App from './App.vue'
import router from './router'


createApp(App).use(createPinia()).use(router).mount('#app')
