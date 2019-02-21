<template>
  <div :class="typeClass" class="lr-message-bar">
    <i class="iconfont icon-ic_hint_normal" /><slot />
  </div>
</template>

<script>
/**
 * 消息条效果
 */
export default {
  name: 'LrMessageBar',
  props: {
    type: {
      type: String,
      default: 'warning'
    }
  },
  data() {
    return {
    }
  },
  computed: {
    typeClass() {
      return [`lr-${this.type}`]
    }
  }
}
</script>

<style lang="scss">
.lr-message-bar{
  border-radius: 3px;
  padding: 8px;
  .iconfont{
    margin: 0 8px;
  }
  &.lr-warning{
    background: #FDF0D9;
    border: 1px solid rgba(245,166,35,0.43);
     color: #F5A623;
    .iconfont{
      color: inherit;
    }
  }
}

</style>
