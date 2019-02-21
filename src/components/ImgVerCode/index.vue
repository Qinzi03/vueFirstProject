<!-- 图形验证码通用组件 -->
<template>
  <div class="imgVerCode-cpn" @click="clickImg">
    <img v-if="imgSrc" :src="imgSrc">
    <div v-else/>
  </div>
</template>
<script>
export default {
  name: 'ImgVerCode',
  props: {
    imageKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imgSrc: ''
    }
  },
  created() {
    this.update()
  },
  methods: {
    update() {
      this.$http.getImageVerCode(this.imageKey, { axiosRes: 1 })
        .then((res) => {
          this.$emit('update', res.headers.imagekey)
          const objUrl = URL.createObjectURL(res.data)
          this.imgSrc = objUrl
        // let base64Data = new Buffer(res.data, 'binary').toString('base64')
        // this.imgSrc = `data:image/jpeg;base64,${base64Data}`
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    clickImg() {
      this.update()
    }
  }
}
</script>
<style lang="scss">
.imgVerCode-cpn {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  img, div {
    width: 100%;
    height: 100%;
  }
  div {
    border: 1px solid #D9D9D9;
  }
}
</style>
