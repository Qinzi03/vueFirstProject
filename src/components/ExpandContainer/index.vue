<template>
  <div>
    <div :id="id" class="lr-expand-container__item" :style="itemClass">
      <slot />
    </div>
    <div v-if="show" :style="{ 'margin-right': right + 'px'}" @click.stop="toggle" class="lr-expand-container__action">
      <template v-if="collapse">
        更多<i class="el-icon-caret-bottom" />
      </template>
      <template v-else>
        收起<i class="el-icon-caret-top" />
      </template>
    </div>
  </div>
</template>

<script>
import { idGenerator } from '@/utils'
export default {
  name: 'LrExpandContainer',
  props: {
    height: {
      type: Number,
      default: 100
    },
    show: { // 是否显示底部按钮
      type: Boolean,
      default: true
    },
    right: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      collapse: true,
      minHeight: this.show ? `${this.height}px` : 'auto',
      id: `LrExpand${idGenerator.next()}`
    }
  },
  computed: {
    itemClass() {
      return {
        height: this.minHeight
      }
    }
  },
  watch: {
    collapse() {
      if (this.show) {
        this.updateHeight()
      }
    },
    show() {
      this.updateHeight()
    }
  },
  methods: {
    updateHeight() {
      if (this.collapse) {
        this.minHeight = `${this.height}px`
      } else {
        this.minHeight = 'auto'
      }
    },
    toggle() {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style lang="scss">
.container__test{
  width: 50%;
  display: inline-block;
  line-height: 50px;
}
.lr-expand-container__item{
  overflow: hidden;
}
.lr-expand-container__action{
  text-align: right;
  font-size: 14px;
  color: rgba(0,0,0,0.65);
  i{
    margin-left: 6px;
  }
  &:hover{
    cursor: pointer;
    opacity: 0.8;
  }
}
</style>
