<template>
  <el-dialog :visible.sync="dialogVisible" :title="fullTitle" :show-close="true" class="lr-batch-upload">
    <div class="lr-batch-upload__body">
      <lr-batch-upload-content :download-url="downloadUrl" :btn-text="btnText" :upload-url="uploadUrl" :full-upload-text="fullUploadText" :data="data" />
    </div>
    <div slot="footer" class="lr-batch-upload__footer" @click="confirm">
      <span>保存</span>
    </div>
  </el-dialog>
</template>

<script>
import Upload from './index.vue'
import BatchUploadContent from './batchContent.vue'

export default {
  name: 'LrBatchUpload',
  components: {
    [Upload.name]: Upload,
    [BatchUploadContent.name]: BatchUploadContent
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    downloadUrl: {
      type: String,
      default: ''
    },
    uploadUrl: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    btnText: {
      type: String,
      default: '下载线索导入模板'
    }
  },
  data() {
    return {
      dialogVisible: this.visible || false
    }
  },
  computed: {
    fullTitle() {
      return `批量导入${this.title}`
    },
    fullUploadText() {
      return `${this.title}模板`
    }
  },
  watch: {
    dialogVisible(val) {
      this.$emit('update:visible', val)
    },
    visible(val) {
      this.dialogVisible = val
    }
  },
  methods: {
    cancel() {
      this.dialogVisible = false
      this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss">
.lr-batch-upload{
  .el-dialog{
    border-radius: 8px;
  }
  .el-dialog__body{
    padding: 0;
  }
  .lr-batch-upload__body{
    padding: 32px 32px 0px 32px;
  }
  .el-dialog__header{
    text-align: center;
    margin-bottom: -16px;
  }
  .el-dialog__footer{
    padding: 0;
  }

  .lr-batch-upload__footer{
    text-align: right;
    height: 60px;
    background-color: #7460EE;
    text-align: center;
    cursor: pointer;
    margin-top: 45px;
    border-radius: 0 0 8px 8px;
    span{
      font-size: 16px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: center;
      line-height: 60px;
    }
  }
  .lr-batch-upload__footer:hover{
    opacity: 0.9;
  }
}
</style>
