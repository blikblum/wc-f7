import { LitElement, html } from 'lit'

let idCounter = 0

export class CatFactPage extends LitElement {
  static properties = {
    fact: {},
  }

  _id = ++idCounter

  createRenderRoot() {
    return this
  }

  updateClick(e) {
    e.preventDefault()
    this.dispatchEvent(new CustomEvent('update-catfact', { bubbles: true }))
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

          <div class="title">Cat Fact</div>
        </div>
      </div>
      <div class="page-content">
        <div
          class="button button-fill margin-horizontal-half margin-vertical"
          @click=${this.updateClick}
        >
          Update
        </div>
        <div class="card">
          <div class="card-content-padding card-content">${this.fact || '--'}</div>
        </div>
        <div class="block-title">Other pages</div>
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
      </div>
    `
  }
}

customElements.define('catfact-page', CatFactPage)
