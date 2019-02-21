<template>
  <div class="lr-page">
    <div v-if="showPath" class="lr-page--breadcrumb">
      <lr-breadcrumb />
    </div>
    <div v-if="showTitle" class="lr-page--title">
      {{ title }}
    </div>
    <div v-if="$slots.subTitle" class="lr-page--subtitle">
      <slot name="subTitle" />
    </div>
    <div :class="{ 'lr-page--content_top': !showPath }" class="lr-page--content">
      <slot />
    </div>
    <div class="lr-page--dialog">
      <slot name="dialog" />
      <!-- 弹窗占位符 -->
    </div>
    <back-to-top v-if="backToTop" />
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import BackToTop from '@/components/BackToTop/index.vue'

export default {
  name: 'LrPage',
  components: {
    'lr-breadcrumb': Breadcrumb,
    [BackToTop.name]: BackToTop
  },
  props: {
    showPath: {
      type: Boolean,
      default: true
    },
    backToTop: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    title() {
      const current = this.$route
      if (current.meta) {
        return current.meta.title || ''
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss">
@import "src/styles/variables.scss";
.lr-page{
  padding: 24px 30px;
  .lr-page--breadcrumb{
    margin-top: -19px;
    margin-left: -10px;
  }
  .lr-page--content{
  }
  .lr-page--content_top {
  }
  .lr-page--title{
    margin-top: -2px;
    color: #{$font-color-title};
    font-size: 24px;
    line-height: 24px;
    font-weight: 400;
    margin-bottom: 0px;
  }
  .lr-page--subtitle{
    font-size: 14px;
    color: $font-color-normal;
    margin-top: 14px;
    display: inline-block;
    .el-button--text{
      font-weight: 600;
      cursor:text;
      border:0 none;
    }
  }
}
</style>
