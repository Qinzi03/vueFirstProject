<template>
  <el-scrollbar>
    <div style="font-size: 14px; margin-bottom: 60px;">
      <div v-for="(routeItem, $index) of currentRouteList" :key="$index">
        <div v-if="isExpand" class="lr-sidebar-header">{{ routeItem.title }}</div>
        <div v-else class="lr-sidebar-split"></div>
        <div v-for="(route, $index) of routeItem.routeList" :key="$index">
          <lr-sub-route :route="route" :parent-name="parentRouteName" :is-expand="isExpand"/>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { routeScopeMap } from '@/router'
import SubRouterItem from './subRoute.vue'

export default {
  components: {
    SidebarItem,
    [SubRouterItem.name]: SubRouterItem
  },
  props: {
    isExpand: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      lastMeta: null,
      currentRouteList: [],
      parentRouteName: ''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch: {
    '$route': {
      handler(val) {
        this.updateIcon(val)
        this.parentRouteName = val.matched[0].name || ''
      },
      immediate: true
    }
  },
  mounted() {
    const rawRouteList = this.permission_routers.filter(item => !item.hidden).filter(item => item.meta && item.meta.scope)
    const result = []
    rawRouteList.forEach(item => {
      const scopeKey = item.meta.scope
      let scopeItemIndex = result.findIndex(item => item.key === scopeKey)
      if (scopeItemIndex === -1) {
        result.push({
          key: scopeKey,
          title: routeScopeMap[scopeKey].title,
          order: routeScopeMap[scopeKey].order,
          routeList: []
        })
        scopeItemIndex = result.length - 1
      }
      item.meta.popoverVisible = false
      result[scopeItemIndex].routeList.push(item)
    })
    result.sort((former, later) => {
      return former.order - later.order
    })
    this.$set(this, 'currentRouteList', result)
    this.updateIcon(this.$route)
  },
  methods: {
    updateIcon(val) {
      // if (this.lastMeta && this.lastMeta.icon.indexOf('_selected') !== -1) {
      //   this.lastMeta.icon = this.lastMeta.icon.substring(0, this.lastMeta.icon.indexOf('_selected'))
      // }
      // const parentRoutePath = val.matched[0].path

      // const currentRouteItem = this.permission_routers.filter(item => item.path === parentRoutePath)[0]

      // if (currentRouteItem.children.length === 1) {
      //   if (currentRouteItem.meta && currentRouteItem.meta.icon) {
      //     this.updateCurrentIcon(currentRouteItem)
      //   } else {
      //     this.updateCurrentIcon(currentRouteItem.children[0])
      //   }
      // } else {
      //   this.updateCurrentIcon(currentRouteItem)
      // }
    },
    updateCurrentIcon(iconItem) {
      iconItem.meta.icon = iconItem.meta.icon + '_selected'
      this.lastMeta = iconItem.meta
    }
  }
}
</script>

<style lang="scss">
.lr-sidebar-header{
  margin-left: 16px;
  margin-top: 14px;
  margin-bottom: 8px;
  color: #ffffff;
  line-height: 19px;
  font-weight: bold;
}
.lr-sidebar-split {
  width: 20px;
  height: 4px;
  background-color: #6BDBAB;
  margin-left: 23px;
  margin-top: 21px;
  margin-bottom: 16px;
}
</style>

