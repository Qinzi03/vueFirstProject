export default {
  mounted() {
    const params = this.$route.params || {}
    if (params.method) {
      this.$nextTick(_ => {
        setTimeout(_ => {
          this[params.method]()
        }, 300)
      })
    }
    this.$bus.$on('batch_button', data => {
      if (this.$route.name && this.$route.name === data.name) {
        if (this[data.method]) {
          this.$nextTick(_ => {
            this[data.method]()
          })
        }
      }
    })
  },
  beforeDestroy() {
    this.$bus.$off('batch_button')
  }
}
