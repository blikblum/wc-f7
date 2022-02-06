import { findContext } from './routecontext.js'

const parseNumber = (value) => {
  const n = parseFloat(value)
  const isNumeric = value == n // eslint-disable-line eqeqeq
  return isNumeric ? n : value
}

const bindEvents = (route, el, events) => {
  if (events) {
    for (const [eventName, listener] of Object.entries(events)) {
      el.addEventListener(eventName, listener.bind(route))
    }
  }
}

export function fromQuery(queryKey) {
  return {
    enter(transition, setValue) {
      setValue(transition.to.query[queryKey])
    },
  }
}

export function fromParam(paramKey) {
  return {
    enter(transition, setValue) {
      setValue(transition.to.params[paramKey])
    },
  }
}

export function toHost(property, format) {
  return {
    update(value, el) {
      if (!el) return
      let v = value
      if (format === 'number') {
        v = parseNumber(value)
      } else if (typeof format === 'function') {
        v = format(value)
      }
      el[property] = v
    },
  }
}

const createElement = (route, Definition) => {
  if (typeof Definition === 'function') {
    if (Definition.prototype instanceof HTMLElement) {
      try {
        return new Definition()
      } catch (error) {
        throw new Error(
          `Unable to create instance of "${Definition.name}" for "${route.$name}" route\n${error}`
        )
      }
    }
    return createElement(route, Definition.call(route))
  }
  if (typeof Definition === 'string') {
    return document.createElement(Definition)
  }
  if (Definition instanceof HTMLElement) {
    return Definition
  }
}

export const getComponent = (route) => {
  return route.component || route.constructor.component
}

const contextProxyHandler = {
  get(target, property, receiver) {
    return findContext(target, property)
  },
}

export class RouteController {
  constructor(controllerOptions, router, { name, path }, options) {
    this.$router = router
    this.$name = name
    this.$path = path
    this.$options = options
    this.initialize(controllerOptions)
    this._properties = []
    const classProperties = this.constructor.properties
    if (classProperties) {
      for (const [name, value] of Object.entries(classProperties)) {
        const hooks = [value.to, value.from].filter(Boolean)
        const set = (v) => {
          this[name] = v
          const host = this.host
          hooks.forEach((hook) => {
            if (typeof hook.update === 'function') {
              hook.update(v, host)
            }
          })
        }
        const property = { name, hooks, set }
        this._properties.push(property)
      }
    }
  }

  initialize() {}

  activate(transition) {
    this._properties.forEach(({ hooks, set }) => {
      hooks.forEach((hook) => {
        if (typeof hook.enter === 'function') {
          hook.enter(transition, set)
        }
      })
    })
  }

  deactivate(transition) {
    this._properties.forEach(({ hooks, set }) => {
      hooks.forEach((hook) => {
        if (typeof hook.leave === 'function') {
          hook.leave(transition, set)
        }
      })
    })
  }

  updateEl() {}

  prepareEl(el, transition) {}

  _applyProperties(el, transition, $route) {
    el.$route = $route
    const { properties } = this.$options
    if (properties) Object.assign(el, properties)
    this._properties.forEach(({ hooks, name }) => {
      const value = this[name]
      hooks.forEach((hook) => {
        if (typeof hook.update === 'function') {
          hook.update(value, el)
        }
      })
    })
  }

  _prepareEl(el, transition, $route) {
    this._applyProperties(el, transition, $route)
    this.prepareEl(el, transition)
  }

  _connectEl(el, transition, $route) {
    bindEvents(this, el, this.constructor.events)
    this._prepareEl(el, transition, $route)
    this.host = el
    el.addController(this)
  }

  destroy() {}

  get context() {
    return new Proxy(this, contextProxyHandler)
  }
}
