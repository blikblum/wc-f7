import { LitElement, html } from 'lit'

export class CatFactPage extends LitElement {
  static properties = {
    fact: {},
  }

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
        <div class="button button-fill" @click=${this.updateClick}>Update</div>
        <div class="card">
          <div class="card-content-padding card-content">${this.fact || '--'}</div>
        </div>
      </div>
    `
  }
}

customElements.define('catfact-page', CatFactPage)
