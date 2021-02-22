<template>
  <div class="equipPowerTemplate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>装备实力</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      class="queryBox"
    >
      <el-form-item label="关键字:">
        <el-select size="small" v-model="queryParams.KeyLabel" filterable>
          <el-option label="全部" value></el-option>
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          size="small"
          v-model="queryParams.keyWords"
          placeholder="请输入关键字"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          size="small"
          type="primary"
          @click="handleQuery"
          icon="el-icon-search"
          >查询</el-button
        >
        <el-button size="small" @click="resetQuery" icon="el-icon-refresh"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <table
      class="el-table el-table--border totalTable"
      style="width: 30%; margin-bottom: 12px"
    >
      <tr>
        <td>总数</td>
        <td>{{ this.allNumTotal }}</td>
        <td>装备不同型号数</td>
        <td>{{ this.allmodelNum }}</td>
      </tr>
    </table>
    <el-table
      :data="
        tableData.slice(
          (queryParams.pageNum - 1) * queryParams.pageSize,
          queryParams.pageNum * queryParams.pageSize
        )
      "
      style="width: 100%"
      border
      show-summary
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="50"
        :index="table_index"
      ></el-table-column>
      <el-table-column prop="unit" label="单位" width="180"></el-table-column>
      <el-table-column
        prop="type"
        label="装备类型"
        width="180"
      ></el-table-column>
      <el-table-column prop="allNum" label="总数"></el-table-column>
      <el-table-column prop="modelNum" label="装备不同型号数"></el-table-column>
      <el-table-column prop="code" label="字段"></el-table-column>
      <el-table-column prop="property" label="属性"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
    </el-table>
    <Pagination
      :total="dataTotal"
      ref="pagination"
      @paginationChange="paginationChange"
    ></Pagination>
  </div>
</template>

<script>
//分页组件
import Pagination from "@/components/Pagination";
export default {
  name: "equipPowerTemplate",
  components: { Pagination },
  data() {
    return {
      windowhost: "http://" + document.location.host + "/jsonByExcel/",
      fileList: [],
      tableData: [],
      dataTotal: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        KeyLabel: "",
        keyWords: "",
      },
      dialogVisible: false,
      options: [
        { label: "单位", value: "unit" },
        { label: "装备类型", value: "type" },
        { label: "字段", value: "code" },
        { label: "属性", value: "property" },
        { label: "状态", value: "status" },
      ],
      xlsxTableData: [],
      allNumTotal: 0,
      allmodelNum: 0,
    };
  },
  watch: {},
  created() {
    this.readWorkbookFromRemoteFile(this.windowhost + "装备实力.json");
  },
  methods: {
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        KeyLabel: "",
        keyWords: "",
      };
      this.getList(this.xlsxTableData);
    },
    // table自增定义方法
    table_index(index) {
      return (
        (this.queryParams.pageNum - 1) * this.queryParams.pageSize + index + 1
      );
    },
    handleQuery() {
      this.queryParams.pageNum = 1;
      let data = [];
      this.xlsxTableData.forEach((element) => {
        if (element[this.queryParams.KeyLabel] == this.queryParams.keyWords) {
          data.push(element);
        }
      });
      this.getList(data);
    },
    getList(data) {
      this.tableData = data;
      this.dataTotal = data.length;
      this.allNumTotal = 0;
      this.allmodelNum = 0;
      this.tableData.forEach((element) => {
        this.allNumTotal += element.allNum;
        this.allmodelNum += element.modelNum;
      });
    },
    // 分页事件
    paginationChange() {
      let paginateObj = this.$refs.pagination.paginateObj;
      this.queryParams = { ...this.queryParams, ...paginateObj };
    },
    readWorkbookFromRemoteFile(url) {
      this.axios.get(url).then((res) => {
        this.xlsxTableData = res.data;
        // that.pointDataAll = outdata;
        this.getList(res.data);
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.equipPowerTemplate {
  padding: 20px;
  .queryBox {
    padding: 10px;
    background: #fff;
    border: 1px solid ebeef5;
    margin-bottom: 20px;
    position: relative;
  }
  .queryBox::before {
    content: "";
    width: 3px;
    height: 100%;
    background: #409eff;
    position: absolute;
    top: 0;
    left: -2px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }
  .queryBox {
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .toolBar {
    margin-bottom: 20px;
  }
  .totalTable td {
    border-bottom: none;
  }
}
</style>
