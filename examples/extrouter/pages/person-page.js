import { LitElement, html } from 'lit'

export class PersonPage extends LitElement {
  static properties = {
    personId: {},
    personRole: {},
    personAge: {},
  }

  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <div class="navbar">
        <div class="navbar-bg"></div>
        <div class="navbar-inner">
          <div class="left">
            <a href="#" class="link icon-only back">
              <i class="icon icon-back"></i>
            </a>
          </div>
          <div class="title">Person</div>
        </div>
      </div>
      <div class="page-content">
        <div class="block-title">Person ${this.personId}</div>
        <div class="block">
          <div>Role: ${this.personRole || '--'}</div>
          <div>Age: ${this.personAge || '--'}</div>
        </div>

        <div class="block-title">Other pages</div>
        <div class="list links-list">
          <ul>
            <li>
              <a href="/catfact-page/">Cat Fact</a>
            </li>
          </ul>
        </div>
      </div>
    `
  }
}

customElements.define('person-page', PersonPage)
