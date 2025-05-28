import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { io } from 'socket.io-client'
import router from './router'
import pinia from './store'

const socket = io('', { path: "/ws" })
const app = createApp(App)
app.config.globalProperties.$socket = socket
app.use(router)
app.use(pinia)


app.mount('#app')
