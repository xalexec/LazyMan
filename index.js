const LazyMan = function (name) {
  var queue = []
  let cb = function () {
    let fn = queue.shift()
    fn && fn()
  }
  let run
  let exec = function () {
    run = setTimeout(function () {
      cb()
    }, 0)
  }
  exec()
  var add = function (fn, index) {
    clearTimeout(run)
    if (!index && index !== 0) {
      queue.push(fn)
    } else {
      queue.splice(index, 0, fn)
    }
    exec()
  }
  add(function () {
    console.log(`hi ${name}`)
    cb()
    return this
  })
  return {
    sleep: function (time) {
      add(function () {
        setTimeout(cb, time * 1000)
      })
      return this
    },
    sleepFirst: function (time) {
      add(function () {
        setTimeout(cb, time * 1000)
      }, 0)
      return this
    },
    eat: function (food) {
      add(function () {
        console.log(`ect ${food}`)
        cb()
      })
      return this
    }
  }
}
