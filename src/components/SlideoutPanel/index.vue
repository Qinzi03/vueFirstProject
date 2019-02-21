<template>
  <transition name="custom-classes-transition" enter-active-class="animated faster slideInRight" leave-active-class="animated faster slideOutRight">
    <div v-if="visible" :style="panelStyle" class="lr-slideout-panel">
      <div class="lr-slideout-panel__robot" @click.stop="backgroundClick">
      </div>
      <div class="lr-slideout-panel__right">
        <div class="lr-slideout-panel__header">
          <div class="lr-slideout-panel__header__close" @click="closeDialog"><i class="iconfont icon-ic_open_normal"/></div>
          <div class="lr-slideout-panel__header__title">{{ title }}</div>
          <div class="lr-slideout-panel__header__button">
            <slot name="button"/>
          </div>
        </div>
        <div :class="['lr-theme-' + theme ]" class="lr-slideout-panel__content">
          <slot />
        </div>
        <div v-if="theme !== 'default'" :class="['lr-theme-' + theme ]" class="lr-slideout-panel__footer">
          <template v-if="theme === 'dialog'">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
          </template>
          <template v-else-if="theme === 'view'">
            <div style="height: 40px;">
              <el-button type="primary" @click="closeDialog">返回</el-button>
            </div>

          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * 暂时只支持一个内容块
 */
export default {
  name: 'LrSlideoutPanel',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '客户详情'
    },
    width: { // 宽度（百分比）
      type: [String, Number],
      default: '1000px'
    },
    theme: { // 侧滑风格 '' | dialog | view
      type: String,
      default: 'default'
    }
  },
  data() {
    if (this.visible) { // 响应默认值为true的情况
      this.createBackgroundMask()
    }
    const root = document.querySelector('#app')
    return {
      root: root,
      backgroundClass: 'lr-slideout-panel-bg'
    }
  },
  computed: {
    panelStyle() {
      if (isNaN(this.width)) {
        return {
          width: `${this.width}`, // eslint-disable-next-line
          left: `calc(100% - ${this.width})`
        }
      } else {
        return {
          width: `${this.width}%`,
          left: `${100 - this.width}%`
        }
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.createBackgroundMask()
        this.root.style.overflow = 'hidden'
      } else {
        this.removeBackgroundMask()
        this.root.style.overflow = 'auto'
      }
    }
  },
  destroyed() {
    this.removeBackgroundMask()
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    },
    createBackgroundMask() { // 创建背景遮罩
      if (!document.querySelector(`.${this.backgroundClass}`)) {
        this.$nextTick(_ => {
          const backgroundDiv = document.createElement('div')
          backgroundDiv.classList = this.backgroundClass
          document.body.append(backgroundDiv)

          backgroundDiv.addEventListener('click', this.backgroundClick, false)
        })
      }
    },
    removeBackgroundMask() { // 清除遮罩
      const backgroundMask = document.querySelector(`.${this.backgroundClass}`)
      if (backgroundMask) {
        backgroundMask.removeEventListener('click', this.backgroundClick)
        backgroundMask.remove()
      }
    },
    backgroundClick() { // 点击背景，关闭弹窗
      this.$emit('update:visible', false)
    },
    closeDialog() {
      this.$emit('closeDialog')
      this.backgroundClick()
    }
  }
}
</script>

<style lang="scss">
  $bgIndex: 1900;
  $panelIndex: $bgIndex + 50;
  $robotWidth: 90;
  .lr-slideout-panel-bg {
    position: fixed;
    z-index: $bgIndex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    overflow-y: hidden;
  }

  .lr-slideout-panel {
    position: fixed;
    height: 100%;
    top: 0;
    overflow: auto;
    z-index: $panelIndex;
    display: flex;
    transition: opacity 0.15s;
    .lr-slideout-panel__robot{
      width: #{$robotWidth}px;
      .lr-slideout-panel__robot__avatar{
        height: 120px;
        margin-left: 3px;
        margin-top: 10px;
      }
      .lr-slideout-panel__robot__hand{
        z-index: 100;
        position: relative;
        width: 48px;
        margin-left: 67px;
        margin-top: -28px;
      }
    }
    .lr-slideout-panel__right{
      overflow: hidden;
      flex: 1;
      background: #f8f8fd;
      box-shadow: -1px 0 4px 0 rgba(0,0,0,0.02), -2px 0 8px 0 rgba(0,0,0,0.08);
      height: 100%;
    }
    .lr-slideout-panel__header{
      display: flex;
      position: relative;
      padding: 24px 24px 22px 24px !important;
      background: #fff;
      border-bottom: 1px solid #E9E9E9;

      .lr-slideout-panel__header__close{
        margin-left: 3px;
        color: #fff;
        margin-right: 10px;
        line-height: 32px;
        i{
          transform: rotateZ(0deg);
          display: inline-block;
          font-size: 16px;
          color: rgba(0,0,0,0.75);
          cursor: pointer;
        }
      }
      .lr-slideout-panel__header__title{
        color: #333333;
        font-size: 24px;
        line-height: 30px;
      }
      .lr-slideout-panel__header__button{
        flex: 1;
        text-align: right;
        .el-button + .el-button {
          margin-left: 8px;
        }
      }
    }
    .lr-slideout-panel__content{
      padding: 24px 24px;
      overflow: auto;
      height: calc(100% - 85px);
      &.lr-theme-dialog{
        height: calc(100% - 152px);
        overflow: auto;
      }
      &.lr-theme-view{
        overflow: auto;
        height: calc(100% - 120px);
      }
    }
    .lr-slideout-panel__footer{
      text-align: right;
      background: #FFFFFF;
      box-shadow: inset 0 1px 0 0 #D9D9D9;
      background: #ffffff;
      &.lr-theme-dialog{
        padding: 16px 24px;
        height: 72px;
        .el-button{
          width: 80px;
          height: 40px;
          font-size: 16px;
        }
      }

      &.lr-theme-view{
        height: 60px;
        .el-button{
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          width: 100%;
          height: 100%;
          font-size: 16px;
        }
      }
    }
  }

</style>
