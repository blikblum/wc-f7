import { window, document } from 'ssr-window'
import $ from 'dom7'
import Utils from 'framework7/utils/utils'

class WCFramework7Component {
  constructor(app, component, options, extendContext = {}) {
    const id = Utils.id()
    const self = Utils.merge(this, extendContext, {
      $app: app,
      $f7: app,
      $options: Utils.extend({ id }, options),
      $id: options.id || id,
    })
    const { $options } = self

    if ($options.data) {
      $options.data = $options.data.bind(self)
      // Data
      Utils.extend(self, $options.data())
    }
    if ($options.render) $options.render = $options.render.bind(self)
    if ($options.methods) {
      Object.keys($options.methods).forEach(methodName => {
        self[methodName] = $options.methods[methodName].bind(self)
      })
    }

    self.el = typeof component === 'string' ? document.createElement(component) : new component()

    // setup page attributes
    self.el.classList.add('page')
    const pageName = self.el.constructor.pageName
    if (pageName) {
      self.el.dataset.name = pageName
    }

    Object.assign(self.el, extendContext, {
      $app: app,
      $f7: app,
      $id: options.id || id,
    })

    // Root data and methods
    Object.defineProperty(self.el, '$root', {
      enumerable: true,
      configurable: true,
      get() {
        let root = Utils.merge({}, app.data, app.methods)
        if (window && window.Proxy) {
          root = new window.Proxy(root, {
            set(target, name, val) {
              app.data[name] = val
            },
            deleteProperty(target, name) {
              delete app.data[name]
              delete app.methods[name]
            },
            has(target, name) {
              return name in app.data || name in app.methods
            },
          })
        }
        return root
      },
      set() {},
    })

    // Bind Events
    self.$on = self.el.constructor.$on
    self.$once = self.el.constructor.$once
    if (self.$on) {
      self.$on = Object.assign({}, self.$on)
      Object.keys(self.$on).forEach(eventName => {
        self.$on[eventName] = self.$on[eventName].bind(self.el)
      })
    }
    if (self.$once) {
      self.$on = Object.assign({}, self.$on)
      Object.keys(self.$once).forEach(eventName => {
        self.$once[eventName] = self.$once[eventName].bind(self.el)
      })
    }

    self.$el = $(self.el)

    self.$attachEvents()

    // Store component instance
    self.el.f7Component = self

    // Created callback
    if (self.el.$created) self.el.$created()

    return self
  }

  $attachEvents() {
    const self = this
    const { $el } = self
    if (self.$on) {
      Object.keys(self.$on).forEach(eventName => {
        $el.on(Utils.eventNameToColonCase(eventName), self.$on[eventName])
      })
    }
    if (self.$once) {
      Object.keys(self.$once).forEach(eventName => {
        $el.once(Utils.eventNameToColonCase(eventName), self.$once[eventName])
      })
    }
  }

  $detachEvents() {
    const self = this
    const { $options, $el } = self
    if (self.$on) {
      Object.keys(self.$on).forEach(eventName => {
        $el.off(Utils.eventNameToColonCase(eventName), self.$on[eventName])
      })
    }
    if (self.$once) {
      Object.keys(self.$once).forEach(eventName => {
        $el.off(Utils.eventNameToColonCase(eventName), self.$once[eventName])
      })
    }
  }

  $mount(mountMethod) {
    const self = this
    if (self.el.$beforeMount) self.el.$beforeMount()
    if (self.$styleEl) $('head').append(self.$styleEl)
    if (mountMethod) mountMethod(self.el)
    if (self.el.$mounted) self.el.$mounted()
  }

  $destroy() {
    const self = this
    if (self.el.$beforeDestroy) self.el.$beforeDestroy()
    if (self.$styleEl) $(self.$styleEl).remove()
    self.$detachEvents()
    if (self.el.$destroyed) self.el.$destroyed()
    // Delete component instance
    if (self.el && self.el.f7Component) {
      self.el.f7Component = null
      delete self.el.f7Component
    }
    Utils.deleteProps(self)
  }
}

export default WCFramework7Component
