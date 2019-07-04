<template>
  <div id="login-layout-container" class="login-layout-container">
    <!-- <img src="../../assets/listen_robot.png" class="lr-login-logo" > -->
    <div class="lr-login-bg">
      <div v-if="robotState === 0">
        <img src="../../assets/image_robot_normal.gif" style="margin-top: -69px">
      </div>
      <div v-else-if="robotState === 1">
        <img src="../../assets/robot_dynamic.gif" style="margin-top: -71px">
      </div>
      <div v-else-if="robotState === 2">
        <img src="../../assets/image_robot_wrong.png" >
      </div>
      <div v-show="false">
        <!-- 加速 -->
        <img src="../../assets/robot_dynamic.gif" style="margin-top: -73px">
      </div>
    </div>
    <!-- ========= slot ========= -->
    <slot/>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'LoginLayout',
  props: {
    robotState: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      passwordType: 'password',
      passwordFocus: false,
      errorMessage: '',
      errorCount: 10,
      loading: false,
      showDialog: false
    }
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#ffffff;
  $light_gray:#919191;
  $cursor: rgba(0, 0, 0, 0.65);

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    #login-layout-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  #login-layout-container {
    .el-input__inner:focus{
      border-color: #D9D9D9;
    }
    background-color: #5B4ABF;
    background: linear-gradient(to bottom, #8575E1, #5043A0);
    text-align:center;
    color:#fff;
    position: relative;
    height: 100vh;
    overflow: hidden;
    .el-input {
      position: relative;
      height: 40px;
      padding: 0 40px;
      input {
        margin-left: -1px;
        background: #FFFFFF;
        border: 1px solid #D9D9D9;
        border-radius: 3px;
        -webkit-appearance: none;
        padding: 4px 5px 3px 10px;
        padding-left: 30px !important;
        color: $light_gray;
        height: 40px;
        font-size: 14px;
        line-height: 19px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-input-group__prepend{
      position: absolute;
      top: 10px;
      padding: 0 7px !important;
      background: none!important;
      border: none;
      i{
        display: inline-block;
        margin-top: 3px;
      }
    }
    .el-form-item.is-error .el-input__inner {
      border-color: #F66C6F;
    }
    .el-form-item {
      border: 1px solid #ffffff;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    // el form err reset
    .el-form-item__error {
      left: 40px;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$formWidth: 397px;
$robotMarginTop: 83;

#login-layout-container {

  .lr-login-logo{
    position: absolute;
    height: 24px;
    top: 30px;
    left: 32px;
  }
  .lr-login-slogan{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    top: #{$robotMarginTop + 148 + 276}px;
  }
  .lr-login-bg{
    z-index: 90;
    position: absolute;
    width: $formWidth;
    top: #{$robotMarginTop}px;
    left: 50%;
    transform: translateX(-50%);
  }
  .lr-login-bg__image{
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 95;
  }
}

</style>
