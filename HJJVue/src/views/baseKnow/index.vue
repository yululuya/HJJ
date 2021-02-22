<template>
  <section class="knowTemplate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础知识</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="header">
        <img src="../../assets/images/weatherSearch2.png" alt />
        <div class="searchBox">
          <el-input
            size="small"
            v-model="queryName"
            placeholder="海量气象知识，搜一下，试一试"
          ></el-input>
          <el-button type="primary" icon="el-icon-search" @click="handleQuery"
            >资源查询</el-button
          >
        </div>
      </div>
      <el-row :gutter="20" class="cardRow">
        <el-col :span="6">
          <div class="colBox colBox1">
            <h4>名词术语</h4>
            <ul>
              <li
                v-for="(item, index) in termsList"
                :key="index"
                v-show="index < 4"
                @click="konwMore('名词术语', item.name)"
              >
                {{ item.title }}
              </li>
            </ul>
            <div class="more" @click="konwMore('名词术语')">更多+</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="colBox colBox2">
            <h4>标准规范</h4>
            <ul>
              <li
                @click="
                  konwMore('标准规范', 'country', '天气预报检验 台风预报')
                "
              >
                天气预报检验 台风预报
              </li>
              <li
                @click="
                  konwMore(
                    '标准规范',
                    'country',
                    '风电场气象观测资料审核、插补与订正技术规范'
                  )
                "
              >
                风电场气象观测资料审核、插补与订正技术规范
              </li>
              <li @click="konwMore('标准规范', 'country', '气象仪器术语')">
                气象仪器术语
              </li>
              <li @click="konwMore('标准规范', 'country', '森林火险气象等级')">
                森林火险气象等级
              </li>
            </ul>
            <div class="more" @click="konwMore('标准规范')">更多+</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="colBox colBox3">
            <h4>法规制度</h4>
            <ul>
              <li
                @click="konwMore('法规制度', 'lawsC', '中华人民共和国标准化法')"
              >
                中华人民共和国标准化法
              </li>
              <li
                @click="
                  konwMore('法规制度', 'lawsC', '中华人民共和国环境影响评价法')
                "
              >
                中华人民共和国环境影响评价法
              </li>
              <li
                @click="
                  konwMore('法规制度', 'lawsC', '中华人民共和国安全生产法')
                "
              >
                中华人民共和国安全生产法
              </li>
              <li
                @click="
                  konwMore('法规制度', 'lawsC', '中华人民共和国可再生能源法')
                "
              >
                中华人民共和国可再生能源法
              </li>
            </ul>
            <div class="more" @click="konwMore('法规制度')">更多+</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="colBox colBox4">
            <h4>气象百科</h4>
            <ul>
              <li @click="konwMore('气象百科', 'seaWea', '海洋气候学')">
                海洋气候学
              </li>
              <li @click="konwMore('气象百科', 'spaceWea', '太空天气')">
                太空天气
              </li>
              <li @click="konwMore('气象百科', 'ghg', '大气温室效应')">
                大气温室效应
              </li>
              <li @click="konwMore('气象百科', 'chinaCyclone', '中国气旋')">
                中国气旋
              </li>
            </ul>
            <div class="more" @click="konwMore('气象百科')">更多+</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import { interfaceObj } from "@/urlConfig.js";
