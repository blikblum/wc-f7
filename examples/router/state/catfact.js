import { action, atom, onMount } from 'nanostores'

export const catFact = atom('No fact')

export const updateCatFact = action(catFact, 'updateCatFact', async (store) => {
  const response = await fetch('https://catfact.ninja/fact')
  const data = await response.json()
  store.set(data.fact)
})

onMount(catFact, () => {
  console.log('catfact mounted')

  return () => {
    console.log('catfact unmounted')
  }
})
