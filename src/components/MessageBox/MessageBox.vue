<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :append-to-body="true"
    :show-close="false"
    :before-close="cancelDialog"
    width="350px"
    class="lr-message-box">
    <div class="lr-message-box--contaienr">
      <div class="lr-title">{{ title }}</div>
      <div class="lr-context" v-html="content"/>
    </div>
    <span slot="footer">
      <span class = "lr-cancel" @click="cancelDialog">{{ cancelText }}</span>
      <span class = "lr-confirm" @click="confirm">{{ confirmText }}</span>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'LrMessageBox',
  data() {
    return {
      visible: false,
      title: '提示',
      content: '',
      cancelText: '取消',
      confirmText: '确定',
      dispatch: null
    }
  },
  methods: {
    cancelDialog() {
      this.visible = false
      this.dispatch('reject')
    },
    confirm() {
      this.visible = false
      this.dispatch('resolve')
    }
  }
}
</script>
<style lang="scss" >
@import '../../styles/variables.scss';
.lr-message-box{
  padding:20px;
  box-sizing: border-box;
  text-align: center;
  .el-dialog{
    border-radius: 10px;
  }
  .el-dialog__header{
    display: none !important;
  }
  .lr-message-box--contaienr{
    img{
      display: block;
      margin-left:100px;
      width:147px;
      height:auto;
    }
    .lr-title{
      margin:20px auto;
      color: rgba($blackBase,0.75);
      font-size:24px;
    }
    .lr-context{
      color: rgba($blackBase,0.65);
      font-size:14px;
      line-height: 16px;
    }
  }
  .el-dialog__footer{
    padding:0px 50px 20px 50px;
    text-align: left;
    .lr-cancel{
      cursor: pointer;
      color: rgba($blackBase,0.43)
    }
    .lr-confirm{
      float:right;
      color:$--color-primary;
      cursor: pointer;
    }
  }
}
</style>
