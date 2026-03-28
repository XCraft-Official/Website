import DefaultTheme from 'vitepress/theme'
import './style/index.scss'
import { watch } from 'vue'
import { useRouter } from 'vitepress'
import MCServerStatus from './components/MCServerStatus.vue'
import ServerDisclaimer from './components/ServerDisclaimer.vue'
import FriendLinks from './components/FriendLinks.vue'
import SponsorWall from './components/SponsorWall.vue'
import SiteFooter from './components/SiteFooter.vue'

let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,
  
  enhanceApp({ app }) {
    app.component('MCServerStatus', MCServerStatus)
    app.component('ServerDisclaimer', ServerDisclaimer)
    app.component('FriendLinks', FriendLinks)
    app.component('SponsorWall', SponsorWall)
    app.component('SiteFooter', SiteFooter)
  },
  
  setup() {
    const router = useRouter()
    
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }
  },
}

function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}
