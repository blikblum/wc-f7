import { LitElement, html } from 'lit-element'

const pageEvents = {
  pageMounted: function(e, page) {
    console.log('page mounted')
  },
  pageInit: function(e, page) {
    console.log('page init', this.level)
  },
  pageBeforeIn: function(e, page) {
    console.log('page before in')
  },
  pageAfterIn: function(e, page) {
    console.log('page after in')
  },
  pageBeforeOut: function(e, page) {
    console.log('page before out')
  },
  pageAfterOut: function(e, page) {
    console.log('page after out')
  },
  pageBeforeUnmount: function(e, page) {
    console.log('page before unmount')
  },
  pageBeforeRemove: function(e, page) {
    console.log('page before remove')
  },
}

export class IndexPage extends LitElement {
  static get $on() {
    return pageEvents
  }

  get level() {
    return +this.$route.params.level || 0
  }

  createRenderRoot() {
    return this
  }

  $created() {
    console.log('$created', this.level)
  }

  $beforeMount() {
    console.log('$beforeMount', this.level)
  }

  $mounted() {
    console.log('$mounted', this.level)
  }

  $beforeDestroy() {
    console.log('$beforeDestroy', this.level)
  }

  $destroyed() {
    console.log('$destroyed', this.level)
  }

  render() {
    const level = this.level
    const message = level ? 'Hello Again' : 'Hello World!'
    return html`
      <div class="navbar">
        <div class="navbar-bg"></div>
        <div class="navbar-inner">
          ${level
            ? html`
                <div class="left">
                  <a href="#" class="link icon-only back">
                    <i class="icon icon-back"></i>
                  </a>
                </div>
              `
            : ''}
          <div class="title">Page - Level ${level}</div>
        </div>
      </div>
      <div class="page-content">
        <div class="block-title">${message}</div>
        <div class="list links-list">
          <ul>
            <li>
              <a href="/my-page/level/${level + 1}" class="next-link">Next Page</a>
            </li>
          </ul>
        </div>
      </div>
    `
  }
}

customElements.define('index-page', IndexPage)
