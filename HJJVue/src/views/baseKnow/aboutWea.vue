<template>
  <section class="termsTemplate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/baseKnow' }"
        >基础知识</el-breadcrumb-item
      >
      <el-breadcrumb-item>
        <span style="cursor: pointer" @click="detailFlag = false"
          >气象百科</span
        >
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 名词术语 -->
    <div class="knowBox">
      <div class="leftAside">
        <el-menu
          @select="handleSelect"
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          background-color="#f7f8f8"
          text-color="#333"
          active-text-color="#fff"
        >
          <el-menu-item
            :index="item.eName"
            v-for="(item, index) in tableList"
            :key="index"
          >
            <i class="el-icon-tickets"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
          <!-- <el-menu-item index="seaWea">
            <i class="el-icon-tickets"></i>
            <span slot="title">海洋气候学</span>
          </el-menu-item>
          <el-menu-item index="spaceWea">
            <i class="el-icon-tickets"></i>
            <span slot="title">太空天气</span>
          </el-menu-item>
          <el-menu-item index="ghg">
            <i class="el-icon-tickets"></i>
            <span slot="title">温室气体</span>
          </el-menu-item>
          <el-menu-item index="chinaCyclone">
            <i class="el-icon-tickets"></i>
            <span slot="title">中国气旋</span>
          </el-menu-item>
          <el-menu-item index="weaRadar">
            <i class="el-icon-tickets"></i>
            <span slot="title">气象雷达</span>
          </el-menu-item> -->
        </el-menu>
      </div>
      <div class="rightContant">
        <div>
          <h4>{{ tableData.name }}</h4>
        </div>
        <h3>
          <span>描述</span>
        </h3>
        <div>
          <p>{{ tableData.des }}</p>
        </div>
        <div v-if="tableData.baseInfo">
          <h3>
            <span>基本信息</span>
          </h3>
          <p>{{ tableData.baseInfo }}</p>
        </div>
        <div
          v-if="tableData.rangAndReason && tableData.rangAndReason.length > 0"
        >
          <h3>
            <span>范围及形成</span>
          </h3>
          <div>
            <p v-for="(item, index) in tableData.rangAndReason" :key="index">
              {{ item }}
            </p>
          </div>
        </div>
        <div v-if="tableData.history && tableData.history.length > 0">
          <h3>
            <span>发展历史</span>
          </h3>
          <div>
            <p v-for="(item, index) in tableData.history" :key="index">
              {{ item }}
            </p>
          </div>
        </div>
        <div v-if="tableData.content">
          <h3>
            <span>研究内容</span>
          </h3>
          <div>
            <p>{{ tableData.content }}</p>
          </div>
        </div>
        <div v-if="tableData.methods">
          <h3>
            <span>研究方法</span>
          </h3>
          <div>
            <p>{{ tableData.methods }}</p>
          </div>
        </div>
        <div v-if="tableData.means">
          <h3>
            <span>研究意义</span>
          </h3>
          <div>
            <p>{{ tableData.means }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "termsTemplate",
  data() {
    return {
      //   windowhost: process.env.VUE_APP_JSON_API,
      windowhost: "http://" + document.location.host + "/json/",
      tableData: [],
      tableList: [],
      activeIndex:
        this.$route.params.dataType == undefined
          ? "seaWea"
          : this.$route.params.dataType,
      detailFlag: false,
    };
  },
  watch: {},
  async created() {
    await this.axios.get(this.windowhost + "baseKnow.json").then((res) => {
      this.tableList = res.data["aboutWea"]["aboutWeaList"];
    });
    this.handleSelect(this.activeIndex);
  },
  methods: {
    async handleSelect(val) {
      this.activeIndex = val;
      this.tableList.forEach((element) => {
        if (element.eName == val) {
          this.tableData = element;
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.termsTemplate {
  background: #fff;
  padding: 20px;
  width: 80%;
  margin: 20px auto;
  .knowBox {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-top: 20px;
  }
  .leftAside {
    width: 160px;
  }
  .rightContant {
    width: calc(100% - 160px);
    padding: 20px;
    padding-top: 0;
    p {
      line-height: 30px;
      font-size: 13px;
      padding-left: 30px;
    }
    h4 {
      margin: 0;
      font-size: 18px;
      position: relative;
      padding-bottom: 16px;
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
    h3 {
      font-size: 16px;
      position: relative;
      span {
        display: inline-block;
        line-height: 42px;
        background: #409eff;
        color: #fff;
        padding-right: 14px;
        padding-left: 0;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      }
    }
    h3:after {
      content: "";
      width: calc(100% - 140px);
      height: 1px;
      background: #409eff;
      display: inline-block;
      position: absolute;
      left: 150px;
      top: 23px;
    }
    div {
      position: relative;
    }
    .editBtn {
      position: absolute;
      left: 132px;
      top: 4px;
    }
  }
}
</style>
