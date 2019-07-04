<template>
  <li class="lr-department">
    <div :class="{ 'showFirst': model.first }" class="lr-department-content">
      <i
        v-show="!model.first"
        :class="{ 'icon-right': model.hasChild, 'icon-bottom': !model.hasChild }"
        class="el-icon-caret-right"
        @click="model.hasChild = !model.hasChild" />
      <span @click="showTable(model)">
        <!-- {{ model.id === activeId }} -->
        {{ model.name }}
      </span>
      <div v-if="!model.first" class="icon">
        <i class="icon-ic_add_normal iconfont" @click="addplus(model)" />
        <i class="icon-ic_compile_normal1 iconfont" @click="editplus(model)" />
        <i class="icon-ic_delate_normal iconfont" @click="deleteplus(model)" />
      </div>
    </div>
    <ul v-show="!model.hasChild">
      <tree-menu v-for="(item, $index) in model.children" :model="item" :key="$index" />
    </ul>
  </li>
</template>
<script>
import bus from '@/utils/bus'
export default {
  name: 'TreeMenu',
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeId: ''
    }
  },
  mounted() {
    // this.bindEventListener()
  },
  methods: {
    bindEventListener() {
      this.$nextTick(() => {
        if (document.getElementsByClassName('lr-department-content')[0]) {
          document.getElementsByClassName('lr-department-content')[0].children[1].className = 'active'
          const boxs = document.getElementsByClassName('lr-department-content')
          const len = boxs.length
          for (let key = 0; key < len; key++) {
            boxs[key].children[1].addEventListener('click', event => {
              for (let key = 0; key < len; key++) {
                boxs[key].children[1].className = ''
              }
              if (event.target.nodeName === 'SPAN') {
                event.target.className = 'active'
              }
            }, false)
          }
        }
      })
    },
    addplus(item) { // 新增按钮
      // console.log('新增', item)
      const obj = {}
      obj.id = item.id
      obj.name = item.name
      obj.type = item.type
      obj.parentId = item.parentId
      bus.$emit('addPost', obj)
    },
    editplus(item) { // 编辑按钮
      const obj = {}
      obj.id = item.id
      obj.name = item.name
      obj.parentId = item.parentId
      bus.$emit('editPost', obj)
    },
    deleteplus(item) { // 删除按钮
      const obj = {}
      obj.id = item.id
      obj.name = item.name
      bus.$emit('deletePost', obj)
    },
    showTable(item) { // 展示表格内容
      this.activeId = item.id
      const obj = {}
      obj.id = item.id
      obj.code = item.code
      obj.name = item.name
      obj.type = item.type
      obj.parentId = item.parentId
      bus.$emit('showTableList', obj)
    }
  }
}
</script>
<style lang="scss" scoped>
.lr-department {
  font-size: 14px;
  font-weight: bold;
  .showFirst {
    padding-left: 20px;
  }
  .active {
    color: #7460EE;
  }
  ul {
    transition: all .2s;
    padding-left: 20px;
    margin: 0;
  }
  .icon {
    display: inline-block;
    opacity: 0;
    padding-right: 20px;
    i {
      padding-left: 3px;
      font-weight: normal;
      font-size: 14px;
    }
  }
  .lr-department-content {
    line-height: 32px;
    white-space: nowrap;
    cursor: pointer;
    .el-icon-caret-right {
      transition: all .2s;
      transform: rotate(0deg);
    }
    .icon-bottom {
      transform: rotate(90deg);
    }
    & .el-icon-caret-right:hover {
      color: #7460EE;
    }
    &:hover .icon {
      color: #7460EE;
      opacity: 1;
    }
    & span:hover {
      color: #7460EE;
    }
  }
}
</style>
