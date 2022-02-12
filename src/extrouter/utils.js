const routeDataById = {}

let routeIdCounter = 0

export function setRouteData(f7Route, data) {
  // f7 clones the route so is not possible to use WeakMap
  // waiting for https://github.com/framework7io/framework7/pull/3976 so can use WeakMap
  if (!f7Route._id) {
    f7Route._id = ++routeIdCounter
  }
  routeDataById[f7Route._id] = data
}

export function getRouteData(f7Route) {
  if (f7Route._id) {
    return routeDataById[f7Route._id]
  }
}

export function clearRouteData(f7Route) {
  if (f7Route._id) {
    delete routeDataById[f7Route._id]
  }
}

export function isSameRoute(route1, route2) {
  return route1.url === route2.url
}
