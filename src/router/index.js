import asyncRoute from './asyncroute.js'
import { clearRouteData, getRouteData, isSameRoute } from './utils.js'

function beforeLeaveHandler(to, from, resolve, reject) {
  const router = this
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

  const fromData = getRouteData(from)
  // with v5 there's no way to know if is going backward or forward
  // for now activate and deactivate regardless of active or not
  if (fromData /* && isSameRoute(fromData.from, to) */) {
    if (!transition.isCancelled) {
      fromData.controller.deactivate(transition)
    }
    if (transition.isCancelled) {
      transition.hidePreloader()
      reject()
      return
    }
    fromData.controller.destroy()
    clearRouteData(from)
  }

  resolve()
}

export const mapRoutes = (routes) => {
  return routes.map((route) => {
    if (route.controller) {
      route.async = asyncRoute(route)
    }
    if (route.beforeLeave) {
      if (Array.isArray(route.beforeLeave)) {
        route.beforeLeave.unshift(beforeLeaveHandler)
      } else {
        route.beforeLeave = [beforeLeaveHandler, route.beforeLeave]
      }
    } else {
      route.beforeLeave = beforeLeaveHandler
    }
    return route
  })
}
