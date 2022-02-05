import { findContext } from './routecontext.js'

const getPath = (object, path, value) => {
  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets
  const pathArray = Array.isArray(path) ? path : path.split(/[,[\].]/g).filter(Boolean)
  // Find value if exist return otherwise return undefined value;
  return pathArray.reduce((prevObj, key) => prevObj && prevObj[key], object) || value
}

const parseNumber = (value) => {
  const n = parseFloat(value)
  const isNumeric = value == n // eslint-disable-line eqeqeq
  return isNumeric ? n : value
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
  }

  initialize() {}

  activate() {}

  deactivate() {}

  updateEl() {}

  prepareEl(el, transition) {}

  _applyProperties(el, transition, $route) {
    el.$route = $route
    const { properties } = this.$options
    if (properties) Object.assign(el, properties)
    const classProperties = this.constructor.__properties
    if (classProperties) {
      classProperties.forEach(({ name, from, to, format }) => {
        if (from) {
          let result = getPath(transition, from)
          if (format === 'number') {
            result = parseNumber(result)
          } else if (typeof format === 'function') {
            result = format(result)
          }
          this[name] = result
        }
        if (to && !this.el) {
          el[to] = this[name]
        }
      })
    }
  }

  _prepareEl(el, transition, $route) {
    this._applyProperties(el, transition, $route)
    this.prepareEl(el, transition)
  }

  _connectEl(el, transition, $route) {
    this._prepareEl(el, transition, $route)
    this.host = el
    el.addController(this)
  }

  destroy() {}

  get context() {
    return new Proxy(this, contextProxyHandler)
  }
}
