import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import '@fontsource/commissioner/300.css'
import '@fontsource/commissioner/400.css'
import '@fontsource/commissioner/500.css'
import '@fontsource/commissioner/600.css'
import '@fontsource/commissioner/700.css'
import './index.css'
createApp(App).use(router).mount('#app')
