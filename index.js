const LazyMan = function (name) {
  let queue = []
  const cb = function () {
    const fn = queue.shift()
    fn && fn()
  }
  setTimeout(function () {
    cb()
  })
  queue.push(function () {
    console.log(`hi ${name}`)
    cb()
  })
  return {
    sleep: function (time) {
      queue.push(function () {
        setTimeout(cb, time * 1000)
      })
      return this
    },
    sleepFirst: function (time) {
      queue.splice(0, 0, function () {
        setTimeout(cb, time * 1000)
      })
      return this
    },
    eat: function (food) {
      queue.push(function () {
        console.log(`eat ${food}`)
        cb()
      })
      return this
    }
  }
}
LazyMan('alex').sleep(1).eat('😄').sleepFirst(2).sleep(2).eat('😭')
