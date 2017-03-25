let LM = function () {
  this.queue = []
  this.cb = () => {
    const fn = this.queue.shift()
    fn && fn()
  }
}
LM.prototype = {
  sleep (time) {
    this.queue.push(() => {
      setTimeout(this.cb, time * 1000)
    })
    return this
  },
  sleepFirst (time) {
    this.queue.splice(0, 0, () => {
      setTimeout(this.cb, time * 1000)
    })
    return this
  },
  eat (food) {
    this.queue.push(() => {
      console.log(`eat ${food}`)
      this.cb()
    })
    return this
  }
}
function LazyMan (name) {
  var lm = new LM(name)
  setTimeout(function () {
    lm.cb()
  })
  lm.queue.push(function () {
    console.log(`hi ${name}`)
    lm.cb()
  })
  return lm
}
LazyMan('alex').sleep(1).eat('😄').sleepFirst(2).sleep(2).eat('😭')
