import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
createApp(App).use(VueAxios, axios).use(ElementPlus).use(router).use(store).use(store).mount('#app')