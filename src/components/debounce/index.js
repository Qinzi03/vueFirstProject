import Vue from 'vue'
const debounce = (func, time, ctx) => {
  let timer
  const rtn = (...params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(ctx, params)
    }, time)
  }
  return rtn
}

Vue.component('Debounce', {
  abstract: true,
  props: {
    time: {
      type: Number,
      default: 500
    },
    events: {
      type: String,
      default: 'click'
    }
  },
  created() {
    this.eventKeys = this.events.split(',')
    this.originMap = {}
    this.debouncedMap = {}
  },
  render() {
    const vnode = this.$slots.default[0]
    this.eventKeys.forEach(key => {
      if (vnode.componentOptions && vnode.componentOptions.listeners[key]) {
        const target = vnode.componentOptions.listeners[key]
        if (target === this.originMap[key] && this.debouncedMap[key]) {
          vnode.componentOptions.listeners[key] = this.debouncedMap[key]
        } else if (target) {
          this.originMap[key] = target
          this.debouncedMap[key] = debounce(target, this.time, vnode)
          vnode.componentOptions.listeners[key] = this.debouncedMap[key]
        }
      } else if (vnode.data.on && vnode.data.on[key]) {
        const target = vnode.data.on[key]
        if (target === this.originMap[key] && this.debouncedMap[key]) {
          vnode.data.on[key] = this.debouncedMap[key]
        } else if (target) {
          this.originMap[key] = target
          this.debouncedMap[key] = debounce(target, this.time, vnode)
          vnode.data.on[key] = this.debouncedMap[key]
        }
      }
    })
    return vnode
  }
})
