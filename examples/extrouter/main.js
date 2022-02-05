import Framework7 from '../../../../bundle.js'
import { mapRoutes } from '../../extrouter.js'
import { IndexRoute } from './IndexRoute.js'

const app = new Framework7({
  root: '#app',
  routes: mapRoutes([
    {
      path: '/my-page/level/:level',
      controller: IndexRoute,
    },
  ]),
})

app.views.create('.view-main', {
  stackPages: true,
  url: '/my-page/level/0',
})
