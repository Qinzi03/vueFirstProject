<template>
  <div class="lr-table">
    <div v-if="$slots.other" class="lr-table--other marginT20">
      <div>
        <slot name="other" />
      </div>
    </div>
    <div class="lr-whole-top">
      <div v-if="$slots.search && showClear" class="lr-table--action--clear">
        <i class="iconfont icon-ic_refresh_normal" @click="clear" /><span @click.stop="clear">清空筛选条件</span>
      </div>
      <div v-if="$slots.search" :class="{ 'lr-table__action--empty': !$slots.action }" class="lr-table--search">
        <div @keyup.enter.stop="doSearch">
          <slot name="search" />
          <el-button type="primary" class="lr-search-btn" @click="doSearch">搜索</el-button>
        </div>
      </div>
      <div v-if="$slots.action" :class="{ 'lr-table--selection__empty': selected === 0 }" class="lr-table--action clearfix">
        <slot name="action" />
      </div>
      <div v-if="hasSelection" class="lr-table--selection">
        <!-- 保留旧代码 -->
        <i class="iconfont icon-ic_hint_normal" /><span>已选择&nbsp;{{ selected }}&nbsp;条信息，<span class="lr-table__selection--total" @click.stop="selectAll">点我选中当前页全部信息</span></span><el-button v-if="selected > 0" type="text" style="margin-left: 15px;" @click.stop="clearSelection">清空</el-button>
        <!--<i class="iconfont icon-ic_hint_normal" /><span>已选择&nbsp;{{ selected }}&nbsp;条信息</span>-->
      </div>
      <div>
        <slot />
        <div v-if="pagination" class="lr-table--pagination">
          <el-pagination
            :disabled="page.state === 0"
            @size-change="sizeChanged"
            @current-change="currentChanged"
            :current-page.sync="page.page"
            :page-sizes="pageSizeList"
            :page-size="page.pageSize"
            layout="sizes, prev, pager, next"
            :total="page.total">
          </el-pagination>
 
          <!-- <el-pagination :disabled="page.state === 0" :current-page.sync="page.page" :page-sizes="pageSizeList" :page-size.sync="page.pageSize" :total="page.total" background layout="prev, next, slot, jumper" @current-change="currentChanged" @size-change="sizeChanged" > -->
            <!-- <span class="lr-table--pagination--slot">第
              <template v-if="page.total === 0 && page.page === 1">
                0
              </template>
              <template v-else>
                {{ page.page }}
              </template>
              /&nbsp;{{ totalPage || 0 }}页</span> -->
          <!-- </el-pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const imageConfig = require('@/utils/image')
const getImageBase = imageConfig.getImageBase

