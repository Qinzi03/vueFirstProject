<template>
  <div class="navbar">
    <!-- -->
    <div class="lr-navbar">
      <div class="lr-navbar--item">
        <div style="margin-left: 24px;height: 18px;margin-top: 3px">
          <div>
            <el-dropdown placement="bottom" @command="handleCommand">
              <span class="lr-topbar-dropdown" >
                <svg-icon icon-class="top_icon_logout" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      customerInfo: {},
      leaveVisible: false
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  mounted() {
    this.getCustomerInfo()
  },
  methods: {
    getCustomerInfo() {
      this.$http.get(this.$api.getUsersDetial)
        .then(res => {
          this.customerInfo = res
        }).catch(err => {
          this.$message.error(err.message)
        })
    },
    contactUs() { // 联系我们
      ysf.config({
        uid: this.$store.state.user.base.userId, // 用户Id唯一标识
        data: JSON.stringify([
          { 'key': 'real_name', 'value': this.$store.state.user.base.userName },
          { 'key': 'mobile_phone', 'value': this.customerInfo.mobile || '' },
          { 'key': 'email', 'value': this.customerInfo.email || '' },
          { 'index': 1, 'key': 'company', 'label': '公司名', 'value': this.$store.state.user.base.entName }
        ]),
        success: function() { // 成功回调
          ysf.open()
        },
        error: function() { // 错误回调
          this.$message.error('未知错误')
        }
      })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.logout()
      }
    },
    logout() {
      this.$emit('logout')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/variables.scss";
@import "src/styles/mixin.scss";

.navbar {
  height: #{$navbarHeight}px;
  line-height: #{$navbarHeight}px;
  border-radius: 0px !important;
  z-index: 1000;
  position: fixed;
  width: calc(100% - #{$menuWidth - 5}px);
  background: #FFFFFF;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05), 0 2px 8px 0 rgba(0,0,0,0.10);
}
.lr-navbar{
  .lr-color1{
    color: #6d70e6;
  }
  .lr-color2{
    color: red;
  }
  .lr-color3{
    color: orange;
  }
  input{
    width: 73px;
    border-radius: 16px;
    border: none;
  }
  .icon-icon_help_normal{
    margin-left: 20px;
    color: #7460EE;
    margin-right: 2px;
  }
  .lr-navbar--help{
    font-size: 14px;
    color: #62606C;
  }
  .lr-navbar--item{
    display: flex;
    align-content: center;
    justify-content: center;
    float: right;
    margin-right: 9px;
    .lr-select-label-icon{
      font-size: 16px;
      background: none !important;
      margin: 0 5px;
    }
    .lr-select-label-icon {
      position: relative;
      left: 20px;
      z-index: 99;
    }
    .el-dropdown{
      height: 24px;
      line-height: 24px;
    }
  }
  .lr-seat-select{
    input{
      text-align: center;
    }
    &.el-select > .el-input {
      height: 34px;
    }
    .el-input__suffix {
      top: 1px;
    }
  }
}
</style>
<style>
.lr-seatState {
  margin: 0 30px;
  width: 100px;
}
.lr-seatState .el-input.el-input--suffix {
  height: 42px;
}
/* .lr-seatState .el-input__inner {
  height: 30px;
  line-height: 30px;
  border-radius: 70px;
} */
/* .seatState.el-select .el-input__inner:focus {
  border-color: #dcdfe6;
}

.seatStateBusy .el-input__inner{
  color: #F66C6F;
}
.seatStateOff .el-input__inner{
  color: #7F8FA4;
} */
.lr-topbar-dropdown{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: rgba(0,0,0,0.43);
  width: 64px;
  border-left: 1px solid #D9D9D9;
  height: 18px;
}
</style>

