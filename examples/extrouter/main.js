import Framework7 from '../../../../bundle.js'
import { mapRoutes } from '../../extrouter.js'
import { HomePage } from './home-page.js'
import { CatFactRoute } from './CatFactRoute.js'
import { PersonRoute } from './PersonRoute.js'

const app = new Framework7({
  root: '#app',
  routes: mapRoutes([
    {
      path: '/home-page/',
      component: HomePage,
    },
    {
      path: '/person-page/:id',
      controller: PersonRoute,
    },
    {
      path: '/catfact-page/',
      controller: CatFactRoute,
    },
  ]),
})

app.views.create('.view-main', {
  stackPages: true,
  url: '/home-page/',
})
