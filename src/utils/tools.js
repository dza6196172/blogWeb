export function debounce(fn, timer = 1500) {
  var t = null
  return function () {
    if (t) { return }

    if (!t) {
      fn.apply(this, arguments)
    }

    t = setTimeout(() => {
      t = null
    }, timer);
  }
}

export function throttle(fn,delay) {
  var flag = true;
  return function() {
      if (flag) {
          setTimeout(() => {
              fn.call(this)
              flag = true;
          }, delay);
      }
      flag = false;
  }
}