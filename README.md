# wc-f7

wc-f7 is a [Framework7](https://framework7.io/) setup that provides seamless integration with [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

### Architecture

wc-f7 extends Framework7 core modules replacing the router component loader with one that accepts a Web Component declaration (tag name or class constructor) instead of a Framework7 component model. As a side effect, vdom (Snabbdom) and parser/loader modules are not imported/bundled.

### Features

 - Declares Framework7 pages as Web Components
 - Supports async rendering (e.g. [LitElement](https://lit-element.polymer-project.org/) / [SkateJS](https://github.com/skatejs/skatejs))
 - Bundle size smaller than Framework7 core
 - Supports component lifecycle hooks and page events
 - No hard dependency on a specific Framework7 version (any v4 version should work)


### Caveats
 
 - Does not works with shadow dom, due to the Framework7 architecture
 - Only ES modules build is provided

### Install

    $ npm install wc-f7 framework7

### Usage

Define component class

```Javascript
import { LitElement, html } from 'lit-element'


export class IndexPage extends LitElement {
  // page events are declared in static property $on
  static get $on() {
    return {
      pageMounted: function(e, page) {
        console.log('page mounted')
      },
      pageInit: function(e, page) {
        console.log('page init', this.level)
      } 
    }
  }

  get level() {
    // $route, $router, $app, $f7, $theme properties are avaliable in instance 
    return +this.$route.params.level || 0
  }

  // disables shadow dom
  createRenderRoot() {
    return this
  }

  // lifecycle hooks must be declared with $ prefix
  $created() {
    console.log('$created', this.level)
  }

  $beforeMount() {
    console.log('$beforeMount', this.level)
  }

render() {
    const level = this.level
    const message = level ? 'Hello Again' : 'Hello World!'
    return html`
      <div class="navbar">
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
```

Create the app and setup the route

```Javascript
import Framework7 from 'wc-f7' // 'wc-f7/bundle' for all components bundled
import { IndexPage } from './index/index-page'

const app = new Framework7({
  root: '#app',
  routes: [
    {
      path: '/my-page/level/:level',
      component: IndexPage // or 'index-page'
    },
  ],
})

```

See [examples](examples) folder for complete apps

---

Copyright © 2019 Luiz Américo Pereira Câmara