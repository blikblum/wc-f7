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

    if ($options.methods) {
      Object.keys($options.methods).forEach(methodName => {
        self[methodName] = $options.methods[methodName].bind(self)
      })
    }

    self.el = typeof component === 'string' ? document.createElement(component) : new component()
    const elCtor = self.el.constructor

    // setup page attributes
    self.el.classList.add('page')
    const pageName = elCtor.pageName || elCtor.name
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
    self.$on = elCtor.$on
    self.$once = elCtor.$once
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

    self.attachEvents()

    // Store component instance
    self.el.f7Component = self

    // Created callback
    self.callHook('created')
    if (self.el.$created) self.el.$created()

    return self
  }

  attachEvents() {
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

  detachEvents() {
    const self = this
    const { $el } = self
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

  callHook(hookName) {
    const hook = this.$options.hooks[hookName]
    if (hook) {
      hook.call(this, this.el)
    }
  }

  $mount(mountMethod) {
    const self = this
    self.callHook('beforeMount')
    if (self.el.$beforeMount) self.el.$beforeMount()
    if (self.$styleEl) $('head').append(self.$styleEl)
    if (mountMethod) mountMethod(self.el)
    self.callHook('mounted')
    if (self.el.$mounted) self.el.$mounted()
  }

  $destroy() {
    const self = this
    self.callHook('beforeDestroy')
    if (self.el.$beforeDestroy) self.el.$beforeDestroy()
    if (self.$styleEl) $(self.$styleEl).remove()
    self.detachEvents()
    self.callHook('destroyed')
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
