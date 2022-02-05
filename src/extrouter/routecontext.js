export function findContext(route, property) {
  let parentRoute = route.$parent
  while (parentRoute) {
    const { providedContexts } = parentRoute.constructor
    const contextDef = providedContexts && providedContexts[property]
    if (contextDef) {
      return contextDef.property ? parentRoute[contextDef.property] : contextDef.value
    }
    parentRoute = parentRoute.$parent
  }
  return undefined
}
