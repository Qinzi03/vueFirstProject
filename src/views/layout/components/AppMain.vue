<template>
  <div class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";

.app-main {
  padding-top: #{$navbarHeight}px;
  position: relative;
  background-color: $pageBg;
  min-height: calc(100vh + 50px);
  &:after{
    content: '';
    display: block;
    overflow: hidden;
  }
}
</style>

