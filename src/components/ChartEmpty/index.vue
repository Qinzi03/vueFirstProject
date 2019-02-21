<template>
  <div class="lr-empty-chart">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'LrEmptyChart',
  props: {
    message: {
      type: String,
      default: '主人，您当前的查询条件下暂无数据哦'
    }
  }
}
</script>

<style lang="scss">
.lr-empty-chart{
  width: 100%;
  padding: 50px 0;
  text-align: center;
  color: rgba(0, 0, 0, 0.43);
  text-align: center;
  // transform: translateX(-50%)
}

</style>
