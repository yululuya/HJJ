<template>
  <div class="eqTemplate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/equipParam' }"
        >装备参数</el-breadcrumb-item
      >
      <el-breadcrumb-item>装备介绍</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="10">
        <img :src="tableData.imgsrc" alt style="width: 100%" />
      </el-col>
      <el-col :span="14">
        <div>
          <h4>
            {{ tableData.title }}
            <span>基 | 本 | 信 | 息</span>
          </h4>
          <p style="text-indent: 24px">{{ tableData.summary }}</p>
        </div>
      </el-col>
    </el-row>
    <div
      v-if="
        tableData.characteristicList && tableData.characteristicList.length > 0
      "
    >
      <h3>
        <span>气象站特点</span>
      </h3>
      <p v-for="(item, index) in tableData.characteristicList" :key="index">
        {{ index + 1 + "." + item }}
      </p>
    </div>
    <div v-if="tableData.elementlist">
      <h3>
        <span>基本气象要素</span>
      </h3>
      <table class="el-table el-table--border">
        <tr v-for="(item, index) in tableData.elementlist" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.limits }}</td>
          <td>{{ item.accuracy }}</td>
          <td>{{ item.ratio }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "eqTemplate",
  data() {
    return {
      tableData: this.$route.params.details,
    };
  },
  watch: {},
  created() {
    /* debugger;
    this.axios
      .get(interfaceObj.parameterGetById, {
        id: this.queryValue,
      })
      .then((res) => {
        this.tableData = element;
        this.index = index;
      }); */
  },
  methods: {},
};
</script>

<style rel="stylesheet/scss" lang="scss">
.eqTemplate {
  background: #fff;
  padding: 20px;
  width: 80%;
  margin: 20px auto;
  p {
    line-height: 30px;
  }
  h4 {
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
  h3 {
    font-size: 16px;
    position: relative;
    span {
      display: inline-block;
      line-height: 42px;
      background: #409eff;
      color: #fff;
      padding: 0 26px;
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
}
</style>
