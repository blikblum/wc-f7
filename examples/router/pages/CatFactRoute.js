import { RouteController } from '../../../router.js'
import { toHost } from '../../../src/router/route.js'
import { catFact, updateCatFact } from '../state/catfact.js'
import { fromStore } from '../state/routeHook.js'

import './catfact-page.js'

export class CatFactRoute extends RouteController {
  static component = 'catfact-page'

  static properties = {
    fact: { from: fromStore(catFact), to: toHost('fact') },
  }

  static events = {
    'update-catfact': function () {
      updateCatFact()
    },
  }
}
