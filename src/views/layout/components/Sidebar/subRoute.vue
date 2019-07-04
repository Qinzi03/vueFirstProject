<template>
  <div v-if="route">
    <template v-if="route.children.length === 1">
      <div :class="{ 'is-current': route.children[0].name === $route.name }" class="lr-menu-item" @click.stop="changeRoute(route.children[0])">
        <item :is-expand="isExpand" :icon="route.children[0].meta.icon" :title="route.children[0].meta.title"/>
      </div>
    </template>
    <template v-else>
      <el-popover v-model="visible" :visible-arrow="false" trigger="hover" placement="right" popper-class="lr-popover-menu">
        <div>
          <div v-for="(subRoute, $index) of route.children" :key="$index" :class="{ 'is-current': subRoute.name === $route.name }" class="lr-menu-item__sub" @click="changeRoute(subRoute)">{{ subRoute.meta.title }}</div>
        </div>
        <div slot="reference">
          <div :class="{ 'is-current': (parentName === route.name) }" class="lr-menu-item" @click="changeRoute(route)">
            <item :is-expand="isExpand" :icon="route.meta.icon" :title="route.meta.title"/>
            <i v-show="isExpand" class="el-icon-arrow-right" />
          </div>
        </div>
      </el-popover>
    </template>
  </div>
</template>

<script>
import Item from './Item'

export default {
  name: 'LrSubRoute',
  components: {
    Item
  },
  props: {
    route: {
      type: Object,
      required: true
    },
    parentName: {
      type: String,
      default: ''
    },
    isExpand: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    changeRoute(subRoute) {
      this.$router.push({
        name: subRoute.name
      })
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
$menuActiveColor: #6BDBAB;

.lr-menu-item{
    padding-left: 20px;
    height: 30px;
    line-height: 30px;
    position: relative;
    border-left: 4px solid transparent;
  svg{
    font-size: 18px;
    margin-right: 8px;
  }
  span{
    font-size: 14px;
    color: rgba(255,255,255,0.75);
  }
  i{
    position: absolute;
    color: #ffffff;
    right: 14px;
    top: 8px;
  }
  &:hover{
    cursor: pointer;
    background: rgba(0,0,0,0.16);
  }
  &.is-current{
    border-left-color: $menuActiveColor;
    background: rgba(0,0,0,0.16);
    span {
      color: #6BDBAB;
    }
  }
}
.lr-menu-item__sub{
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #57429F ;
  font-size: 14px;
  color: rgba(255,255,255,0.65);
  &:hover{
    cursor: pointer;
    color: $menuActiveColor;
    background: #5d4c98;
  }
  &.is-current{
   color: $menuActiveColor;
  }
}
.lr-popover-menu{
  padding: 0;
  margin-top: 30px;
  margin-left: 0 !important;
  border-left: 0;
}
</style>
