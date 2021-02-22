<template>
  <section class="stationProTemplate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据产品</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="flexBox">
      <div class="leftAside">
        <el-menu
          @select="handleSelect"
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          background-color="#f7f8f8"
          text-color="#333"
          active-text-color="#fff"
        >
          <el-menu-item index="surf">
            <i class="el-icon-menu"></i>
            <span slot="title">地面气象资料</span>
          </el-menu-item>
          <el-menu-item index="upar">
            <i class="el-icon-menu"></i>
            <span slot="title">高空气象资料</span>
          </el-menu-item>
          <el-menu-item index="wearadar">
            <i class="el-icon-menu"></i>
            <span slot="title">天气雷达探测资料</span>
          </el-menu-item>
          <el-menu-item index="windradar">
            <i class="el-icon-menu"></i>
            <span slot="title">测风雷达探测资料</span>
          </el-menu-item>
          <el-menu-item index="ship">
            <i class="el-icon-menu"></i>
            <span slot="title">海洋自动站</span>
          </el-menu-item>
          <el-menu-item index="buoy">
            <i class="el-icon-menu"></i>
            <span slot="title">海洋浮标</span>
          </el-menu-item>
          <el-menu-item index="Towns">
            <i class="el-icon-menu"></i>
            <span slot="title">城镇预报</span>
          </el-menu-item>
          <el-menu-item index="hydrology">
            <i class="el-icon-menu"></i>
            <span slot="title">陆地水文</span>
          </el-menu-item>
          <el-menu-item index="satellite">
            <i class="el-icon-menu"></i>
            <span slot="title">卫星</span>
          </el-menu-item>
          <el-menu-item index="Environment">
            <i class="el-icon-menu"></i>
            <span slot="title">空间环境</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="rightContant">
        <div>
          <h4>{{ tableData.title }}</h4>
          <table class="el-table el-table--border">
            <tr>
              <td>要素</td>
              <td v-if="tableData.ele && tableData.ele.type">
                <p v-for="(item, index) in tableData.ele.value" :key="index">
                  {{ item }}
                </p>
              </td>
              <td v-else>{{ tableData.ele }}</td>
            </tr>
            <tr>
              <td>空间范围</td>
              <td>{{ tableData.range }}</td>
            </tr>
            <tr>
              <td>频率</td>
              <td>{{ tableData.frequency }}</td>
            </tr>
            <tr>
              <td>数据源</td>
              <td>{{ tableData.baseForm }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "stationProTemplate",
  data() {
    return {
      // windowhost: process.env.VUE_APP_JSON_API,
      windowhost: "http://" + document.location.host + "/json/",
      activeIndex: "surf",
      tableData: {},
    };
  },
  watch: {},
  created() {
    this.handleSelect("surf");
  },
  methods: {
    handleSelect(val) {
      this.activeIndex = val;
      this.axios.get(this.windowhost + "stationPro.json").then((res) => {
        this.tableData = res.data[val];
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.stationProTemplate {
  background: #fff;
  padding: 20px;
  width: 80%;
  margin: 20px auto;
  .flexBox {
    display: flex;
  }
  .leftAside {
    width: 240px;
  }
  .rightContant {
    padding-left: 20px;
    width: calc(100% - 240px);
    h4 {
      text-indent: 0;
      position: relative;
      padding-bottom: 20px;
      margin: 0;
      text-indent: 0;
    }
    h4:before {
      content: " ";
      position: absolute;
      width: 100%;
      height: 10px;
      background: url(~@/assets/images/titleLine.png) no-repeat;
      background-size: 100% 100%;
      bottom: 0;
      left: 0;
    }
  }
  .el-table th,
  .el-table td {
    min-width: 200px;
    p {
      text-align: left;
      padding-left: 12px;
      text-indent: 24px;
    }
  }
}
</style>
