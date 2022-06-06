import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/common.scss"
import "@/assets/css/reset.scss"
import "@/assets/font/iconfont.css"
const moment = require('moment');
import filters from "./utils/filters";
import { userApi,articleApi,statisticApi } from '@/api/request'
const app = createApp(App);

app.config.globalProperties.$filters = filters
app.config.globalProperties.$userApi = userApi
app.config.globalProperties.$articleApi = articleApi
app.config.globalProperties.$statisticApi = statisticApi
app.config.globalProperties.$moment = moment
app.use(store).use(router).mount('#app')
