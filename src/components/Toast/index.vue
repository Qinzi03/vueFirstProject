<template>
  <transition name="ls-toast-fade">
    <div v-if="show" :class="iClass" class="lr-toast-cpn">
      <div class="title-container">
        <i class="iconfont icon-ic_wrong_normal"/>
        <span class="title">{{ title }}</span>
      </div>
      <div class="message">{{ message }}</div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      duration: 3000,
      iClass: '',
      title: '',
      message: '',
      dispatch: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = false
      this.dispatch('resolve')
    }, this.duration)
  }
}
</script>
<style lang="scss">
.lr-toast-cpn {
  z-index: 9999;
  position: fixed;
  top: 10px;
  left: 50%;
  width: 415px;
  padding: 8px 16px 16px 16px;
  background-color: #FFF1F0;
  border: 1px solid #FDC5C7;
  border-radius: 3px;
  transform: translate(-50%);
  .title-container {
    margin: 0;
    i {
      color: #F66C6F;
    }
    .title {
      margin-left: 4px;
      font-size: 16px;
      font-weight: bold;
      color: #F66C6F;
    }
  }
  .message {
    margin-top: 8px;
    margin-left: 24px;
    font-size: 14px;
    line-height: 14px;
  }
}
.ls-toast-fade-enter-active, .ls-toast-fade-leave-active {
  transition: all .6s ease;
}
.ls-toast-fade-enter, .ls-toast-fade-leave-to {
  top: -20px;
}
</style>
