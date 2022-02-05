import { RouteController } from '../../extrouter.js'
import './index-page.js'

export class IndexRoute extends RouteController {
  static component = 'index-page'

  activate(transition) {
    console.log('activate', +transition.to.params.level || 0)
  }

  prepareEl(el, transition) {
    el.level = +transition.to.params.level || 0
  }
}
