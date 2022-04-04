import { RouteController } from '../../../router.js'
import { fromParam, fromQuery, toHost } from '../../../src/router/route.js'
import './person-page.js'

export class PersonRoute extends RouteController {
  static component = 'person-page'

  static properties = {
    personId: { from: fromParam('id'), to: toHost('personId') },
    personAge: { from: fromQuery('age'), to: [toHost('personAge', 'number')] },
    personAge2: { from: fromQuery('age', 'number') },
    personRole: { from: fromQuery('role'), to: toHost('personRole') },
  }

  activate() {
    console.log(`person ${this.personId} activated`)
    console.log(`person age ${this.personAge2} - ${typeof this.personAge2}`)
  }

  deactivate() {
    console.log(`person ${this.personId} deactivated`)
  }

  hostConnected() {
    console.log(`person ${this.personId} connected`)
  }

  hostDisconnected() {
    console.log(`person ${this.personId} disconnected`)
  }
}
