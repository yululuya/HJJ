<template>
  <section class="termsTemplate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/baseKnow' }"
        >基础知识</el-breadcrumb-item
      >
      <el-breadcrumb-item>
        <span style="cursor: pointer">名词术语</span>
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
            :index="item.name"
            v-for="(item, index) in tableList"
            :key="index"
          >
            <i :class="'menuIcon menuIcon' + (index + 1)"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="rightContant">
        <div>
          <h4>{{ tableData.title }}</h4>
          <el-button
            icon="el-icon-edit"
            size="mini"
            class="editBtn"
            @click="handeledit"
            >编辑</el-button
          >
        </div>

        <h3>
          <span>描述</span>
        </h3>
        <div v-html="tableData.des"></div>
        <div v-if="tableData.specialty && tableData.specialty.length > 0">
          <h3>
            <span>术语及定义</span>
          </h3>
          <div v-html="tableData.specialty"></div>
        </div>
        <div
          v-if="tableData.specialtyTable && tableData.specialtyTable.length > 0"
        >
          <h3>
            <span>术语及定义</span>
          </h3>
          <div>
            <el-table
              :data="tableData.specialtyTable"
              style="width: 100%"
              border
            >
              <el-table-column
                prop="level"
                label="风级和符号"
              ></el-table-column>
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column
                prop="airSpeed"
                label="风速（米/秒）"
              ></el-table-column>
              <el-table-column
                prop="surfMean"
                label="陆地物象"
              ></el-table-column>
              <el-table-column
                prop="waterMean"
                label="水面物象"
              ></el-table-column>
              <el-table-column
                prop="height"
                label="浪高（米）"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹窗-->
    <el-dialog
      width="60%"
      :close-on-click-modal="false"
      title="编辑"
      :visible.sync="visibleDialog"
      top="5vh"
    >
      <el-form :model="msgFormDialog" ref="fromRef" label-width="120px">
        <el-form-item prop="name" label="描述:">
          <div id="desBox" v-html="msgFormDialog.des"></div>
        </el-form-item>
        <el-form-item prop="name" label="术语及定义:">
          <div id="specialtyBox" v-html="msgFormDialog.specialty"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="trueDialog()">确 定</el-button>
        <el-button @click="visibleDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { interfaceObj } from "@/urlConfig.js";
// 导入组件 及 组件样式
import E from "wangeditor";
export default {
  name: "termsTemplate",
  data() {
    return {
      eflag: false,
      msgFormDialog: {},
      visibleDialog: false,
      //   windowhost: process.env.VUE_APP_JSON_API,
      windowhost: "http://" + document.location.host + "/json/",
      tableData: [],
      tableList: [],
      editor1: null,
      editor2: null,
      activeIndex:
        this.$route.params.dataType == undefined
          ? "weaMena"
          : this.$route.params.dataType,
    };
  },
  watch: {},
  async created() {
    await this.axios.get(interfaceObj.titleGetList).then((res) => {
      if (res.data.status == 200) {
        this.tableList = res.data.data;
      }
    });
    this.handleSelect(this.activeIndex);
  },
  mounted() {},
  methods: {
    trueDialog() {
      let obj = {
        des: this.editor1.txt.html(),
        specialty: this.editor2.txt.html(),
        titleid: this.msgFormDialog.titleid,
      };
      this.axios.post(interfaceObj.weatherUpdate, obj).then((res) => {
        if (res.data.status == 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          this.visibleDialog = false;
          this.axios.get(interfaceObj.titleGetList).then((res) => {
            if (res.data.status == 200) {
              this.tableList = res.data.data;
              this.handleSelect(this.activeIndex);
            }
          });
        }
      });
    },
    handeledit() {
      this.visibleDialog = true;
      this.msgFormDialog.titleid = this.tableData.titleid;
      if (this.eflag == false) {
        this.msgFormDialog.specialty = this.tableData.specialty;
        this.msgFormDialog.des = this.tableData.des;
        this.$nextTick(function () {
          this.eflag = true;
          /*现在数据已经渲染完毕*/
          this.editor1 = new E("#desBox");
          this.editor1.create();
          this.editor2 = new E("#specialtyBox");
          this.editor2.create();
        });
      } else {
        this.editor1.txt.html(this.tableData.des);
        this.editor2.txt.html(this.tableData.specialty);
      }
    },
    async handleSelect(val) {
      this.activeIndex = val;
      this.tableList.forEach((element) => {
        if (element.name == val) {
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
      top: -1px;
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
  .menuIcon {
    margin-right: 4px;
  }
}
</style>
