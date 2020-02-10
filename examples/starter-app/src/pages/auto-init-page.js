import { LitElement, html } from 'lit-element'

export class AutoInit extends LitElement {
  createRenderRoot() {
    return this
  }

  $created() {
    this.dataset.name = 'auto-init'
  }

  render() {
    return html`
      <div class="navbar">
        <div class="navbar-bg"></div>
        <div class="navbar-inner sliding">
          <div class="left">
            <a href="#" class="link back">
              <i class="icon icon-back"></i>
              <span class="if-not-md">Back</span>
            </a>
          </div>
          <div class="title">Auto Init Components</div>
        </div>
      </div>
      <div class="page-content">
        <div class="block-title">Gauge</div>
        <div class="block">
          <div
            class="gauge gauge-init"
            data-type="circle"
            data-value="0.44"
            data-value-text="44%"
            data-value-text-color="#ff9800"
            data-border-color="#ff9800"
          ></div>
        </div>
      </div>
    `
  }
}

customElements.define('auto-init-page', AutoInit)
