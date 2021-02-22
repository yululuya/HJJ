<template>
  <section class="normalTemplate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/baseKnow' }"
        >基础知识</el-breadcrumb-item
      >
      <el-breadcrumb-item>
        <span style="cursor: pointer" @click="detailFlag = false"
          >标准规范</span
        >
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标准规范 -->
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
          <el-menu-item index="country">
            <i class="el-icon-tickets"></i>
            <span slot="title">国家标准</span>
          </el-menu-item>
          <el-menu-item index="place">
            <i class="el-icon-tickets"></i>
            <span slot="title">地方标准</span>
          </el-menu-item>
          <el-menu-item index="tmt">
            <i class="el-icon-tickets"></i>
            <span slot="title">行业标准</span>
          </el-menu-item>
          <el-menu-item index="base">
            <i class="el-icon-tickets"></i>
            <span slot="title">基础标准</span>
          </el-menu-item>
          <el-menu-item index="team">
            <i class="el-icon-tickets"></i>
            <span slot="title">团体标准</span>
          </el-menu-item>
          <el-menu-item index="foreign">
            <i class="el-icon-tickets"></i>
            <span slot="title">国外标准</span>
          </el-menu-item>
          <el-menu-item index="about">
            <i class="el-icon-tickets"></i>
            <span slot="title">相关标准</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="rightContant">
        <div class="queryBox">
          <div class="left">
            <el-input
              size="small"
              v-model="queryValue"
              placeholder="在结果中搜索"
              clearable
            ></el-input>
            <el-button
              size="small"
              type="primary"
              icon="el-icon-search"
              @click="handleQuery"
              >搜索</el-button
            >
          </div>
          <div class="right" :span="12">
            <p>共{{ tableData.length }}个结果</p>
          </div>
        </div>
        <div
          class="itemBox"
          v-for="(item, index) in tableData"
          :key="index"
          v-show="!detailFlag"
        >
          <h4>{{ item.standard_name }}</h4>
          <p>标准编号：{{ item.standard_number }}</p>
          <p>
            发布部门：{{
              item.releaseUnit == undefined ? "--" : item.releaseUnit
            }}
          </p>
          <p>
            <el-button plain size="mini" @click="showDetail(item)"
              >详细信息</el-button
            >
          </p>
        </div>
        <div v-show="detailFlag">
          <h4>{{ detailObj.standard_name }}</h4>
          <table class="el-table el-table--border">
            <tr v-if="detailObj.standard_number">
              <td>标准编号</td>
              <td>{{ detailObj.standard_number }}</td>
            </tr>
            <tr v-if="detailObj.standard_name">
              <td>中文标准名称</td>
              <td>{{ detailObj.standard_name }}</td>
            </tr>
            <tr v-if="detailObj.standard_state">
              <td>标准状态</td>
              <td>{{ detailObj.standard_state }}</td>
            </tr>
            <tr v-if="detailObj.standard_system">
              <td>所属标准体系</td>
              <td>{{ detailObj.standard_system }}</td>
            </tr>
            <tr v-if="detailObj.enforcement_date">
              <td>实施日期</td>
              <td>{{ detailObj.enforcement_date }}</td>
            </tr>
            <tr v-if="detailObj.standard_character">
              <td>标准性质</td>
              <td>{{ detailObj.standard_character }}</td>
            </tr>
            <tr v-if="detailObj.standard_level">
              <td>标准级别</td>
              <td>{{ detailObj.standard_level }}</td>
            </tr>
            <tr v-if="detailObj.ICS">
              <td>国际标准分类号</td>
              <td>{{ detailObj.ICS }}</td>
            </tr>
            <tr v-if="detailObj.CCS">
              <td>中国标准分类号</td>
              <td>{{ detailObj.CCS }}</td>
            </tr>
            <tr v-if="detailObj.pages">
              <td>页数</td>
              <td>{{ detailObj.pages }}</td>
            </tr>
            <tr v-if="detailObj.adopted">
              <td>采标情况</td>
              <td>{{ detailObj.adopted }}</td>
            </tr>
            <tr v-if="detailObj.main_drafters">
              <td>主要起草人</td>
              <td>{{ detailObj.main_drafters }}</td>
            </tr>
            <tr v-if="detailObj.releaseUnit">
              <td>发布单位</td>
              <td>{{ detailObj.releaseUnit }}</td>
            </tr>
            <tr v-if="detailObj.centralizedManageUnit">
              <td>归口单位</td>
              <td>{{ detailObj.centralizedManageUnit }}</td>
            </tr>
            <tr v-if="detailObj.proposedUnit">
              <td>提出单位</td>
              <td>{{ detailObj.proposedUnit }}</td>
            </tr>
            <tr v-if="detailObj.draftingUnit">
              <td>起草单位</td>
              <td>{{ detailObj.draftingUnit }}</td>
            </tr>
            <tr v-if="detailObj.keywords_cn">
              <td>中文主题词</td>
              <td>{{ detailObj.keywords_cn }}</td>
            </tr>
            <tr v-if="detailObj.keywords_en">
              <td>英文主题词</td>
              <td>{{ detailObj.keywords_en }}</td>
            </tr>
            <tr v-if="detailObj.standard_synopsis">
              <td>标准简介</td>
              <td>{{ detailObj.standard_synopsis }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "knowTemplate",
  data() {
    return {
      //   windowhost: process.env.VUE_APP_JSON_API,
      windowhost: "http://" + document.location.host + "/json/",
      tableData: [],
      tableList: [],
      activeIndex:
        this.$route.params.dataType == undefined
          ? "country"
          : this.$route.params.dataType,
      detailFlag: false,
      detailObj: {},
      queryValue:
        this.$route.params.dataQuery == undefined
          ? ""
          : this.$route.params.dataQuery,
    };
  },
  watch: {},
  async created() {
    await this.handleSelect(this.activeIndex);
    if (this.queryValue) {
      this.tableList.forEach((element) => {
        if (this.queryValue == element.standard_name) {
          this.detailObj = element;
          this.detailFlag = true;
        }
      });
    }
  },
  methods: {
    async handleSelect(val) {
      this.detailFlag = false;
      this.activeIndex = val;
      await this.axios.get(this.windowhost + "baseKnow.json").then((res) => {
        this.tableData = res.data["standard"][val];
        this.tableList = res.data["standard"][val];
      });
    },
    showDetail(item) {
      this.detailFlag = true;
      this.detailObj = item;
    },
    handleQuery() {
      if (this.queryValue) {
        this.tableList.forEach((element) => {
          if (element.standard_name.indexOf(this.queryValue) > -1) {
            this.tableData = [];
            this.tableData.push(element);
          }
        });
      } else {
        this.detailFlag = false;
        this.tableData = this.tableList;
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.normalTemplate {
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
    .queryBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #dcdfe6;
      margin-bottom: 20px;
      padding: 0 10px;
      .left {
        width: 30%;
        display: flex;
        .el-input {
          margin-right: 12px;
          text-indent: 0;
        }
      }
    }
  }
  .el-table {
    td:first-child {
      text-align: right;
      padding-right: 12px;
      width: 150px;
    }
    td:last-child {
      text-align: left;
      padding-left: 4px;
    }
  }
}
</style>
