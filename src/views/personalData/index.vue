<template>
  <lr-page class="lr-personal-data-page" title="个人资料">
    <el-row :gutter="32" style="margin-top: 24px">
      <el-col :span="6">
        <div class="left-top-box">
          <p>{{ userInfo.usedClue }}/{{ userInfo.privateClueNumber }}</p>
          <p>已使用量/个人号码容量</p>
        </div>
        <div class="left-bottom-box">
          <div class="lr-photo">
            <img src="../../assets/avatar.png">
          </div>
          <div class="lr-name-box">{{ userInfo.userName }}</div>
          <div class="lr-peson-department">
            <div class="lr-peson-department-left" >{{ userInfo.role | joinRoleName }}</div>
            <!-- <span class="lr-peson-line"></span>
            <div class="lr-peson-department-right">
              <span v-for="item in userInfo.role">{{ item }}</span>
            </div> -->
          </div>
          <div class="lr-company-name">{{ userInfo.entName }}</div>
        </div>
      </el-col>
      <el-col :span="18" class="right-box">
        <EditInput
          v-model="isNameEditing"
          label="姓名："
          @confirm="onConfirmNameEdit('userName')">
          <span slot="normal">{{ userInfo.userName }}</span>
          <el-input slot="edit" v-model.trim="userNameInput" placeholder="请输入姓名" v-focus></el-input>
        </EditInput>
        <EditInput
          label="手机号（账号）："
          disabled>
          <span slot="normal">{{ userInfo.mobile }}</span>
        </EditInput>
        <EditInput
          v-model="isEmailEditing"
          label="邮箱："
          @confirm="onConfirmNameEdit('email')">
          <span slot="normal">{{ userInfo.email }}</span>
          <el-input slot="edit" v-model.trim="emailInput" placeholder="请输入邮箱" v-focus></el-input>
        </EditInput>
        <EditInput
          v-model="isPassEditing"
          label="密码："
          hide-label
          @confirm="onConfirmNameEdit('password')"
          @cancel="onCancelPassword">
          <span slot="normal">* * * * * * *</span>
          <template slot="edit">
            <el-form class="pass-form" ref="passForm" :model="passForm" :rules="passFormRules" label-width="85px" label-position="right">
              <el-form-item label="原密码 :" prop="oldPassword">
                <el-input v-model.trim="passForm.oldPassword" type="password" placeholder="请输入原密码（必填）" v-focus></el-input>
              </el-form-item>
              <el-form-item label="新密码 :" prop="password">
                <el-input v-model.trim="passForm.password" type="password" placeholder="请输入新密码（必填）"></el-input>
              </el-form-item>
              <el-form-item label="确认密码 :" prop="password2">
                <el-input v-model.trim="passForm.password2" type="password" placeholder="请再次输入新密码（必填）"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </EditInput>
        <EditInput
          label="所属企业："
          disabled>
          <span slot="normal">{{ userInfo.entName }}</span>
        </EditInput>
        <EditInput
          label="部门："
          disabled>
          <span slot="normal">{{ userInfo.departmentName }}</span>
        </EditInput>
        <EditInput
          label="角色："
          disabled>
          <span slot="normal">{{ userInfo.role | joinRoleName }}</span>
        </EditInput>
      </el-col>
    </el-row>
  </lr-page>
</template>

