import Framework7 from 'framework7/components/app/app-class'

export default class WCFramework7 extends Framework7 {
  constructor(params) {
    super(Object.assign({ asyncRender: true }, params))
  }

  useModule(moduleName = '', moduleParams = {}) {
    super.useModule(moduleName, moduleParams)
    if (!this.params.asyncRender) return
    const instance = this
    if (!instance.modules) return
    const module = typeof moduleName === 'string' ? instance.modules[moduleName] : moduleName
    if (!module) return

    // Add event listeners
    if (module.on && module.on.pageInit) {
      const callbacks = this.wcPageInitCallbacks || (this.wcPageInitCallbacks = [])
      callbacks.push(module.on.pageInit)
    }
  }
}
