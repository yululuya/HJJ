<template>
  <section class="normalTemplate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/baseKnow' }"
        >基础知识</el-breadcrumb-item
      >
      <el-breadcrumb-item>
        <span style="cursor: pointer" @click="detailFlag = false"
          >法律法规</span
        >
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 法律法规 -->
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
          <el-menu-item index="lawsC">
            <i class="el-icon-tickets"></i>
            <span slot="title">法律</span>
          </el-menu-item>
          <el-menu-item index="lawsFile">
            <i class="el-icon-tickets"></i>
            <span slot="title">规范性文件</span>
          </el-menu-item>
          <el-menu-item index="lawsDep">
            <i class="el-icon-tickets"></i>
            <span slot="title">部门规章</span>
          </el-menu-item>
          <el-menu-item index="lawsAdmin">
            <i class="el-icon-tickets"></i>
            <span slot="title">行政法规</span>
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
          <h4>{{ item.title }}</h4>
          <p>索引号：{{ item.reference_number }}</p>
          <p>文号：{{ item.document_number }}</p>
          <p>摘要：{{ item.abstract == undefined ? "--" : item.abstract }}</p>
          <p>
            <el-button plain size="mini" @click="showDetail(item)"
              >详细信息</el-button
            >
          </p>
        </div>
        <div v-show="detailFlag">
          <h4>{{ detailObj.title }}</h4>
          <table class="el-table el-table--border">
            <tr v-if="detailObj.reference_number">
              <td>索引号</td>
              <td>{{ detailObj.reference_number }}</td>
            </tr>
            <tr v-if="detailObj.title">
              <td>中文标准名称</td>
              <td>{{ detailObj.title }}</td>
            </tr>
            <tr v-if="detailObj.directory_name">
              <td>分类</td>
              <td>{{ detailObj.directory_name }}</td>
            </tr>
            <tr v-if="detailObj.classify">
              <td>目录名称</td>
              <td>{{ detailObj.classify }}</td>
            </tr>
            <tr v-if="detailObj.document_number">
              <td>文号</td>
              <td>{{ detailObj.document_number }}</td>
            </tr>
            <tr v-if="detailObj.organization">
              <td>发布机构</td>
              <td>{{ detailObj.organization }}</td>
            </tr>
            <tr v-if="detailObj.pub_date">
              <td>发布日期</td>
              <td>{{ detailObj.pub_date }}</td>
            </tr>
            <tr v-if="detailObj.utility_status">
              <td>效用状态</td>
              <td>{{ detailObj.utility_status }}</td>
            </tr>
            <tr v-if="detailObj.subject_classification">
              <td>主题分类</td>
              <td>{{ detailObj.subject_classification }}</td>
            </tr>
            <tr v-if="detailObj.document_type">
              <td>公文种类</td>
              <td>{{ detailObj.document_type }}</td>
            </tr>
            <tr v-if="detailObj.abstract">
              <td>摘要</td>
              <td>{{ detailObj.abstract }}</td>
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
          ? "lawsC"
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
        if (element.title.indexOf(this.queryValue) > -1) {
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
        this.tableData = res.data["laws"][val];
        this.tableList = res.data["laws"][val];
      });
    },
    showDetail(item) {
      this.detailFlag = true;
      this.detailObj = item;
    },
    handleQuery() {
      if (this.queryValue) {
        this.tableList.forEach((element) => {
          if (this.queryValue == element.title) {
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
