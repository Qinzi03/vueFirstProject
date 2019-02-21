<template>
  <div class="lr-form-editor">
    <div class="lr-form-editor__header">
      <div class="lr-form-editor__title">
        <span>{{ title }}</span>
        <span v-if="!edit&&!disableEdit" @click="doEdit"><svg-icon icon-class="button_edit" /></span>
      </div>
    </div>
    <div :style="contentStyle" class="lr-form-editor__content">
      <slot />
    </div>
    <div v-if="edit" class="lr-form-editor__action">
      <el-button @click="doCancel">取消</el-button>
      <el-button type="primary" @click="doConfirm">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LrFormEditor',
  props: {
    title: {
      type: String,
      default: '主要信息'
    },
    edit: {
      type: Boolean,
      default: false
    },
    disableEdit: {
      type: Boolean,
      default: false
    },
    contentHeight: {
      type: String,
      default: ''
    }
  },
  computed: {
    contentStyle() {
      const result = {}
      if (this.contentHeight) {
        result['height'] = this.contentHeight
      }
      return result
    }
  },
  methods: {
    doEdit() {
      this.$emit('edit')
    },
    doCancel() {
      this.$emit('cancel')
    },
    doConfirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss">
.lr-form-editor{
  background: #FFFFFF;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.02), 0 0 8px 0 rgba(0,0,0,0.08);
  border-radius: 3px;
  padding: 24px 24px 12px 24px;
  position: relative;
  .lr-form-editor__header{
    font-weight: bold;
    font-size: 16px;
    color: rgba(0,0,0,0.75);
  }
  .lr-form-editor__title{
    .svg-icon{
      position: absolute;
      right: 7px;
      top: 7px;
      background: #F5A623;
      font-size: 30px;
      height: 30px;
      color: transparent;
      border-radius: 3px;
      &:hover{
        cursor: pointer;
      }
    }
  }
  .lr-form-editor__action{
    text-align: right;
    // margin-bottom: 12px;
  }
  .el-form-item__label{
    text-align: left;
  }
  .lr-form-editor__content{
    margin-top: 28px;
    margin-bottom: -5px;
  }
  &:after{
    content: '';
    clear: both;
  }
}

</style>
