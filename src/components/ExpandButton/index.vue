<template>
  <div class="lr-expand">
    <el-popover v-model="subButtonVisible" :visible-arrow="false" placement="top" trigger="click" popper-class="lr-expand__class">
      <el-button slot="reference" :class="computedClass" icon="el-icon-plus" type="success" circle class="lr-main-circle-button" @click="mainClick"/>
      <div class="lr-expand__content">
        <slot />
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'LrExpand',
  props: {
    animation: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      subButtonVisible: false
    }
  },
  computed: {
    computedClass() {
      if (this.subButtonVisible && this.animation) {
        return {
          'lr-expand--button__visible': true
        }
      }
    }
  },
  watch: {
    visible(val) {
      this.subButtonVisible = val
    },
    subButtonVisible(val) {
      this.$emit('update:visible', val)
    }
  },
  methods: {
    mainClick() {
      this.$emit('mainClick')
    }
  }
}
</script>

<style lang="scss">
  $circle-button-font-size: 24;
  $circle-button-size: 70;
  $iconIndex: 1930;

  .lr-expand{
    position: fixed;
    z-index: $iconIndex;
    right: 50px;
    // top: calc(100vh - 100px);
    bottom: 30px;
    .el-button.is-circle{
      width: #{$circle-button-size}px;
      height: #{$circle-button-size}px;
      font-size: #{$circle-button-font-size}px;
      background: #6BDBAB;
      box-shadow: 0 2px 11px 0 rgba(107,219,171,0.65);
      border-width: 0px;
    }
    .lr-expand--button__visible{
      transform: rotate(135deg);
      transition-duration: 0.7s;
    }
  }
  .lr-expand__class{
    border: none;
    box-shadow: none;
    background: unset !important;
    transform: translateY(10px);
    .lr-expand__content{
      text-align: center;
      line-height: 86px;
      width: 80px;
      margin-left: 22px;
      margin-top: 5px;
      .el-button+.el-button{
        margin-left: 0 !important;
      }
      .el-button.is-circle{
        width: #{$circle-button-size}px;
        height: #{$circle-button-size}px;
        color: #9fe7c8;
        border: none;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
        i{
          margin-right: 0 !important;
          font-size: 26px;
        }
      }
      .el-button.is-circle:hover {
        background: #ffffff !important;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
      }
      .el-button.is-circle:focus {
        background: #ffffff !important;
      }
      .svg-icon{
        font-size: 32px;
      }
    }
  }
  .lr-main-circle-button{
    &:hover, &:focus{
      color: #ffffff !important;
    }
    &:hover {
      opacity: .8;
    }
  }
</style>
