export function fromStore(store) {
  return {
    enter(transition, setValue) {
      this._unsubscribe = store.subscribe(setValue)
    },
    leave() {
      if (this._unsubscribe) this._unsubscribe()
    },
  }
}
