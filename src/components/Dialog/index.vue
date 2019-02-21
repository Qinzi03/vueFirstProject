<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :show-close="false"
    :before-close="cancelDialog"
    :close-on-click-modal="modal"
    :width="width"
    class="lr-dialog-form">
    <i class="icon-ic_cancel_normal1 iconfont deleteIcon" v-if="showCancel" @click="cancelDialog" />
    <div v-if="showBack" class="lr-dialog-form__back" @click="toBack">
      <i class="el-icon-arrow-left" style="margin-right: 6px" />返回
    </div>
    <div v-if="$slots.title" class="lr-dialog__slot__title">
      <slot name="title" />
    </div>
    <div v-if="subTitle" class="lr-dialog-subtitle">{{ subtitleText }}</div>
    <div class="lr-form--content">
      <slot />
    </div>
    <span v-if="showFooter" slot="footer">
      <el-button class="lr-cancel-text floatL" type="primary" v-if="showCancel" @click="cancelDialog">{{ cancelText }}</el-button>
      <i class="lr-btn-split" v-if="showCancel" />
      <el-button :disabled="confirmDisabled" :class="{ 'lr-only-confirmbtn': !showCancel }" type="primary" @click="confirm">{{ confirmText }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'LrDialog',
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    subTitle: {
      type: Boolean,
      default: true
    },
    subtitleText: {
      type: String,
      default: ''
    },
    robotImg: {
      type: String,
      default: 'robot_normal'
    },
    modal: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    useRobot: {
      type: Boolean,
      default: true
    },
    confirmDisabled: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    showBack: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: this.visible || false
    }
  },
  watch: {
    dialogVisible(val) {
      this.$emit('update:visible', val)
    },
    visible(val) {
      this.dialogVisible = val
    }
  },
  methods: {
    cancelDialog() {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    confirm() {
      this.$emit('confirm')
    },
    toBack() {
      this.$emit('back')
    }
  }
}

</script>

<style lang="scss">
$dialogContentPaddingLeft: 32;
$dialogCloseIndex: 5000;

.lr-dialog-form {
  .el-dialog {
    width: 400px;
    margin-top: 20vh!important;
    .el-dialog__header {
      padding-top: 34px;
      text-align: center;
      .el-dialog__title {
        font-size: 20px;
        color: rgba(0,0,0,0.65);
        font-weight: bold;
      }
    }
    .el-dialog__body {
      padding: 0;
      .lr-form--content {
        padding: 14px #{$dialogContentPaddingLeft}px 14px #{$dialogContentPaddingLeft}px;
      }
      .el-form--label-top .el-form-item__label {
        padding: 0;
      }
      .el-select {
        width: 100%;
      }
    }
    .lr-dialog-subtitle {
      font-size: 16px;
      line-height: 30px;
      padding: 10px 0 10px 32px;
      color: rgba(0, 0, 0, .75);
    }

    .lr-robot-img {
      position: absolute;
      top: -150px;
      left: 50%;
      margin-left: -137px;
    }
    .deleteIcon {
      position: absolute;
      top: 40px;
      right: 32px;
      font-size: 14px;
      cursor: pointer;
      z-index: $dialogCloseIndex;
      color: rgba(0,0,0,0.43);
      &:hover {
        color: #7460EE;
      }
    }
    .lr-dialog-form__back{
      position: absolute;
      top: 41px;
      left: 32px;
      cursor: pointer;
      z-index: $dialogCloseIndex;
      font-size: 14px;
      line-height: 14px;
      color: rgba(0,0,0,0.43);
      i {
        color: rgba(0,0,0,0.43);
      }
    }
    .el-dialog__footer {
      padding: 10px 0 0;
      position: relative;
      .lr-cancel-text {
        span {
          opacity: .7;
        }
      }
      .lr-btn-split {
        position: absolute;
        top: 28px;
        margin-left: -1px;
        width: 2px;
        height: 24px;
        background: rgba(255, 255, 255, .5);
      }
      .el-button--small {
        width: 50%;
        line-height: 56px;
        padding: 0;
        border-radius: 0;
        span {
          font-size: 16px;
        }
        &.lr-only-confirmbtn {
          width: 100%;
        }
      }
      .el-button + .el-button {
        margin: 0;
      }
      .is-disabled{
        background-color: #d9d9d9 !important;
        border-color: #d9d9d9 !important;
      }
    }
    .el-form-item{
      margin-top: -4px !important;
    }
  }

  .lr-dialog__slot__title{
    padding: 0 #{$dialogContentPaddingLeft}px;
    width: 100%;
    position: absolute;
    top: 30px;
    text-align: center;
  }
}

</style>
