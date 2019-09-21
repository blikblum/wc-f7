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

    // Root data and methods
    Object.defineProperty(self, '$root', {
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

    // Apply context
    'beforeCreate created beforeMount mounted beforeDestroy destroyed updated'
      .split(' ')
      .forEach(cycleKey => {
        if ($options[cycleKey]) $options[cycleKey] = $options[cycleKey].bind(self)
      })

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

    // Bind Events
    if ($options.on) {
      Object.keys($options.on).forEach(eventName => {
        $options.on[eventName] = $options.on[eventName].bind(self)
      })
    }
    if ($options.once) {
      Object.keys($options.once).forEach(eventName => {
        $options.once[eventName] = $options.once[eventName].bind(self)
      })
    }

    // Before create hook
    if ($options.beforeCreate) $options.beforeCreate()

    // Render
    // let html = self.$render()

    self.el = typeof component === 'string' ? document.createElement(component) : new component()

    self.el.classList.add('page')

    Object.assign(self.el, extendContext, {
      $f7: app,
      $id: options.id || id,
    })

    self.$el = $(self.el)

    self.$attachEvents()

    // Created callback
    if ($options.created) $options.created()

    // Store component instance
    self.el.f7Component = self

    return self
  }

  $attachEvents() {
    const self = this
    const { $options, $el } = self
    if ($options.on) {
      Object.keys($options.on).forEach(eventName => {
        $el.on(Utils.eventNameToColonCase(eventName), $options.on[eventName])
      })
    }
    if ($options.once) {
      Object.keys($options.once).forEach(eventName => {
        $el.once(Utils.eventNameToColonCase(eventName), $options.once[eventName])
      })
    }
  }

  $detachEvents() {
    const self = this
    const { $options, $el } = self
    if ($options.on) {
      Object.keys($options.on).forEach(eventName => {
        $el.off(Utils.eventNameToColonCase(eventName), $options.on[eventName])
      })
    }
    if ($options.once) {
      Object.keys($options.once).forEach(eventName => {
        $el.off(Utils.eventNameToColonCase(eventName), $options.once[eventName])
      })
    }
  }

  $render() {
    const self = this
    const { $options } = self
    let html = ''
    if ($options.render) {
      html = $options.render()
    }
    return html
  }

  $forceUpdate() {
    const self = this
    let html = self.$render()
  }

  $setState(mergeState) {
    const self = this
    Utils.merge(self, mergeState)
    self.$forceUpdate()
  }

  $mount(mountMethod) {
    const self = this
    if (self.$options.beforeMount) self.$options.beforeMount()
    if (self.$styleEl) $('head').append(self.$styleEl)
    if (mountMethod) mountMethod(self.el)
    if (self.$options.mounted) self.$options.mounted()
  }

  $destroy() {
    const self = this
    if (self.$options.beforeDestroy) self.$options.beforeDestroy()
    if (self.$styleEl) $(self.$styleEl).remove()
    self.$detachEvents()
    if (self.$options.destroyed) self.$options.destroyed()
    // Delete component instance
    if (self.el && self.el.f7Component) {
      self.el.f7Component = null
      delete self.el.f7Component
    }
    // Patch with empty node
    if (self.$vnode) {
      self.$vnode = patch(self.$vnode, { sel: self.$vnode.sel, data: {} })
    }
    Utils.deleteProps(self)
  }
}

export default WCFramework7Component
