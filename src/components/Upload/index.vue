<template>
  <div class="lr-upload">
    <el-upload
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-change="changed"
      :on-success="successResponse"
      :on-error="errorResponse"
      :on-remove="handleRemove"
      :action="action"
      :data ="data"
      :headers="headers"
      :limit="multiple ? 10 : 1"
      :multiple="multiple"
      drag
      accept=".xlsx">
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        <span>将{{ text }}拖到此处，</span>或<em> 点击上传</em>
        <br>
        <span class="lr-upload--suffix">
          仅支持扩展名: .xlsx
          <template v-if="max > 0">
            ，且号码数量不可大于{{ max }}行
          </template>
        </span>
      </div>
    </el-upload>
    <div style="position: absolute;bottom: 0;right: 20px;">
      <div v-for="(file, $index) of fileInfoList" :key="$index">
        <div style="display: flex;height: 30px;">
          <div v-if="file.failCount > 0" style="flex: 1;text-align: right;font-size: 14px;color: rgba(0,0,0,0.43);padding-right: 20px;">
            成功导入{{ file.successCount }}个，失败{{ file.failCount }}个,<el-button size="medium" type="text" @click="downloadFail(file)">下载失败号码</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 目前只支持excel
 */
import { getAuthModel } from '@/utils/auth'
const URI = require('urijs')

export default {
  name: 'LrUpload',
  props: {
    text: {
      type: String,
      default: '文件'
    },
    action: { // 上传路径
      type: String,
      required: true
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    multiple: {
      type: Boolean,
      default: true
    },
    count: { // 已上传数量
      type: Number,
      default: 0
    },
    max: { // excel 最大条数设置
      type: Number,
      default: 30000
    }
  },
  data() {
    return {
      extra: {}, // 用于额外的字段值
      extraKeyList: ['attachmentKey'],
      fileList: [],
      fileInfoList: []
    }
  },
  computed: {
    headers() {
      return getAuthModel()
    }
  },
  watch: {
    fileList(val) {
    }
  },
  beforeDestroy() {
    this.$emit('update:count', 0)
  },
  methods: {
    beforeUpload() {
      this.$loadingUtils.open()
    },
    afterUploadFinished() {
      this.$loadingUtils.close()
    },
    successResponse(response, file) {
      this.afterUploadFinished()
      this.$message.success('上传成功')
      const model = { name: file.name, uid: file.uid }
      Object.assign(model, response)
      console.log(file)
      model.extra = {}
      this.extraKeyList.forEach(extraKey => {
        if (response[extraKey]) {
          model.extra[extraKey] = response[extraKey]
        }
      })
      this.fileInfoList.push(model)
    },
    changed(file, fileList) {
      this.$emit('update:count', fileList.length)
      this.$emit('change', fileList.length)
    },
    errorResponse(err, file, fileList) {
      this.afterUploadFinished()
      if (err.message) {
        try {
          const msg = JSON.parse(err.message)
          this.$message.error(msg.message)
        } catch (err) {
          this.$message.error('上传失败')
        }
      } else {
        this.$message.error('上传失败')
      }
    },
    downloadFail(file) {
      const failId = file.failFlag
      const uri = URI(`${this.$api.exportFail}/${failId}`)
      uri.addQuery(getAuthModel())
      window.open(uri.toString())
    },
    handleRemove(file, fileList) {
      const removeFileInfoIndex = this.fileInfoList.findIndex(item => item.uid === file.uid)
      if (removeFileInfoIndex !== -1) {
        this.fileInfoList.splice(removeFileInfoIndex, 1)
      }
      this.$emit('update:count', this.fileInfoList.length)
      this.$emit('change', this.fileInfoList.length)
    },
    getExtraModel() {
      // 暂时先返回第一个
      if (this.fileInfoList.length === 0) {
        return {}
      } else {
        const fileInfo = this.fileInfoList[0]
        return fileInfo.extra
      }
    }
  }
}
</script>

<style lang="scss">
.lr-upload{
  .el-upload, .el-upload-dragger{
    width: 100% !important;
  }
  .lr-upload--suffix{
    font-size: 14px;
    color: rgba(0,0,0,0.43);
    line-height: 22px;
    margin-top: 3px;
  }
  .el-upload__text{
    em{
      color: #7460EE;
    }
  }
}

</style>