export default {
  name: "knowTemplate",
  data() {
    return {
      // windowhost: process.env.VUE_APP_JSON_API,
      windowhost: "http://" + document.location.host + "/json/",
      queryName: "",
      activeIndex: null,
      msgDialogForm: {},
      termsList: {},
    };
  },
  watch: {},
  created() {
    this.axios.get(interfaceObj.titleGetList).then((res) => {
      if (res.data.status == 200) {
        this.termsList = res.data.data;
      }
    });
  },
  methods: {
    konwMore(name, type, query) {
      this.$router.push({
        name: name,
        params: { dataType: type, dataQuery: query },
      });
    },
    handleQuery() {
      if (this.queryName) {
        let flag = true;
        let name = "";
        let menu = "";
        let termFlag = false;
        this.termsList.forEach((element) => {
          if (element.title == this.queryName) {
            this.konwMore("名词术语", element.name);
            termFlag = true;
          }
        });
        if (termFlag) {
          return;
        }
        this.axios.get(this.windowhost + "baseKnow.json").then((res) => {
          let dataObj = res.data;
          let cardType = Object.keys(dataObj);
          let that = this;
          cardType.forEach((cardItem) => {
            let menuType = Object.keys(dataObj[cardItem]);
            menuType.forEach((menuItem) => {
              dataObj[cardItem][menuItem].forEach((child) => {
                if (child.standard_name == that.queryName) {
                  name = "标准规范";
                  menu = menuItem;
                  flag = false;
                }

                if (child.title == that.queryName) {
                  name = "法规制度";
                  menu = menuItem;
                  flag = false;
                }
                if (child.name == that.queryName) {
                  name = "气象百科";
                  menu = child.eName;
                  flag = false;
                }
              });
            });
          });
          if (flag) {
            this.$message.error("未查询到内容");
          } else {
            //  this.$router.push({
            //   name: name,
            //   params: { dataType: type, dataQuery: query },
            // });
            this.$router.push({
              name: name,
              params: {
                dataType: menu,
                dataQuery: that.queryName,
              },
            });
          }
        });
      } else {
        this.$message.error("请输入查询内容");
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.knowTemplate {
  background: #fff;
  padding: 20px;
  width: 80%;
  margin: 20px auto;
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 250px;
    background: url(~@/assets/images/rain.gif) no-repeat;
    background-size: 100% 100%;
  }
  .knowBox {
    width: 100%;
    display: flex;
    margin-top: 20px;
  }
  .searchBox {
    display: flex;
    width: 600px;
    height: 56px;
    padding: 2px;
    margin-left: 12px;
    border: 1px solid 1px solid #b3e4fe;
    border: 1px solid #b3e4fe;
    background: #fff;
    .el-input--small .el-input__inner {
      height: 100%;
      line-height: 100%;
      border: none;
      font-size: 18px;
    }
  }
  .cardRow {
    margin-top: 20px;
    .colBox {
      width: 100%;
      height: 300px;
      color: #fff;
      h4 {
        font-size: 18px;
        text-align: center;
        padding-top: 30px;
        position: relative;
      }
      h4:before {
        content: "";
        position: absolute;
        width: 40px;
        height: 2px;
        background: rgba(255, 255, 255, 0.5);
        left: 44%;
        bottom: -10px;
      }
      ul {
        width: 90%;
        margin: auto;
        padding: 0;
        margin-bottom: 20px;
      }
      li {
        position: relative;
        list-style: none;
        padding-left: 30px;
        line-height: 34px;
        cursor: pointer;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      }
      li:before {
        content: "";
        position: absolute;
        left: 10px;
        top: 11px;
        width: 10px;
        height: 10px;
        border-radius: 50%;

        border: 2px solid rgba(255, 255, 255, 0.5);
      }
      .more {
        display: inline-block;
        border: 1px solid #fff;
        font-size: 14px;
        padding: 4px 12px;
        margin-left: 12px;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      }
    }

    .colBox1 {
      background-color: #5396e3;
    }
    .colBox2 {
      background-color: rgb(63, 205, 183);
    }
    .colBox3 {
      background-color: rgb(137, 106, 219);
    }
    .colBox4 {
      background-color: rgb(247, 138, 83);
    }
  }
}

.leftAside {
  width: 160px;
}
.rightContant {
  width: calc(100% - 160px);
  padding: 20px;
  padding-top: 0;
  text-indent: 24px;
  p {
    line-height: 30px;
    font-size: 13px;
    padding-left: 30px;
  }
  h4 {
    margin: 0;
    font-size: 22px;
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
.editorBox {
  max-width: 700px;
  text-align: left;
}
</style>
