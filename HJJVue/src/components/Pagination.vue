<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="realPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="paginateObj.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "pagination",
  props: {
    total: {
      type: Number,
    },
  },
  data() {
    return {
      paginateObj: {
        pageNum: 1,
        pageSize: 10,
      },
      realPage: 1,
    };
  },
  created() {},
  methods: {
    handleSizeChange(val) {
      this.paginateObj.pageSize = val;
      this.$emit("paginationChange");
    },
    handleCurrentChange(val) {
      this.realPage = val;
      this.paginateObj.pageNum = val;
      this.$emit("paginationChange");
    },
    setPageSize(pageSize) {
      this.paginateObj.pageSize = pageSize;
    },
    setCurrentPage(currentPage) {
      this.paginateObj.pageNum = currentPage;
      this.realPage = currentPage + 1;
    },
  },
};
</script>

<style>
.el-pagination {
  text-align: right;
  padding-top: 10px;
}
</style>
