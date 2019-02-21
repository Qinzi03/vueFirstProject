<!-- 短信验证码倒计时通用组件 -->
<template>
  <el-button :disabled="countDownDisabled || time > 0" :class="{active: time > 0}" class="count-down-cpn" type="primary" @click.prevent="clickBtn">
    {{ text }}
  </el-button>
</template>
<script>
export default {
  name: 'CountDown',
  props: {
    second: {
      type: Number,
      default: 60
    },
    beforeClick: {
      type: Function,
      default: function() {}
    },
    runFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      countDownDisabled: false,
      time: 0,
      timeInter: null
    }
  },
  computed: {
    text: function() {
      return this.time > 0 ? this.time + ' 秒后可重新获取' : '发送短信验证码'
    }
  },
  watch: {
    runFlag: function(val) {
      if (val) {
        this.run()
      }
    }
  },
  methods: {
    reset() {
      clearInterval(this.timeInter)
      this.time = 0
    },
    run() {
      this.time = this.second
      this.timer()
    },
    timer() {
      this.timeInter = setInterval(() => {
        if (this.time > 0) {
          this.time--
        } else {
          clearInterval(this.timeInter)
        }
      }, 1000)
    },
    clickBtn() {
      this.beforeClick()
        .then(() => {
          this.countDownDisabled = true
          setTimeout(() => {
            this.run()
            this.countDownDisabled = false
          }, 0)
        })
        .catch(() => {
          this.reset()
        })
    }
  }
}
</script>
<style lang="scss">
.count-down-cpn {
  padding: 0;
  border: none;
  font-size: 14px;
  font-weight: normal;
  background-color: #7460EE;
  color: #fff;
  &.active {
    background-color: #fff;
    color: #87878C;
  }
  &.el-button--primary.is-disabled, .el-button--primary.is-disabled:hover, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:active {
    color: #87878C;
    background-color: #fff;
    border-color: #fff;
  }
}
</style>
