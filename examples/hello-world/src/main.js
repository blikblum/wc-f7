import 'framework7/css/framework7.css'
import Framework7 from 'wc-f7'
import { IndexPage } from './index/index-page'

const app = new Framework7({
  root: '#app',
  routes: [
    {
      path: '/my-page/level/:level',
      component: IndexPage,
      context: function() {
        return { x: 'y' }
      },
    },
  ],
})

app.views.create('.view-main', {
  stackPages: true,
  url: '/my-page/level/0',
})
