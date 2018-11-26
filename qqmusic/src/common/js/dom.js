export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function getData (el, name, val) {
  // 基础格式
  let prefix = 'data-'
  // 判断 val 是否有值
  if (val) {
    // 如果有值，则给对象赋值值
    el.setAttribute(prefix + name, val)
  }
  // 取出该对象的值
  return el.getAttribute(prefix + name)
}
