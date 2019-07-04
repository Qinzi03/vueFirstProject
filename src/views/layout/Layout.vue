<template>
  <div :class="classObj" class="app-wrapper">
    <div :class="{ 'is-collapse': !isExpand }" class="lr-sidebar-logo">
      后台管理
    </div>
    <div :class="{ 'is-collapse': !isExpand }" class="lr-sidebar-info">
      <div class="lr-sidebar-user">
        <div class="lr-sidebar-user--logo">
          <!-- <img src="../../assets/avatar.png"> -->
        </div>
        <div class="lr-sidebar-user--detail">
          <el-dropdown :hide-on-click="false" @command="handleCommand">
            <span class="el-dropdown-link lr-hover" style="font-size: 14px;color: #FFFFFF;">
              {{ isExpand ? userName : '' }}<i :class="{ 'el-icon--right': isExpand }" class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="lr-sidebar-user--separator" />
      <sidebar :is-expand="isExpand" class="sidebar-container"/>
      <div :class="{ 'is-collapse': !isExpand }" class="lr-sidebar-expand" @click="isExpand = !isExpand">
        <img v-if="isExpand" src="../../assets/ic_arrow_left.svg" >
        <img v-else src="../../assets/ic_arrow_right.svg" >
      </div>
    </div>

    <div :class="{ 'is-collapse': !isExpand }" class="main-container">
      <div class="lr-navbar-container">
        <navbar :class="{ 'is-collapse': !isExpand }" @logout="logout"/>
      </div>
      <app-main/>
    </div>
    <div class="lr-expand-bottom">
      <lr-expand @click.native.stop="openGlobalDialog"/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/NavBar/index.vue'
import { Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import actionMixin from './mixin/actionMixin'
export default {
  name: 'Layout',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from && from.name === 'login') {
        // tianjia
      }
    })
  },
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin, actionMixin],
  data() {
    return {
      globalDialogVisible: false, // 是否显示全局弹窗
      callbackList: [],
      isExpand: true,
      userName: this.$store.state.user.base.userName
    }
  },
  computed: {
    classObj() {
      return {}
    }
  },
  methods: {
    logout() { // 登出
      this.$store.dispatch('LogOut').then(() => {
      }).catch(_ => {
        // 清空用户信息
        this.$store.commit('CLEAR_LOGIN_INFO')
        this.$router.push({
          path: '/login'
        })
      })
    },
    handleCommand(command) {
      this[command]()
    },
    openGlobalDialog() {
      this.$message.info('可自定义')
    }
  }
}
</script>

<style lang="scss" >
.lr-screenPopUp {
  .el-dialog {
    border-radius: 8px;
    .el-dialog__header {
      padding-top: 0
    }
  }
}

</style>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";

$menuLeftIndex: 1010;
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .lr-logout {
    height: 50px;
    border-top: 1px solid rgba(255,255,255,0.26);
    padding: 0 20px;
    line-height: 50px;
    font-size: 14px;
    text-align: center;
    &:hover{
      cursor: pointer;
    }
    .el-button {
      width: 100%;
    }
    i{
      font-size: 14px;
      color: rgba(255,255,255,0.75);
      margin-right: 12px;
      margin-left: 3px;
    }
  }
  &.mobile.openSidebar {

    .lr-navbar-container {
      background-color: #ffffff;
      .is-collapse {
        width: calc(100% - #{$menuWidth - 95}px);
      }
    }
    .lr-sidebar-info {
      position: fixed;
      top: #{$logoHeight}px;
      left: 0;
      z-index: $menuLeftIndex;
      width: #{$menuWidth}px;
      height: 100%;
      background-image: linear-gradient(0deg, #7561bf, #5a45a2);
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.02), 0 0 8px 0 rgba(0, 0, 0, 0.08);
    }
    .lr-sidebar-logo {
      width: #{$menuWidth}px;
      position: fixed;
      top: 0;
      &.is-collapse {
        width: 72px;
        transition: width .28s;
        img {
          width: 72px;
        }
      }
    }
  }

  .lr-navbar-container {
    background-color: #ffffff;
    .is-collapse {
      width: calc(100% - #{$menuWidth - 95}px);
    }
  }
  .lr-sidebar-info {
    position: fixed;
    top: #{$logoHeight}px;
    left: 0;
    z-index: $menuLeftIndex;
    width: #{$menuWidth}px;
    height: 100%;
    background-image: linear-gradient(0deg, #7561bf, #5a45a2);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.02), 0 0 8px 0 rgba(0, 0, 0, 0.08);
    &.is-collapse {
      width: 72px;
      transition: width .28s;
      img {
        width: 31px;
      }
    }
  }
  .lr-sidebar-logo {
    width: #{$menuWidth}px;
    position: fixed;
    z-index: $menuLeftIndex;
    left: 0;
    top: 0;
    height: #{$logoHeight}px;
    line-height: #{$logoHeight}px;
    color: white;
    font-size: 18px;
    text-align: center;
    background: #7460EE;
    img {
      width: 120px;
      display: block;
      margin: 0 auto;
      margin-top: 22px;
    }
    &.is-collapse {
      width: 72px;
      transition: width .28s;
      img {
        width: 31px;
      }
    }
  }

  .lr-sidebar-user {
    width: 100%;
    height: #{$userInfoHeight}px;
    background-image: linear-gradient(0deg, #5a46a2, #57429F);
    padding: 16px;
    font-size: 14px;
    // @include box-shadow(4px, 5px, 10px, 0, $shadowColor);
    .lr-sidebar-user--logo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 4px;
      img {
        // margin-right: 8px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .lr-sidebar-user--detail {
      text-align: center;
      overflow: hidden;
      .lr-sidebar-user--name {
        color: #ffffff;
        display: block;
        font-size: 16px;
        line-height: 28px;
        margin-bottom: 2px;
        @include text-overflow();
      }
      .lr-sidebar-user-brief {
        font-size: #{$font-size-small}px;
        color: #ffffff;
        @include text-overflow();
        &:hover{
          cursor: pointer;
          color: #ffffff;
        }
      }
    }
  }
  .lr-sidebar-user--separator {
    width: 80%;
    margin: 0 auto;
    margin-top: -1px;
    height: 1px;
    background-color: #cccccc;
  }
  .lr-sidebar-expand {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 166px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    background-image: linear-gradient(0deg, #57429F, #5a46a2);
    border-top: 1px solid #ccc;
    cursor: pointer;
    &.is-collapse {
      transition: width .28s;
      width: 72px;
    }
    img {
      width: 13px;
      height: 10px;
    }
  }
  .lr-screenPopUp {
    .lr-center {
      text-align: center;
      .lr-name {
        font-size: 20px;
        color: rgba(0, 0, 0, 0.75);
      }
      .lr-width170 {
        width: 170px;
        margin-top: 50px;
      }
    }
  }
}
.lr-expand-bottom{
  height: 50px;
  position: relative;
  bottom:0;
  right:0;
  background-color: $pageBg;
}
</style>
