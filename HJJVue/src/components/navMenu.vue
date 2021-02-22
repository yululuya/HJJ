<template>
  <div class="headerBox">
    <img src="../assets/images/systemName.png" alt />
    <!-- <h4>联参气象业务办公信息化系统</h4> -->
    <el-menu
      text-color="#fff"
      active-text-color="#fff"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <!-- <el-menu-item index="1">
        <router-link to="/index">首页</router-link>
      </el-menu-item>-->
      <el-menu-item index="2">
        <router-link to="/index">站网布局</router-link>
      </el-menu-item>
      <el-menu-item index="9">
        <router-link to="/peoplePower">部队分布</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/network">网络链路</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/stationPro">数据产品</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/equipParam">装备参数</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link to="/404">武器条件</router-link>
      </el-menu-item>
      <el-menu-item index="7">
        <router-link to="/baseKnow">基础知识</router-link>
      </el-menu-item>
      <el-menu-item index="8">
        <router-link to="/climateBk">气候背景</router-link>
      </el-menu-item>
      <el-menu-item index="10">
        <router-link to="/equipPower">装备实力</router-link>
      </el-menu-item>
      <el-menu-item index="11">
        <router-link to="/targetResult">目标成果</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "headeNav",
  data() {
    return {
      openeds: ["1"],
      activeIndex: "0",
      indexDate: "",
      indexDay: "",
    };
  },
  created() {},
  methods: {
    handleSelect(val) {
      this.activeIndex = val;
    },
  },
};
</script>
<style lang="scss">
.headerBox {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: url(~@/assets/images/menuBk.png) no-repeat;
  background-size: 100% 100%;
  color: #fff;
  img {
    width: 20%;
    margin-left: 20px;
  }
  .rightUser {
    cursor: pointer;
    color: #999;
    i {
      margin-left: 12px;
    }
  }
}
</style>

