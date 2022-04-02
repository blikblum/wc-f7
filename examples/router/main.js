import Framework7 from '../../../../bundle.js'
import { mapRoutes } from '../../router.js'
import { HomePage } from './pages/home-page.js'
import { CatFactRoute } from './pages/CatFactRoute.js'
import { PersonRoute } from './pages/PersonRoute.js'

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
  preloadPreviousPage: false,
  url: '/home-page/',
})
