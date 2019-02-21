// import store from '@/store'

const THRESHOLD = 1024

export default {
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    this.resize()
  },
  methods: {
    resize() {
      const clientWidth = document.body.getBoundingClientRect()
      if (clientWidth > THRESHOLD) {
        this.expandMenu(true)
      } else {
        this.expandMenu(false)
      }
    },
    resizeHandler() {
      this.resize()
    },
    expandMenu(expand = true) {
      if (expand) { // 展开侧边栏
        // TODO
      }
    }
  }
}
