import { LitElement, html } from 'lit'

export class DynamicPage extends LitElement {
  createRenderRoot() {
    return this
  }

  constructor() {
    super()
    Object.assign(this, {
      name: 'Jimmy',
      age: 25,
      like: ['Tennis', 'Chess', 'Football'],
    })
  }

  openAlert() {
    this.$app.dialog.alert('Hello World')
  }

  render() {
    return html`
      <style>
        dynamic-page p {
          margin: 10px 0;
        }
      </style>
      <div class="navbar">
        <div class="navbar-bg"></div>
        <div class="navbar-inner sliding">
          <div class="left">
            <a href="#" class="link back"
              ><i class="icon icon-back"></i><span class="if-not-md">Back</span></a
            >
          </div>
          <div class="title">Component Page</div>
        </div>
      </div>
      <div class="page-content">
        <div class="block block-strong">
          <p>
            Component page is alos compiled with lit-html, but it has much more functionality. In
            addition to lit-html page it has lifecycle hooks, events handling and data managment.
          </p>
          <p>
            It is useful to use Component page when you need page-specific logic.
          </p>
        </div>
        <div class="block-title">Events Handling</div>
        <div class="block block-strong">
          <a href="#" @click=${this.openAlert} class="button button-raised">Open Alert</a>
        </div>
        <div class="block-title">Page Component Data</div>
        <div class="block block-strong">
          <p>Hello! My name is ${this.name}. I am ${this.age} years old.</p>
          <p>I like to play:</p>
          <ul>
            ${this.like.map(
              (item, i) =>
                html`
                  <li>${item}</li>
                `,
            )}
          </ul>
        </div>
        <div class="block-title">Extended Context</div>
        <div class="block block-strong">
          <p>
            Component page context as Template7 page context is also extended with some additional
            variables.
          </p>
          <h4>$route</h4>
          <p>Contains properties of the current route:</p>
          <ul style="padding-left:25px">
            <li><b>$route.url</b>: ${this.$route.url}</li>
            <li><b>$route.path</b>: ${this.$route.path}</li>
            <li><b>$route.params</b>: ${JSON.stringify(this.$route.params)}</li>
            <li><b>$route.hash</b>: ${this.$route.hash}</li>
            <li><b>$route.query</b>: ${JSON.stringify(this.$route.params)}</li>
          </ul>
          <h4>$root</h4>
          <p>Root data & methods:</p>
          <ul style="padding-left:25px">
            <li><b>$root.user.firstName</b>: ${this.$root.user.firstName}</li>
            <li><b>$root.user.lastName</b>: ${this.$root.user.lastName}</li>
            <li><a @click=${this.$root.helloWorld}>$root.helloWorld()</a></li>
          </ul>
          <h4>$theme</h4>
          <p>Currently active theme:</p>
          <ul style="padding-left:25px">
            <li><b>$theme.ios</b>: ${this.$theme.ios}</li>
            <li><b>$theme.md</b>: ${this.$theme.md}</li>
            <li><b>$theme.aurora</b>: ${this.$theme.aurora}</li>
          </ul>
        </div>
      </div>
    `
  }
}

customElements.define('dynamic-page', DynamicPage)
