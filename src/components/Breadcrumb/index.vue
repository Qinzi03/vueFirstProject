<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-if="scopeTitle" key="ROUTE_PARENT_SCOPE">
        <span class="no-redirect" style="color: #363133">{{ scopeTitle }}</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item) in levelList" v-if="item.meta.title" :key="item.path">
        <span v-if="item.redirect==='noredirect'" class="no-redirect">{{ item.meta.title }}</span>
        <router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { routeScopeMap } from '@/router'

export default {
  data() {
    return {
      levelList: null,
      scopeTitle: ''
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first.meta && first.meta.scope) {
        const metaScope = first.meta.scope
        this.scopeTitle = routeScopeMap[metaScope].title
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 46px;
  margin-left: 10px;
  margin-top:8px;
  .no-redirect {
    color: $--color-primary;
    cursor: default;
  }
}

.el-breadcrumb__item:last-child{
  .el-breadcrumb__inner a{
    color: $--color-primary;
    &:hover{
      cursor: default;
      color: $--color-primary;
    }
  }
}
</style>
