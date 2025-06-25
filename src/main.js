import '@/styles/common.scss'
import { createApp, onMounted } from 'vue'
import { createPinia } from 'pinia'
import { lazyPlugin } from '@/directives/index'
import { componentsPlugn } from '@/components/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import { getResult } from './apis/text'
// import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
// img-lazy
app.use(lazyPlugin)
app.use(componentsPlugn)


app.mount('#app')



