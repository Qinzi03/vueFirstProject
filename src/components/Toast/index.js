import Vue from 'vue'
import Toast from './index.vue'

let bridge = null
let vm = null
let queue = 0

const Component = Vue.extend(Toast)

const clearCache = () => {
  vm.$destroy()
  vm.$el.parentNode.removeChild(vm.$el)
  vm = null
  bridge = null
  queue = 0
}

const dispatchCallBack = (action) => {
  if (action === 'resolve') {
    bridge.resolve('confirm')
  } else {
    bridge.reject('cancel')
  }
  clearCache()
}

const ToastHandler = (option = {}) => {
  if (typeof option === 'string') {
    option = {
      message: option
    }
  }

  if (queue < 1) {
    vm = new Component().$mount()
    queue++
  }

  /* eslint-disable */
  if (option.duration)vm.iClass   = option.duration
  if (option.iClass)  vm.iClass   = option.iClass
  if (option.icon)    vm.icon     = option.icon
  if (option.title)   vm.title    = option.title
  if (option.message) vm.message  = option.message
  /* eslint-enable */
  vm.dispatch = dispatchCallBack

  document.body.appendChild(vm.$el)

  Vue.nextTick(() => {
    vm.show = true
  })

  return new Promise((resolve, reject) => {
    bridge = { resolve, reject }
  })
}

export default ToastHandler