export default {
  // eslint-disable-next-line
  name: 'lr-table',
  props: {
    auto: { // 页面加载完后，自动开始分页查询
      type: Boolean,
      default: true
    },
    page: {
      type: Object,
      required: true
    },
    pagination: {
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: ''
    },
    search: {
      type: Function,
      default: function() {
        return {}
      }
    },
    processData: {
      type: Function,
      default: null
    },
    showClear: {
      type: Boolean,
      default: true
    },
    method: { // 请求方法
      type: String,
      default: 'get'
    },
    // 请求方法里传的options
    options: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      element: null,
      stateWatch: null,
      pageSizeList: [10, 20, 50, 100],
      history: { // 记录搜索历史，优化分页吸体验
        lastPageSize: this.page.pageSize,
        lastSearchModel: this.getSearchModel()
      },
      selected: 0,
      hasSelection: false,
      pageId: 0
    }
  },
  computed: {
    showSelection() { // 是否显示选择区
      return this.page.list.length > 0
    },
    totalPage() {
      return Math.ceil(this.page.total / this.page.pageSize)
    }
  },
  beforeDestroy() {
    if (this.stateWatch) {
      this.stateWatch()
    }
    if (this.element) {
      this.element = null
    }
  },
  mounted() {
    this.stateWatch = this.$watch('page.state', state => {
      this.stateChanged(state)
    })
    let element = this.$el
    if (element.nodeType === 8) { // 非有效节点
      element = null
    }
    if (this.auto) {
      this.doSearch()
    }
    // 绑定表格选中操作
    this.bindTableSelection()
  },
  methods: {
    doSearch() {
      this.loadPage()
    },
    loadPage() {
      if (this.url) { // 加载数据
        this.pageId++
        const currentId = this.pageId
        const needResetPageNumber = this.isResetPageNumber(this.page.getPageModel(this.page.pageSize), this.getSearchModel())
        const searchModel = Object.assign(this.page.getPageModel(this.page.pageSize, needResetPageNumber ? 1 : null), this.getSearchModel())
        // 更新搜索历史
        this.updateSearchHistory()
        this.page.start()
        this.$nextTick(_ => {
          this.getRequest(this.url, searchModel).then(data => {
            // TODO 临时方案，为了方便对后端旧数据进行调试，将旧数据转换成分页数据
            const type = Object.prototype.toString.call(data)
            if (type === '[object Array]') { // 旧数据进行补齐
              data = {
                page: 1,
                pageSize: data.length,
                total: data.length,
                list: data
              }
            }
            if (this.processData && typeof this.processData === 'function') {
              data.list = this.processData(data.list)
            }
            if (data.total && !isNaN(data.total)) { // 修复后端返回总记录数为字符串的问题
              data.total = parseInt(data.total)
            }
            if (currentId === this.pageId) {
              this.page.update(data)
              this.page.end()
            }
          }).catch(err => {
            console.log(err)
            this.page.end(false)
          })
        })
      }
    },
    getRequest(url, searchModel) {
      const currentMethod = this.method.toLowerCase() || 'get'
      if (currentMethod === 'get') {
        return this.$http.get(url, { params: searchModel }, this.options)
      } else if (currentMethod === 'post') {
        return this.$http.post(url, searchModel, this.options)
      }
    },
    ensureEmptyElement() {
      if (this.element) {
        return this.$el.querySelector('.el-table__empty-text')
      } else {
        this.element = this.$el.querySelector('.el-table__empty-text')
        this.element.addEventListener('click', _ => {
          if (this.page.state === 2) {
            this.loadPage() // 重新加载数据
          }
        })
        return this.element
      }
    },
    stateChanged(state) {
      const element = this.ensureEmptyElement()
      if (element) {
        if (state === 0) {
          const loadingHtml = `<div class="lr-table-loading"><img src='${getImageBase()}/loading.gif' /></div>`
          element.innerHTML = loadingHtml
        } else if (state === 1) {
          let img = ''
          const text = '主人，您当前的查询条件下暂无数据哦'
          if (this.pageId <= 1) {
            img = `<img src="${getImageBase()}/empty_table.png" />`
          } else {
            img = `<img src="${getImageBase()}/search_no_data.png" />`
          }
          const html = `<div class="lr-table__empty--container"><div><div>${img}</div><div class="lr-table__empty--text">${text}</div></div></div>`
          element.innerHTML = html
        } else if (state === 2) {
          element.innerHTML = '<a style="color: #7460EE" href="#">加载失败，点击重试</a>'
        }
      }
    },
    currentChanged() {
      this.$nextTick(_ => {
        this.loadPage()
      })
    },
    sizeChanged(val) {
      this.$nextTick(_ => {
        sessionStorage.setItem('pageSize', val)
        this.page.pageSize = parseInt(sessionStorage.getItem('pageSize'))
        this.loadPage()
      })
    },
    isResetPageNumber(toPageModel, searchModel) { // 判断是否要重新从第一页开始搜索
      if (toPageModel.pageSize !== this.history.lastPageSize || JSON.stringify(searchModel) !== JSON.stringify(this.history.lastSearchModel)) {
        return true
      }
      return false
    },
    getSearchModel() {
      return this.search.call()
    },
    updateSearchHistory() {
      this.history.lastPageSize = this.page.pageSize
      this.history.lastSearchModel = this.getSearchModel()
    },
    bindTableSelection() {
      this.$nextTick(_ => {
        const hasSelection = this.$el.querySelector('.el-table-column--selection')
        if (hasSelection) {
          this.hasSelection = true
          const tableInstance = this.getTableInstance()
          if (tableInstance) {
            tableInstance.$on('selection-change', (selection) => {
              this.selected = selection.length
            })
          }
        }
      })
    },
    getSearchFormInstance() { // 获取搜索表单
      return this.searchInstance(this.$slots.search, 'el-form')
    },
    getTableInstance() {
      return this.searchInstance(this.$slots.default, 'el-table')
    },
    searchInstance(target, componentTagName) {
      if (!target || !componentTagName) {
        return null
      } else {
        const component = target.filter(item => {
          return item.tag && item.componentOptions && item.componentOptions.tag.toLowerCase() === componentTagName
        })
        if (component.length > 0) {
          return component[0].componentInstance
        } else {
          return null
        }
      }
    },
    clearSelection() {
      const tableInstance = this.getTableInstance()
      if (tableInstance) {
        tableInstance.clearSelection()
      }
    },
    clear() {
      const formInstance = this.getSearchFormInstance()
      if (formInstance) {
        formInstance.resetFields()
      }
      this.$emit('clear')
    },
    selectAll() {
      const tableInstance = this.getTableInstance()
      if (tableInstance) {
        tableInstance.clearSelection()
        this.$nextTick(_ => {
          tableInstance.toggleAllSelection()
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/mixin.scss";

.el-select-dropdown__item {
  padding: 0 16px;
}
.lr-table{
  .lr-whole-top{
    position: relative;
    top: -6px;
  }
  .el-table {
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.02),
    0 0 8px 0 rgba(0, 0, 0, 0.08);
    border-radius: 3px;
  }
  .lr-table--search{
    position: relative;
    padding: 16px 60px 16px 16px;
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.02), 0 0 8px 0 rgba(0,0,0,0.08);
    border-radius: 3px;
    .lr-search-btn{
      padding: 9.5px 15px;
      font-size: 14px;
      position: absolute;
      right: 16px;
      bottom: 16px;
    }
    .el-form{
      margin-bottom: -16px;
    }
    .el-form-item--small:not(.lr-intent-class--search) {
      &.el-form-item {
        margin-right: 32px;
        margin-bottom: 16px;
      }
      .el-form-item__label {
        line-height: 35px;
        padding-right: 8px;
      }
      .el-input__inner {
        height: 35px!important;
        line-height: 35px;
        font-size: 14px;
      }
    }
    .el-range-editor--small {
      .el-range-input {
        font-size: 14px;
      }
      .el-range-separator {
        font-size: 14px;
        line-height: 28px;
      }
    }
    &:after{
      clear: both;
    }
    .el-select{
      .el-icon-arrow-up:before{
        content: "\E60C" !important;
      }
    }
  }
  .lr-table__action--empty{
    margin-bottom: 17px;
  }
  .lr-table--action {
    text-align: right;
    padding-top: 16px;
    padding-bottom: 8px;
    &:after {
      @include clearfix();
    }
    .el-button + .el-button {
      margin-left: 8px;
    }
    /*&.lr-table--selection__empty{*/
    /*.el-button{*/
    /*color: rgba(0,0,0,0.26);*/
    /*}*/
    /*}*/

    .el-button--default{
      border: 1px solid $--color-primary;
      border-radius: 4px;
      color: $--color-primary;
    }
    .el-button--default.is-disabled{
        color: rgba(0, 0, 0, 0.26);
        cursor: not-allowed;
        background-image: none;
        background-color: #fff;
        border-color: #D9D9D9;
      }
    .el-button--primary.is-disabled {
      background: #d9d9d9d9;
      border-color: #d9d9d9;
    }

    .el-button{
      .iconfont{
        font-size: 12px;
        margin-right: 5px;
      }
    }
  }
  .lr-table--pagination{
    margin-top: 15px;
    text-align: center;
    .el-pagination{
      button{
        background-color: white;
      }
    }
    .lr-table--pagination--slot{
      font-weight: normal;
      margin-left: 15px;
      margin-right: -5px;
      line-height: 30px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
  .lr-table--action--clear{
    font-size: #{$font-size-small}px;
    text-align: right;
    color: #7460EE;
    margin-bottom: 8px;
    &:hover{
      cursor: pointer;
    }
    i{
      font-size: 12px;
      margin-right: 7px;
    }
  }
  .lr-table--selection{
    background: #e8f2fa;
    border: 1px solid #bce2ef;
    padding: 0 15px;
    height: 34px;
    line-height: 34px;
    font-size: #{$font-size-normal}px;
    margin-bottom: 10px;
    .el-button--text{
      color: #4dc0d7 !important;
      font-size: 14px;
      margin-left: 6px;
      font-weight: 600;
    }
    i{
      color: #6CBED4;
      font-size: 14px;
      margin-right: 8px;
    }
    & > span{
      font-size: 14px;
      color: rgba(0,0,0,0.65);
      text-align: left;
    }
  }
}
.lr-table-loading{
  img{
    width: 200px;
  }
}
.el-table__empty-block{
  min-height: 150px;
}

.lr-table__empty--container{
  height: 222px;
  display: flex;
  align-items: center;
  justify-content: center;
  .lr-table__empty--text{
    margin-top: 18px;
    height:14px;
    font-size:14px;
    font-weight:400;
    color:rgba(0,0,0,0.65);
    line-height:14px;
  }
}
.lr-table__selection--total{
  &:hover{
    cursor: pointer;
  }
  color: $--color-primary !important;
}

.el-table__header .el-table-column--selection .cell{
  display: none;
}

</style>
