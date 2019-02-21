/**
 * 全屏加载组件
 */
const maskClass = 'lr-loading-mask'
let container = null
const imageConfig = require('@/utils/image')
const getImageBase = imageConfig.getImageBase
const createLoading = function() {
  if (!container && !document.querySelector(`.${maskClass}`)) {
    container = document.createElement('div')
    container.classList = maskClass
    container.innerHTML = `<img src="${getImageBase()}/loading.gif"/>`
    container.style.display = 'none'
    document.body.append(container)
  }
}

export default {
  install(Vue) {
    Vue.prototype.$loadingUtils = {
      open: function() {
        createLoading()
        container.style.display = 'flex'
      },
      close: function() {
        container.style.display = 'none'
      }
    }
  }
}
