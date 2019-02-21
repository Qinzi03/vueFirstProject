<template>
  <div class="lr-loading-panel">
    <div v-show="state === 0">
      <div :style="positionStyle" class="lr-loading-panel--effect">
        <div class="lr-loading-panel--effect--content">数据正在全力加载中...</div>
      </div>

    </div>
    <div v-show="state === 1">
      <slot />
    </div>
    <div v-show="state === 2" @click="emitReload">
      <div :style="positionStyle" class="lr-loading-panel--effect">
        <div class="lr-loading-panel--effect--content" style="margin-top: 14px"><el-button type="text">主人，您所查看的内容正在努力生成中，请稍后~</el-button></div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'LrLoadingPanel',
  props: {
    state: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 150
    }
  },
  computed: {
    positionStyle() {
      return {
        'padding-top': this.top + 'px'
      }
    }
  },
  methods: {
    emitReload() {
      this.$emit('update:state', 0)
      this.$emit('init')
    }
  }
}
</script>

<style lang="scss">
.lr-loading-panel{
  .lr-loading-panel--effect{
    min-height: 300px;
    img {
      max-width: 33%;
      display: block;
      margin: 0 auto;
    }
    .lr-loading-panel--effect--content{
      text-align: center;
      margin-top: 23px;
      font-size: 14px;
      color: rgba(0,0,0,0.65);
      letter-spacing: 0;
      line-height: 14px;
    }
  }
}

</style>
