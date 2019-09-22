import Utils from 'framework7/utils/utils'
import WCFramework7Component from './component-class'

const resolved = Promise.resolve()

export default {
  name: 'routerComponentLoader',
  proto: {
    componentLoader(component, componentUrl, options = {}, resolve, reject) {
      const router = this
      const { app } = router

      let context = options.context || {}
      if (typeof context === 'function') context = context.call(router)
      else if (typeof context === 'string') {
        try {
          context = JSON.parse(context)
        } catch (err) {
          reject()
          throw err
        }
      }
      const extendContext = Utils.merge({}, context, {
        $route: options.route,
        $f7route: options.route,
        $router: router,
        $f7router: router,
        $theme: {
          ios: app.theme === 'ios',
          md: app.theme === 'md',
          aurora: app.theme === 'aurora',
        },
      })
      const createdComponent = new WCFramework7Component(app, component, {}, extendContext)
      const el = createdComponent.el
      resolve(el)

      if (app.wcPageInitCallbacks) {
        const renderPromise = el.updateComplete || resolved
        renderPromise.then(() => {
          app.wcPageInitCallbacks.forEach(callback => {
            callback.call(app, el.f7Page)
          })
        })
      }
    },

    modalComponentLoader(rootEl, component, componentUrl, options, resolve, reject) {
      const router = this
      router.componentLoader(
        component,
        componentUrl,
        options,
        el => {
          resolve(el)
        },
        reject,
      )
    },

    tabComponentLoader(tabEl, component, componentUrl, options, resolve, reject) {
      const router = this
      router.componentLoader(
        component,
        componentUrl,
        options,
        el => {
          resolve(el)
        },
        reject,
      )
    },

    pageComponentLoader(routerEl, component, componentUrl, options, resolve, reject) {
      const router = this
      router.componentLoader(
        component,
        componentUrl,
        options,
        (el, newOptions = {}) => {
          resolve(el, newOptions)
        },
        reject,
      )
    },
  },
}
