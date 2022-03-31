import { RouteController } from '../../../extrouter.js'
import { fromParam, fromQuery, toHost } from '../../../src/extrouter/route.js'
import './person-page.js'

export class PersonRoute extends RouteController {
  static component = 'person-page'

  static properties = {
    personId: { from: fromParam('id'), to: toHost('personId') },
    personAge: { from: fromQuery('age'), to: toHost('personAge', 'number') },
    personRole: { from: fromQuery('role'), to: toHost('personRole') },
  }

  activate() {
    console.log(`person ${this.personId} activated`)
  }

  deactivate() {
    console.log(`person ${this.personId} deactivated`)
  }
}
