const { createApp } = Vue

import { router } from './routes.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/userMsg.js'

const options = {
  template: `
        <section class="container">
            <AppHeader/>
            <main class="router-view">
                
            <RouterView/>
            </main>
            <AppFooter />
            <userMsg/>
        </section>
    `,
  data() {
    return {}
  },
  components: {
    AppHeader,
    AppFooter,
    UserMsg
  },
}
const app = createApp(options)

app.use(router)
app.mount('#app')
