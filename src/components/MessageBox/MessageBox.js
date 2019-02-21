import MessageBox from './MessageBox.vue'
import Vue from 'vue'
let bridge = null
let vm = null
let queue = 0
const Component = Vue.extend(MessageBox)
const clearCache = () => {
  // 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
  vm.$destroy()
  // 删除dom
  if (vm.$el && vm.$el.parentNode) {
    vm.$el.parentNode.removeChild(vm.$el)
  }
  // 释放内存
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

const $MessageBox = (option = {}) => {
  if (queue < 1) {
    vm = new Component().$mount()
    queue++
  }
  if (option.title) vm.title = option.title
  if (option.content) vm.content = option.content
  if (option.cancelText) vm.cancelText = option.cancelText
  if (option.confirmText) vm.confirmText = option.confirmText
  vm.dispatch = dispatchCallBack
  document.body.appendChild(vm.$el)
  Vue.nextTick(() => {
    vm.visible = true
  })

  return new Promise((resolve, reject) => {
    bridge = { resolve, reject }
  })
}

export default $MessageBox
