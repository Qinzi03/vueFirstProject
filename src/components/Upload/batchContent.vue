<template>
  <div>
    <div class="lr-batch-upload__hint">
      <span>导入说明：请使用系统提供的模板进行数据填写和导入</span>
      <lr-download-button :url="downloadUrl" :icon="false" :text="btnText" :data="downloadExtra" type="primary"/>
    </div>
    <div class="lr-batch-upload-hint2">
      <i class="iconfont icon-ic_caution_normal" />
      <span>请不要更改模板中的任何字段或格式，单次导入数据请不要超过{{ max }}行</span>
    </div>
    <div class="lr-batch-upload__upload">
      <lr-upload ref="upload" :multiple="multiple" :action="uploadUrl" :max="max" :text="fullUploadText" :data="data" @change="change"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LrBatchUploadContent',
  props: {
    downloadUrl: {
      type: String,
      required: true
    },
    btnText: {
      type: String,
      required: true
    },
    uploadUrl: {
      type: String,
      required: true
    },
    fullUploadText: {
      type: String,
      required: true
    },
    downloadExtra: {
      type: Object,
      default() {
        return {}
      }
    },
    data: {
      type: Object,
      required: true
    },
    max: {
      type: Number,
      default: 30000
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    change(fileCount) {
      this.$emit('change', fileCount)
    },
    getExtra() {
      return this.$refs.upload.getExtraModel()
    }
  }
}
</script>

<style lang="scss">
.lr-batch-upload__hint{
  padding: 9px 16px;
  background: #fafafa;
  border: 1px dashed #D9D9D9;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  span{
    font-size: 14px;
    flex: 1;
  }
}
.lr-batch-upload-hint2{
  margin-top: 7px;
  i{
    font-size: 12px;
    color: #f5a623;
  }
  span{
    font-size: 12px;
    color: rgba(0,0,0,0.43);
    letter-spacing: 0;
  }
}
.lr-batch-upload__upload{
  position: relative;
  margin-top: 32px;
}
</style>
