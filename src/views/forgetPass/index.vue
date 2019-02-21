<template>
  <LoginLayout
    :robot-state="robotState"
    class="lr-forgetpass-container"
    @keyup.enter.stop="handleConfirm">
    <div class="lr-forgetpass-form">
      <!-- 第一步：账号和短信验证码信息表单 -->
      <el-form
        v-if="step === 1"
        ref="accountForm"
        :model="accountForm"
        :rules="accountFormRules"
        auto-complete="off"
        label-position="left">
        <el-form-item prop="account">
          <el-input
            v-model.trim="accountForm.account"
            placeholder="请输入手机号码"
            name="account"
            type="text"
            auto-complete="on"
            @focus="clearValidate();"
            @keyup.enter.native="handleConfirm">
            <i slot="prepend" class="iconfont icon-ic_phone" />
          </el-input>
        </el-form-item>
        <el-form-item prop="verifyCode" class="ls-vericodeitem">
          <el-input
            v-model.trim="accountForm.verifyCode"
            placeholder="请输入6位短信验证码"
            type="text"
            @keyup.enter.native="handleConfirm">
            <i slot="prepend" class="iconfont icon-ic_verificationcode_" />
          </el-input>
          <CountDown
            :before-click="beforeClickCountDown"
            class="ver-img ls-countdown" />
        </el-form-item>
      </el-form>
      <!-- 第二步：新密码和确认新密码信息表单 -->
      <el-form
        v-else
        ref="passForm"
        :model="passForm"
        :rules="passFormRules"
        auto-complete="off"
        label-position="left">
        <el-form-item prop="password" >
          <el-input
            v-model.trim="passForm.password"
            :type="passwordType"
            :maxlength="18"
            placeholder="请输入新密码"
            name="password"
            auto-complete="on"
            @focus="clearValidate();passwordFocus = true"
            @blur="passwordFocus = false"
            @keyup.enter.native="handleConfirm">
            <i slot="prepend" class="iconfont icon-ic_lock" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password2" >
          <el-input
            v-model.trim="passForm.password2"
            :type="passwordType"
            :maxlength="18"
            placeholder="请再次输入新密码"
            name="password"
            auto-complete="on"
            @focus="clearValidate();passwordFocus = true"
            @blur="passwordFocus = false"
            @keyup.enter.native="handleConfirm" >
            <i slot="prepend" class="iconfont icon-ic_lock" />
          </el-input>
        </el-form-item>

      </el-form>
      <div class="btns clearfix">
        <el-button type="primary" class="ls-forgetpass-button" @click.native.prevent="handleBackLogin">返回</el-button>
        <div class="ls-forgetpass-line"></div>
        <el-button :loading="loading" type="primary" class="ls-forgetpass-button" @click.native.prevent="handleConfirm">{{ btnText }}</el-button>
      </div>
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
    const validatePass = (rule, value, callback) => {
      if (this.passForm.password2 !== '') {
        this.$refs.passForm.validateField('password2')
      }
      callback()
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      step: 1,
      accountForm: {
        account: '',
        verifyCode: '',
        verifyKey: ''
      },
      accountFormRules: {
        account: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { required: true, min: 1, max: 13, message: '手机号长度不符', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' },
          { required: true, min: 6, max: 6, message: '短信验证码位数只能为6位', trigger: 'blur' }
        ]
      },
      passForm: {
        password: '',
        password2: ''
      },
      passFormRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { required: true, min: 6, message: '密码至少6位', trigger: 'blur' },
          { required: true, validator: this.$validator.passValidator, message: '必须包含英文大写、英文小写与数字，不可包含其他字符', trigger: 'blur' },
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { required: true, min: 6, message: '密码至少6位', trigger: 'blur' },
          { required: true, validator: this.$validator.passValidator, message: '必须包含英文大写、英文小写与数字，不可包含其他字符', trigger: 'blur' },
          { required: true, validator: validatePass2, message: '两次输入密码不一致', trigger: 'blur' }
        ]
      },
      passKey: '',
      passwordType: 'password',
      passwordFocus: false,
      errorMessage: '',
      loading: false,
      showDialog: false
    }
  },
  computed: {
    btnText() {
      return this.step === 1 ? '下一步' : '确定'
    },
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
    handleBackLogin() {
      this.$router.push('/login')
    },
    handleConfirm() {
      if (this.step === 1) {
        this.$refs.accountForm.validate(valid => {
          if (valid) {
            this.$http.post(`${this.$api.postCaptchaVerify}`, {
              target: this.accountForm.account,
              code: 'B002',
              verifyKey: this.accountForm.verifyKey,
              verifyCode: this.accountForm.verifyCode
            })
              .then(data => {
                this.loading = false
                this.passKey = data
                this.step = 2
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$refs.passForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$http.put(`${this.$api.putResetPassword}/${this.accountForm.account}`, {
              firstPassword: this.passForm.password,
              secondPassword: this.passForm.password2,
              passKey: this.passKey
            })
              .then(data => {
                this.loading = false
                this.$message.success('密码重置成功')
                setTimeout(() => {
                  this.$router.push('/login')
                }, 3000)
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    // 验证码
    beforeClickCountDown() {
      let validRes = true
      this.$refs.accountForm.validateField('account', (errorMessage) => {
        validRes = !errorMessage
      })
      if (!validRes) {
        return Promise.reject()
      }
      return new Promise((resolve, reject) => {
        this.$http.post(this.$api.postSmsVerCode, {
          target: this.accountForm.account,
          code: 'B002',
          sendType: 'S'
        })
          .then(data => {
            this.$message.success('发送成功')
            this.accountForm.verifyKey = data
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
$formWidth: 398px;
$robotMarginTop: 83;

.lr-forgetpass-container {

  .lr-forgetpass-form{
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

  .ls-forgetpass-button{
    box-sizing: border-box;
    float: left;
    height: 60px;
    width: 50%;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0;
    font-weight: bold;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    margin-top: 45px;
    &.el-button + .el-button {
      margin-left: 0;
    }
    &:first-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 0px;
    }
    &:last-child {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 8px;
    }
  }
  .btns {
    position: relative;
  }
  .ls-forgetpass-line {
    position: absolute;
    top: 64px;
    left: 198px;
    width: 2px;
    height: 22px;
    background-color: #fff;
  }

  // 验证码
  .ls-vericodeitem {
    position: relative;
    .el-input__inner {
      width: 157px;
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
    top: 527px!important;
  }
}

</style>
