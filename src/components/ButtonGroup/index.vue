<template>
  <span class="lr-button-group">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'LrButtonGroup'
}
</script>

<style lang="scss">
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";
.lr-button-group{
  button:not(.el-button--primary){
    background: none;
    border: 1px solid transparent;
    color: $--color-primary;
  }
}

</style>
