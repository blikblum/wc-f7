import { LitElement, html } from 'lit'

export class HomePage extends LitElement {
  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <div class="navbar">
        <div class="navbar-bg"></div>
        <div class="navbar-inner">
          <div class="title">WC-F7 Router Demo</div>
        </div>
      </div>
      <div class="page-content">
        <div class="block-title">URL params and query</div>
        <div class="list links-list">
          <ul>
            <li>
              <a href="/person-page/1?role=manager">Person 1</a>
            </li>
            <li>
              <a href="/person-page/2?role=user">Person 2</a>
            </li>
            <li>
              <a href="/person-page/3?role=user&age=33">Person 3</a>
            </li>
          </ul>
        </div>
        <div class="block-title">External data</div>
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

customElements.define('home-page', HomePage)
