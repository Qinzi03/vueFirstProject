<template>
  <LoginLayout :robot-state="robotState" class="login-container">
    <div class="lr-login-form">
      <el-form ref="loginForm" :model="loginForm" :rules="rules" auto-complete="off" label-position="left">
        <el-form-item prop="account">
          <el-input
            v-model.trim="loginForm.account"
            placeholder="请输入手机号码"
            name="account"
            type="text"
            auto-complete="on"
            @focus="clearValidate();">
            <i slot="prepend" class="iconfont icon-ic_phone" />
          </el-input>
        </el-form-item>

        <el-form-item prop="password" >
          <el-input
            v-model.trim="loginForm.password"
            :type="passwordType"
            :maxlength="18"
            placeholder="请输入密码"
            name="password"
            auto-complete="on"
            @focus="clearValidate();passwordFocus = true"
            @blur="passwordFocus = false"
            @keyup.enter.native="handleLogin" >
            <i slot="prepend" class="iconfont icon-ic_lock" />
          </el-input>
        </el-form-item>

        <el-form-item v-if="errorStatus === 'IMAGE_CODE' || errorStatus === 'IMAGE_CODE_AND_MSG_CODE'" prop="imageCode" class="ls-vericodeitem">
          <el-input
            v-model.trim="loginForm.imageCode"
            class="el-input-imgcodeitem"
            placeholder="请输入图片中验证码"
            type="text">
            <i slot="prepend" class="iconfont icon-ic_yanzhengma_normal" />
          </el-input>
          <ImgVerCode ref="imgVerCode" :image-key="loginForm.imageKey" class="ver-img" @update="onImgVerCodeupdate"/>
        </el-form-item>

        <el-form-item v-if="errorStatus === 'IMAGE_CODE_AND_MSG_CODE'" prop="verifyCode" class="ls-vericodeitem">
          <el-input
            v-model.trim="loginForm.verifyCode"
            placeholder="请输入6位短信验证码"
            type="text">
            <i slot="prepend" class="iconfont icon-ic_verificationcode_" />
          </el-input>
          <CountDown
            :before-click="beforeClickCountDown"
            class="ver-img ls-countdown" />
        </el-form-item>

        <router-link to="/password-reset" class="ls-passreset-link">忘记密码？</router-link>
        <!-- <div></div> -->

        <!-- <el-form-item style="text-align: right;margin-top: -19px;line-height: 19px;margin-bottom: 19px;padding: 0 40px;">
          <div style="margin-top: -7px">&nbsp;</div>
          <el-button v-if="false" type="text">忘记密码?</el-button>
        </el-form-item> -->
        <el-button :loading="loading" type="primary" class="lr-login-button" @click.native.prevent="handleLogin">登录</el-button>
      </el-form>
    </div>
  </LoginLayout>
</template>

<script>
import LoginLayout from '../loginLayout'
import ImgVerCode from '@/components/ImgVerCode'
import CountDown from '@/components/CountDown'
export default {
  name: 'Login',
  components: {
    LoginLayout,
    ImgVerCode,
    CountDown
  },
  data() {
    return {
      loginForm: {
        account: '',
        password: '',
        imageCode: '',
        imageKey: '',
        verifyCode: '',
        verifyKey: ''
      },
      passwordType: 'password',
      passwordFocus: false,
      errorMessage: '',
      errorStatus: '',
      loading: false,
      showDialog: false,
      rules: {
        account: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { required: true, min: 1, max: 13, message: '手机号长度不符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { required: true, min: 6, message: '密码至少6位', trigger: 'blur' }
          // { required: true, validator: this.$validator.passValidator, message: '必须包含英文大写、英文小写与数字，不可包含其他字符', trigger: 'blur' }
        ],
        imageCode: [
          { required: true, message: '请输入图形验证码', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' },
          { required: true, min: 6, max: 6, message: '短信验证码位数只能为6位', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    robotState() {
      // 0 nomal, 1 password, 2 fail
      if (this.passwordFocus) {
        return 1
      } else if (this.errorMessage) {
        return 2
      } else {
        return 0
      }
    }
  },
  methods: {
    clearValidate() {
      this.errorMessage = ''
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.loginForm.verifyCode && !this.loginForm.verifyKey) {
            this.$message.warning('请获取短信验证码')
            return
          }
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(userInfo => {
            this.$router.push({ path: '/' })
            this.$nextTick(_ => {
              this.$message.success('登录成功')
              this.loading = false
            })
          }).catch(err => {
            const message = err.response.data.message
            const data = err.response.data.data || {}
            this.errorMessage = message
            this.errorStatus = data.status || this.errorStatus
            this.$message.error(message)
            this.$refs.imgVerCode && this.$refs.imgVerCode.update()
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 验证码
    onImgVerCodeupdate(imageKey) {
      this.loginForm.imageKey = imageKey
    },
    beforeClickCountDown() {
      let validRes = true
      this.$refs.loginForm.validateField('account', (errorMessage) => {
        validRes = !errorMessage
      })
      if (!validRes) {
        return Promise.reject()
      }
      return new Promise((resolve, reject) => {
        this.$http.post(this.$api.postSmsVerCode, {
          target: this.loginForm.account,
          code: 'B001',
          sendType: 'S'
        })
          .then(data => {
            this.$message.success('发送成功')
            this.loginForm.verifyKey = data
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$formWidth: 397px;
$robotMarginTop: 83;

.login-container {

  .lr-login-form{
    padding-top: 58px;
    background: #ffffff;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.02), 0 0 8px 0 rgba(0,0,0,0.08);
    border-radius: 8px;
    width: $formWidth;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: #{$robotMarginTop + 148}px;
    z-index: 100;
  }
  // .lr-login-error{
  //   background: #FFF1F0;
  //   border: 1px solid #FDC5C7;
  //   border-radius: 3px;
  //   margin: 0 40px;
  //   margin-bottom: 24px;
  //   text-align: left;
  //   padding: 5px 0;
  //   font-size: 14px;
  //   color: rgba(246,108,111,0.65);
  //   i{
  //     font-size: 14px;
  //     color: #F66C6F;
  //     margin: 0 8px;
  //   }
  // }

  .lr-login-button{
    height: 60px;
    width: 100%;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    font-weight: bold;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .ls-passreset-link {
    float: right;
    font-size: 14px;
    color: #7460EE;
    text-align: right;
    margin: -13px 34px 32px 0;
  }

  // 验证码
  .ls-vericodeitem {
    position: relative;
    .el-input__inner {
      width: 171px;
    }
    .ver-img {
      display: inline-block;
      position: absolute;
      top: 0;
      right: 41px;
      width: 135px;
      height: 40px;
      text-align: center;
      cursor: pointer;
    }
  }

  .lr-login-slogan{
    top: 640px!important;
  }
}

</style>
