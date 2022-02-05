import { routeMap, viewRoutesMap } from './globals.js'
import { getComponent } from './route.js'

function resolveComponent(router, routeConfig, to, from, resolve, reject) {
  const { controller: RouteClass, component } = routeConfig
  let viewRoutes
  const transition = {
    to,
    from,
    cancel() {
      this.isCancelled = true
    },
    redirect(...args) {
      this.isCancelled = true
      reject()
      router.navigate(...args)
    },
    showPreloader(delay = 0) {
      if (!router.app.preloader || this.showingPreloader) return
      this.showingPreloader = true
      this.timeoutId = setTimeout(() => {
        this.timeoutId = null
        router.app.preloader.show()
      }, delay)
    },
    hidePreloader() {
      if (this.showingPreloader) {
        router.app.preloader.hide()
        if (this.timeoutId) clearTimeout(this.timeoutId)
      }
    },
  }
  const currentRoute = new RouteClass(routeConfig.classOptions || {}, router, to, routeConfig)
  if (component) {
    currentRoute.component = component
  }
  if (transition.isCancelled) {
    transition.hidePreloader()
    currentRoute.destroy()
    reject()
    return
  }
  Promise.resolve(currentRoute.activate(transition))
    .then(function () {
      transition.hidePreloader()
      if (transition.isCancelled) {
        currentRoute.destroy()
        reject()
      } else {
        if (transition.isCancelled) {
          currentRoute.destroy()
          reject()
          return
        }
        routeMap.set(to, currentRoute)
        viewRoutes = viewRoutesMap.get(router)
        if (!viewRoutes) {
          viewRoutes = []
          viewRoutesMap.set(router, viewRoutes)
        }
        viewRoutes.push(currentRoute)
        resolve(
          { component: getComponent(currentRoute) },
          {
            hooks: {
              beforeMount(el) {
                currentRoute._connectEl(el, transition, routeConfig)
              },
            },
          }
        )
      }
    })
    .catch(function (err) {
      transition.hidePreloader()
      currentRoute.destroy()
      reject()
    })
}

export default function asyncRoute(routeConfig) {
  const origAsync = routeConfig.async
  if (origAsync) {
    return origAsync
  }
  return function asyncHandler(to, from, resolve, reject) {
    return resolveComponent(this, routeConfig, to, from, resolve, reject)
  }
}
