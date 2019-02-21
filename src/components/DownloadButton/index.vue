<template>
  <el-button :type="type" class="lr-down-btn" @click.stop="download"><i v-if="!type && icon" class="iconfont icon-ic_derive_ic_add_dis" style="margin-right: 6px;font-size: 12px"/>{{ text }}</el-button>
</template>

<script>
import { getAuthModel } from '@/utils/auth'
const URI = require('urijs')

export default {
  name: 'LrDownloadButton',
  props: {
    url: { // 下载地址
      type: String,
      required: true
    },
    options: { // 下载的查询条件
      type: Object,
      default: function() {
        return {}
      }
    },
    text: {
      type: String,
      default: '导出'
    },
    icon: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    download() {
      if (this.data.type && (!this.data.templateCode)) {
        this.$message.info('主人，导入模板是根据话术生成的哦，请先选择话术!')
        return false
      }
      const uri = URI(this.url)
      uri.addQuery(getAuthModel())
      uri.addQuery(this.data)
      window.open(uri.toString())
    }
  }
}

</script>
<style lang="scss">
.lr-down-btn{
  background: #FFFFFF;
  border: 1px solid #7460EE;
  font-size: 14px;
  color: #7460EE;
}
</style>
