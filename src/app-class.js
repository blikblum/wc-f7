import Framework7 from 'framework7/components/app/app-class'

const resolved = Promise.resolve()

export default class WCFramework7 extends Framework7 {
  static installModule(module, ...params) {
    super.installModule(module, ...params)

    // Wrap pageInit
    const pageInit = module.on && module.on.pageInit
    if (pageInit) {
      module.on.pageInit = async function pageInitWrapper(f7Page) {
        const el = f7Page.el
        await (el.updateComplete || resolved)
        // check for corner case when page is unloaded by router before rendering
        if (el.f7Page) {
          pageInit.call(this, el.f7Page)
        }
      }
    }
  }
}
