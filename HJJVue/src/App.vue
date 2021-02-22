<template>
  <div id="app">
    <div v-if="state">
      <div class="topHeader">
        <span class="title">欢迎来到气象业务办公信息化系统</span>
        <div class="userBox">
          <i class="el-icon-user"></i>
          <span>admin</span>
          <span @click="loginOut">
            <i class="el-icon-switch-button"></i>
            退出
          </span>
        </div>
      </div>
      <el-header class="systemHeader">
        <HeadNav />
      </el-header>
      <el-main class="systemElmain">
        <router-view></router-view>
      </el-main>
    </div>
    <div class="loginCon" v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import "@/assets/common/common.scss";
//页面头部
import HeadNav from "@/components/navMenu";
export default {
  name: "app",
  components: {
    HeadNav,
  },
  data() {
    return {
      state: false,
    };
  },
  watch: {
    "$route.path": function (newVal, oldVal) {
      if (newVal === "/login" || newVal === "" || newVal === "/") {
        this.state = false;
      } else {
        this.state = true;
      }
    },
  },
  methods: {
    loginOut() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
body,
#app {
  width: 100%;
  height: 100vh;
  min-width: 1200px;
  background: #fff;
  overflow-x: hidden;
}
.loginCon {
  height: 100%;
}
.systemHeader {
  height: 62px !important;
  padding: 0;
  border-bottom: solid 1px #e6e6e6;
}
.systemHeader .el-menu.el-menu--horizontal {
  margin: 0 auto;
  border: none;
}
.systemElmain {
  background: #f1f4f7;
  height: calc(100vh - 96px);
}
.el-main {
  padding: 0;
}
.topHeader {
  width: 100%;
  height: 34px;
  line-height: 34px;
  background: #f8f8f8;
  font-size: 12px;
  color: #999;
  display: flex;
  justify-content: space-between;
}
.topHeader .title {
  padding-left: 20px;
}
.userBox {
  padding-right: 20px;
  cursor: pointer;
}
.userBox i {
  margin-right: 4px;
}
.userBox span {
  margin-left: 4px;
}
</style>
