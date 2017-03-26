class LM {
  constructor (name) {
    this.queue = []
    setTimeout(() => {
      let next = () => {
        let run = this.queue.shift()
        run && run().then(() => { next() })
      }
      next()
    })
    this.queue.push(() =>
      new Promise((resolve, reject) => {
        console.log(`hi ${name}`)
        resolve()
      })
    )
  }
  sleep (time) {
    this.queue.push(() =>
      new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, time * 1000)
      })
    )
    return this
  }
  sleepFirst (time) {
    this.queue.splice(0, 0, () =>
      new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, time * 1000)
      })
    )
    return this
  }
  eat (food) {
    this.queue.push(() =>
      new Promise((resolve, reject) => {
        console.log(`eat ${food}`)
        resolve()
      })
    )
    return this
  }
}
function LazyMan (name) {
  return new LM(name)
}
LazyMan('alex').sleep(1).eat('😄').sleepFirst(2).sleep(2).eat('😭')
