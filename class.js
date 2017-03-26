class LM {
  constructor (name) {
    this.queue = []
    this.cb = () => {
      const fn = this.queue.shift()
      fn && fn()
    }
    setTimeout(() => {
      this.cb()
    })
    this.queue.push(() => {
      console.log(`hi ${name}`)
      this.cb()
    })
  }
  sleep (time) {
    this.queue.push(() => {
      setTimeout(this.cb, time * 1000)
    })
    return this
  }
  sleepFirst (time) {
    this.queue.splice(0, 0, () => {
      setTimeout(this.cb, time * 1000)
    })
    return this
  }
  eat (food) {
    this.queue.push(() => {
      console.log(`eat ${food}`)
      this.cb()
    })
    return this
  }
}
function LazyMan (name) {
  return new LM(name)
}
LazyMan('alex').sleep(1).eat('😄').sleepFirst(2).sleep(2).eat('😭')
