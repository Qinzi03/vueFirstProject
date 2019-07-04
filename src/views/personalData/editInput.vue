<template>
  <div :class="{ 'editing': value }" class="edit-input-cpn">
    <span v-if="!value || !hideLabel" class="label">{{ label }}</span>
    <template v-if="value">
      <slot name="edit"></slot>
      <el-button type="primary" style="margin-left: 4px;" @click="clickConfirmBtn">确定</el-button>
      <el-button style="margin-left: 2px;" @click="clickCancelBtn">取消</el-button>
    </template>
    <template v-else>
      <slot name="normal"></slot>
      <span class="svg-wrap" @click="$emit('input', true)">
        <svg-icon v-if="!disabled" style="cursor: pointer;" icon-class="ic_compile_normal1" />
      </span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    hideLabel: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    clickConfirmBtn() {
      this.$emit('confirm')
    },
    clickCancelBtn() {
      this.$emit('input', false)
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss">
.edit-input-cpn {
  &.editing .label {
    color: #7460EE;
  }
  .label {
    display: inline-block;
    width: 136px;
    height: 35px;
    line-height: 35px;
    text-align: right;
    font-size: 14px;
  }
  .svg-wrap {
    margin-left: 4px;
    svg {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
