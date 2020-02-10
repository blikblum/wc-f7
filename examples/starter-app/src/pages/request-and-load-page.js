import { LitElement, html } from 'lit-element'

export class RequestAndLoad extends LitElement {
  createRenderRoot() {
    return this
  }

  $created() {
    this.dataset.name = 'request-load'
  }

  render() {
    const user = this.user
    return html`
      <div class="navbar">
        <div class="navbar-bg"></div>
        <div class="navbar-inner sliding">
          <div class="left">
            <a href="#" class="back link"
              ><i class="icon icon-back"></i><span class="if-not-md">Back</span></a
            >
          </div>
          <div class="title">${user.firstName} ${user.lastName}</div>
        </div>
      </div>
      <div class="page-content">
        <div class="block block-strong">${user.about}</div>
        <div class="list links-list">
          <ul>
            ${user.links.map(
              (item, i) =>
                html`
                  <li>
                    <a class="external" target="_blank" href=${item.url}>${item.title}</a>
                  </li>
                `,
            )}
          </ul>
        </div>
      </div>
    `
  }
}

customElements.define('request-and-load-page', RequestAndLoad)
