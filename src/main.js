import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router'
import components from '@/components/UI'

import Skeleton from 'vue-loading-skeleton';
import "vue-loading-skeleton/dist/style.css"

import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

import './assets/sass/style.sass'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app.use(router).use(store).use(Skeleton).use(FloatingVue).mount('#app')

