import { createApp } from 'vue'
import App from './App.vue'
import { initializeMsal } from './auth/msal'

initializeMsal().then(() => {
  createApp(App).mount('#app')
})
