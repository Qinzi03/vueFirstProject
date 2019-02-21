<template>
  <el-dropdown trigger="hover" class="lr-select-btn" :class="btnPosition" @command="changeBtn">
    <el-button>
      {{ initDesc }}<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown" class="lr-dropdown" :style="{ 'width': itemWidth }">
      <el-dropdown-item v-for="(item, $index) in initOption" :command="item" :key="$index" :disabled="item.flag">
        <span v-if="item.author">{{ item.value }}</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  name: 'Select',
  props: {
    initDesc: {
      type: String,
      default: ''
    },
    initOption: {
      type: Array,
      default: []
    },
    itemWidth: {
      type: String,
      default: '90px'
    },
    btnPosition: {
      type: String,
      default: 'floatL'
    }
  },
  methods: {
    changeBtn(item) {
      this.$emit('onPitch', item)
    }
  }
}
</script>
<style lang="scss">
.lr-select-btn {
  margin-left: 8px;
  .el-icon--right {
    transform: rotate(180deg)
  }
  .el-icon-arrow-down:before {
    content: "\E60C" !important;
  }
  .el-button--small {
    padding: 9px 8px 9px 15px;
  }
}
.lr-dropdown {
  .popper__arrow {
    display: none;
  }
  &.el-popper[x-placement^="bottom"] {
    margin-top: 4px;
  }
  .el-dropdown-menu__item.is-disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
}
</style>
