import Framework7 from '../../../../bundle.js'
import { IndexPage } from './index/index-page.js'

const app = new Framework7({
  root: '#app',
  routes: [
    {
      path: '/my-page/level/:level',
      component: IndexPage,
    },
  ],
})

app.views.create('.view-main', {
  stackPages: true,
  url: '/my-page/level/0',
})