<script>
import Validator from '../../utils/validator'
import LrPage from '../../components/Page/index'
import LrFormEditor from '../../components/FormEditor/index'
import EditInput from './editInput'
export default {
  components: { LrFormEditor, LrPage, EditInput },
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
    const passRule = [
      { required: true, min: 6, message: '密码至少6位', trigger: 'blur' },
      { required: true, validator: this.$validator.passValidator, message: '必须包含大小写英文与数字，不可包含其他字符', trigger: 'blur' }
    ]
    return {
      userInfo: {
        role: [],
        userName: '',
        mobile: '',
        email: '',
        entName: '',
        departmentName: '',
        usedClue: 0,
        privateClueNumber: 0
      },
      isNameEditing: false,
      isEmailEditing: false,
      isPassEditing: false,
      userNameInput: '',
      emailInput: '',
      passForm: {
        oldPassword: '',
        password: '',
        password2: ''
      },
      passFormRules: {
        oldPassword: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          ...passRule,
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          ...passRule,
          { required: true, validator: validatePass2, message: '两次输入密码不一致', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onConfirmNameEdit(type) {
      if (type === 'password') {
        this.$refs.passForm.validate((res) => {
          if (!res) return
          const params = {
            password: this.passForm.oldPassword,
            firstPassword: this.passForm.password,
            secondPassword: this.passForm.password2,
          }
          this.$http.put(this.$api.changePassword, params)
          .then(res => {
            this.$message.success('修改密码成功')
            this.$refs.passForm.clearValidate()
            this.$router.push({ path: '/login' })
          })
          .catch(err => {})
        })
      } else {
        let val = this[type + 'Input']
        let params = {}
        if (!val) return
        params[type] = val
        this.$http.put(this.$api.getUsersBasicInfo, params)
        .then(res => {
          this.$message.success('修改信息成功')
          if (type === 'userName') {
            this.isNameEditing = false
          } else if (type === 'email') {
            this.isEmailEditing = false
          }
          this[type + 'Input'] = ''
          this.getAndRenderInfo()
        })
        .catch(err => {})
      }
    },
    onCancelPassword() {
      this.passForm = {
        oldPassword: '',
        password: '',
        password2: ''
      }
    },
    getAndRenderInfo() {
      this.$http.get(this.$api.getUsersDetial)
      .then(data => {
        this.userInfo = {
          userName: data.userName,
          mobile: data.mobile,
          email: data.email,
          role: data.role,
          entName: data.entName,
          departmentName: data.departmentName,
          usedClue: data.usedClue,
          privateClueNumber: data.privateClueNumber
        }
      })
      .catch(() => {})
    }
  },
  mounted() {
    this.getAndRenderInfo()
  },
  filters: {
    joinRoleName(roleAry) {
      return roleAry.join(' / ')
    }
  }
}
</script>

<style lang="scss">
.lr-personal-data-page {
  .left-top-box {
    text-align: center;
    height: 122px;
    padding-top: 32px;
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.02), 0 0 8px 0 rgba(0,0,0,0.08);
    border-radius: 3px;
    p {
      margin: 0;
      &:first-child {
        font-size: 24px;
      }
      &:last-child {
        font-size: 16px;
        color: #999;
        margin-top: 9px;
      }
    }
  }
  .left-bottom-box{
    min-height: 334px;
    padding-top: 32px;
    background-color: white;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.02), 0 0 8px 0 rgba(0,0,0,0.08);
    border-radius: 3px;
    margin-top: 16px;
    text-align: center;
    .lr-photo{
      width: 120px;
      height: 120px;
      margin: 0 auto;
      margin-bottom: 6px;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .lr-name-box{
      height: auto;
      line-height: 24px;
      text-align: center;
      font-size: 18px;
      color: rgba(0,0,0,0.65);
      letter-spacing: 0.13px;
      margin-bottom: 6px;
    }
    .lr-peson-department{
      height:auto;
      text-align: center;
      font-size: 14px;
      letter-spacing: -0.1px;
      margin-bottom: 14px;
      .lr-peson-department-left , .lr-peson-department-right{
        display: inline-block;
        // width: 130px;
        height: auto;
        line-height: 16px;
        color: rgba(0,0,0,0.65);
      }
      .lr-peson-department-left{
        text-align: right;
      }
      .lr-peson-department-right{
        text-align: left;
        span {
          display: block;
        }
      }
      .lr-peson-line{
        display: inline-block;
        width:1px;
        height: 14px;
        background-color: #D9D9D9;
        margin: -2px 8px;
      }
    }
    .lr-company-name{
      text-align: center;
      font-size: 14px;
      color: rgba(0,0,0,0.43);
      letter-spacing: -0.1px;
      height: 19px;
      line-height: 19px;
      margin-bottom: 6px;
    }
  }
  .right-box {
    min-height: 472px;
    color: rgba(0,0,0,0.65);
    padding-top: 32px;
    background-color: #fff;
    font-size: 14px;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.02), 0 0 8px 0 rgba(0,0,0,0.08);
    border-radius: 3px;
    .edit-input-cpn {
      margin-bottom: 12px;
    }
    .el-input {
      width: 220px;
    }
    .pass-form {
      display: inline-block;
      margin-left: 61px;
      margin-bottom: -13px;
      // margin-top: 10px;
      label {
        width: 73px !important;
        font-weight: normal;
        padding-right: 0;
      }
      .el-form-item {
        margin-bottom: 15px;
      }
      .el-form-item__content {
        margin-left: 79px !important;
      }
      .el-form-item__error {
        font-size: 10px;
      }
    }
    .editing .pass-form label {
      color: #7460EE;
    }
  }
  .select-company-dialog {
    border-radius: 8px;
    ul, li {
      margin: 0;
      padding: 0;
    }
    .el-dialog__header {
      padding: 32px 24px 24px;
      font-size: 20px;
      font-weight: bold;
      color: rgba(0,0,0,.65);
      .el-dialog__headerbtn {
        font-size: 22px;
        top: 33px;
      }
    }
    .el-dialog__body {
      padding: 0 24px 32px;
      li {
        width: 232px;
        font-size: 18px;
        line-height: 20px;
        text-align: center;
        word-wrap: break-word;
        padding: 8px;
        cursor: pointer;
        border-radius: 3px;
        box-shadow: 0 0 4px 0 rgba(0,0,0,0.02), 0 0 8px 0 rgba(0,0,0,0.08);
        margin-bottom: 16px;
        &:last-child {
          margin-bottom: 24px;
        }
        &:hover {
          background-color: #d5cffa;
        }
        &.active {
          background-color: #7460EE;
          color: #fff;
        }
      }
      .btns {
        text-align: center;
        .el-button {
          width: 80px;
          height: 35px;
        }
      }
    }
  }
}
</style>
