<template>
  <section class="climateTemplate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>气候背景</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="climateBox">
      <div class="leftAside">
        <el-menu
          @select="handleSelect"
          :default-active="activeIndex"
          background-color="#f7f8f8"
          text-color="#333"
          active-text-color="#fff"
          :unique-opened="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>东部战区</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="jiangsu">江苏省</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="zhejiang">浙江省</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="anhui">安徽省</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="fujian">福建省</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="jiangxi">江西省</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="shanghai">上海省</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>西部战区</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="sichuan">四川省</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="gansu">甘肃省</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="qinghai">青海省</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="ningxia">宁夏回族自治区</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="xinjiang">新疆维吾尔自治区</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="xizang">西藏自治区</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="chongqing">重庆市</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>南部战区</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="guangdong">广东省</el-menu-item>
              <el-menu-item index="guangxi">广西壮族自治区</el-menu-item>
              <el-menu-item index="hainan">海南省</el-menu-item>
              <el-menu-item index="yunnan">云南省</el-menu-item>
              <el-menu-item index="hunan">湖南省</el-menu-item>
              <el-menu-item index="guizhou">贵州省</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>北部战区</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="liaoning">辽宁省</el-menu-item>
              <el-menu-item index="shandong">山东省</el-menu-item>
              <el-menu-item index="jilin">吉林省</el-menu-item>
              <el-menu-item index="neimenggu">内蒙古自治区</el-menu-item>
              <el-menu-item index="heilongjiang">黑龙江省</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>中部战区</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="beijing">北京市</el-menu-item>
              <el-menu-item index="tianjin">天津市</el-menu-item>
              <el-menu-item index="hebei">河北省</el-menu-item>
              <el-menu-item index="henan">河南省</el-menu-item>
              <el-menu-item index="shannxi">陕西省</el-menu-item>
              <el-menu-item index="shanxi">山西省</el-menu-item>
              <el-menu-item index="hubei">湖北省</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="taiwan">
            <i class="el-icon-location"></i>
            <span slot="title">台湾</span>
          </el-menu-item>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>周边国家</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="yindu">
                <i class="el-icon-location"></i>
                <span slot="title">印度</span>
              </el-menu-item>
              <el-menu-item index="bajisitan">
                <i class="el-icon-location"></i>
                <span slot="title">巴基斯坦</span>
              </el-menu-item>
              <el-menu-item index="chaoxian">
                <i class="el-icon-location"></i>
                <span slot="title">朝鲜</span>
              </el-menu-item>
              <el-menu-item index="riben">
                <i class="el-icon-location"></i>
                <span slot="title">日本</span>
              </el-menu-item>
              <el-menu-item index="hanguo">
                <i class="el-icon-location"></i>
                <span slot="title">韩国</span>
              </el-menu-item>
              <el-menu-item index="yuenan">
                <i class="el-icon-location"></i>
                <span slot="title">越南</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="rightContant">
        <el-row :gutter="20">
          <el-col :span="8">
            <img
              :src="require('../../assets/images/' + activeIndex + '.jpg')"
              alt
            />
          </el-col>
          <el-col :span="16">
            <div>
              <h4>
                {{ climateBkObj.title }}
                <span>基 | 本 | 信 | 息</span>
              </h4>
              <p>{{ climateBkObj.subTitle }}</p>
            </div>
          </el-col>
          <el-col :span="24">
            <p v-for="(item, index) in climateBkObj.content" :key="index">
              {{ item }}
            </p>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "climateTemplate",

  data() {
    return {
      windowhost: "http://" + document.location.host,
      activeIndex: "jiangsu",
      msgDialogForm: {},
      dialogVisible: false,
      climateBkObj: {},
    };
  },
  watch: {},
  created() {
    this.handleSelect("jiangsu");
  },
  methods: {
    handleSelect(val) {
      this.activeIndex = val;
      this.axios.get(this.windowhost + "/json/climateBk.json").then((res) => {
        this.climateBkObj = res.data.result[val];
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.climateTemplate {
  background: #fff;
  padding: 20px;
  width: 80%;
  margin: 20px auto;
  .climateBox {
    height: 100%;
    display: flex;
  }

  .leftAside {
    width: 260px;
  }
  .rightContant {
    width: calc(100% - 260px);
    p {
      line-height: 30px;
    }
    .el-row {
      width: 90%;
      padding: 12px;
      margin: 0 auto !important;
      border-bottom: 1px solid #e6e6e6;
      .el-col {
        img {
          display: block;
          width: 100%;
        }
        p {
          text-indent: 24px;
        }
      }
    }
    h4 {
      margin: 0;
      font-size: 22px;
      position: relative;
      padding-bottom: 16px;
      span {
        position: absolute;
        font-size: 13px;
        color: #999;
        font-weight: normal;
        right: 0;
        bottom: 16px;
      }
    }
    h4:before {
      content: " ";
      position: absolute;
      width: 100%;
      height: 10px;
      background: url(~@/assets/images/titleLine.png) no-repeat;
      background-size: 100% 100%;
      bottom: 0;
    }
  }
}
</style>
