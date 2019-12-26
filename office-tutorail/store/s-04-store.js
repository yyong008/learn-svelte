import { readable, derived } from 'svelte/store';

export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date())
  })
  
  return function stop() {
    clearInterval(interval)
  }
})

const start = new Date()

export const elapsed = derived(
  time, 
  $time => Math.round(($time - start) / 1000)
)