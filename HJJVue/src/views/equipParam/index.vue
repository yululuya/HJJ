<template>
  <div class="equipParamTemplate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>装备参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      class="queryBox"
    >
      <el-form-item label="名称型号:">
        <el-input
          clearable
          size="small"
          v-model="queryParams.name"
          placeholder="请输入名称型号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          @click="handleQuery('search')"
          icon="el-icon-search"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-row class="toolBar">
      <el-col style="display: flex">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="handleDialog"
          >新增</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="deleteList"
          icon="el-icon-delete"
          >删除</el-button
        >
        <el-upload
          class="upload-demo"
          action="http://127.0.0.1:9999/parameter/upload"
          :on-success="upFileSuccess"
          :multiple="true"
        >
          <el-button
            size="small"
            icon="el-icon-upload2"
            type="success"
            @click="uploadFiles"
            >批量上传</el-button
          >
        </el-upload>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="50"
        :index="table_index"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="装备名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="component"
        label="组成"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="qualifcation"
        :show-overflow-tooltip="true"
        label="技术指标"
      ></el-table-column>
      <el-table-column prop="manufacturer" label="生产厂家"></el-table-column>
      <el-table-column
        prop="organization"
        label="军队建设单位"
      ></el-table-column>
      <el-table-column prop="model" label="名称型号">
        <template slot-scope="scope">
          <span
            @click="goPage(scope.row.details)"
            style="color: #66b1ff; cursor: pointer"
            >{{ scope.row.model }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="time" label="定型时间"></el-table-column>
      <el-table-column prop="model" label="操作" width="80">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            type="text"
            @click="handleDialog(scope.row, scope.row.details)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="dataTotal"
      ref="pagination"
      @paginationChange="paginationChange"
    ></Pagination>

    <!-- 弹窗-->
    <el-dialog
      width="60%"
      :close-on-click-modal="false"
      :title="dialogTitle"
      :visible.sync="visibleDialog"
      top="5vh"
    >
      <el-form
        :model="msgFormDialog"
        :rules="baseFormRules"
        ref="fromRef"
        label-width="120px"
      >
        <el-form-item prop="name" label="装备名称:">
          <el-input clearable size="small" v-model="msgFormDialog.name" />
        </el-form-item>
        <el-form-item prop="component" label="组成:">
          <el-input clearable size="small" v-model="msgFormDialog.component" />
        </el-form-item>
        <el-form-item prop="qualifcation" label="技术指标:">
          <el-input
            clearable
            size="small"
            v-model="msgFormDialog.qualifcation"
          />
        </el-form-item>
        <el-form-item prop="manufacturer" label="生产厂家:">
          <el-input
            clearable
            size="small"
            v-model="msgFormDialog.manufacturer"
          />
        </el-form-item>
        <el-form-item prop="organization" label="军队建设单位:">
          <el-input
            clearable
            size="small"
            v-model="msgFormDialog.organization"
          />
        </el-form-item>
        <el-form-item prop="model" label="名称型号:">
          <el-input clearable size="small" v-model="msgFormDialog.model" />
        </el-form-item>
        <el-form-item prop="time" label="定型日期:">
          <el-date-picker
            size="small"
            v-model="msgFormDialog.time"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="图片:">
          <el-upload
            class="avatar-uploader"
            :action="actionUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="imgsrcFlag || msgFormDialog.details.imgsrc"
              :src="msgFormDialog.details.imgsrc"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述:">
          <el-input
            clearable
            size="small"
            v-model="msgFormDialog.details.summary"
          />
        </el-form-item>
        <el-form-item label="气象站特点:">
          <div
            class="itemBox"
            v-for="(item, index) in msgFormDialog.details.characteristicList"
            :key="index"
          >
            <el-input
              class="hasIcon"
              clearable
              size="small"
              v-model="msgFormDialog.details.characteristicList[index]"
            />
            <div class="handleIconBox">
              <i class="el-icon-circle-plus" @click="AddCList"></i>
              <i
                class="el-icon-remove"
                v-if="index > 0"
                @click="deleteClist(index)"
              ></i>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="基本气象要素:">
          <p
            @click="addEList"
            class="alertP"
            v-show="
              !msgFormDialog.details.elementlist ||
              msgFormDialog.details.elementlist.length == 0
            "
          >
            添加基本气象要素
          </p>
          <el-table
            v-show="
              msgFormDialog.details.elementlist &&
              msgFormDialog.details.elementlist.length > 0
            "
            :data="msgFormDialog.details.elementlist"
            style="width: 100%"
            border
          >
            <el-table-column prop="name" label="要素名">
              <template slot-scope="scope">
                <el-input clearable size="small" v-model="scope.row.name" />
              </template>
            </el-table-column>
            <el-table-column prop="limits" label="范围">
              <template slot-scope="scope">
                <el-input clearable size="small" v-model="scope.row.limits" />
              </template>
            </el-table-column>
            <el-table-column prop="accuracy" label="精度">
              <template slot-scope="scope">
                <el-input clearable size="small" v-model="scope.row.accuracy" />
              </template>
            </el-table-column>
            <el-table-column prop="model" label="操作" width="160">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-circle-plus"
                  type="text"
                  size="small"
                  @click="addEList"
                  >添加</el-button
                >
                <el-button
                  style="color: #f56c6c"
                  icon="el-icon-remove"
                  type="text"
                  size="small"
                  @click="deleteEList(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="trueDialog('fromRef')"
          >确 定</el-button
        >
        <el-button @click="visibleDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//分页组件
import Pagination from "@/components/Pagination";
import { interfaceObj } from "@/urlConfig.js";
export default {
  name: "equipParamTemplate",
  components: { Pagination },
  data() {
    return {
      imgsrcFlag: false,
      actionUrl: interfaceObj.uploadImg,
      uploadFileUrl: interfaceObj.uploadFile,
      tableData: [],
      dataTotal: 1,
      queryParams: {
        name: "",
        pageNum: 1,
        pageSize: 10,
      },
      dialogVisible: false,
      options: [],
      dialogTitle: "",
      visibleDialog: false,
      msgFormDialog: {
        details: {
          characteristicList: [""],
          elementlist: [
            {
              name: "",
              limits: "",
              accuracy: "",
            },
          ],
        },
      },
      baseFormRules: {
        name: [{ required: true, message: "请输入装备名称 ", trigger: "blur" }],
        summary: [{ required: true, message: "请输入描述 ", trigger: "blur" }],
      },
      multipleSelection: [],
    };
  },
  watch: {},
  created() {
    console.log(this.actionUrl);
    this.handleQuery();
  },
  methods: {
    uploadFiles() {
      /* this.$nextTick(() => {
        document.getElementsByClassName(
          "el-upload__input"
        )[0].webkitdirectory = true;
      }); */
    },
    upFileSuccess() {
      this.handleQuery("search");
    },
    deleteList() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择一条数据",
          type: "error",
        });
      } else {
        let ids = [];
        this.multipleSelection.forEach((element) => {
          ids.push(element.parameterID);
        });
        this.axios
          .get(interfaceObj.deleteIdsPar, {
            params: { s: ids.join(",") },
          })
          .then((res) => {
            if (res.data.status == 200) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.handleQuery();
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
          });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAvatarSuccess(res, file) {
      this.imgsrcFlag = true;
      this.msgFormDialog.details.imgsrc = res.data;
      console.log(this.msgFormDialog.details.imgsrc);
      this.$message({
        message: "上传成功",
        type: "success",
      });
    },
    beforeAvatarUpload(file) {
      /*  const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是 JPG或PNG 格式!");
      }
      return isJPG && isPNG; */
    },
    AddCList() {
      this.msgFormDialog.details.characteristicList.push("");
    },
    deleteClist(index) {
      this.msgFormDialog.details.characteristicList.splice(index, 1);
    },
    addEList() {
      this.msgFormDialog.details.elementlist.push({
        name: "",
        limits: "",
        accuracy: "",
      });
      console.log(this.msgFormDialog.details);
    },
    deleteEList(row) {
      var index = this.msgFormDialog.details.elementlist.indexOf(row);
      this.msgFormDialog.details.elementlist.splice(index, 1);
    },
    // table自增定义方法
    table_index(index) {
      return (
        (this.queryParams.pageNum - 1) * this.queryParams.pageSize + index + 1
      );
    },
    handleQuery(search) {
      if (search) {
        this.queryParams.pageNum = 1;
      }
      this.axios
        .get(interfaceObj.getListPage, {
          params: this.queryParams,
        })
        .then((res) => {
          this.tableData = res.data.data.list;
          this.dataTotal = res.data.data.count;
        });
    },
    goPage(details) {
      this.$router.push({
        name: "装备介绍",
        params: { details: details },
      });
    },
    // 分页事件
    paginationChange() {
      let paginateObj = this.$refs.pagination.paginateObj;
      this.queryParams = { ...this.queryParams, ...paginateObj };
      this.handleQuery();
    },
    handleDialog(row, details) {
      if (details) {
        this.dialogTitle = "编辑";
        this.msgFormDialog = row;
        if (
          !details.characteristicList ||
          details.characteristicList.length == 0
        ) {
          details.characteristicList = [""];
        }
        this.msgFormDialog.details = details;
      } else {
        this.dialogTitle = "新增";
        this.msgFormDialog = {
          details: {
            characteristicList: [""],
            elementlist: [],
          },
        };
      }

      this.visibleDialog = true;
    },
    trueDialog(formName) {
      let url = "";
      if (this.dialogTitle == "新增") {
        url = interfaceObj.addPar;
      } else {
        url = interfaceObj.updatePar;
      }
      this.msgFormDialog.details.characteristicList.forEach(
        (element, index) => {
          if (element == "") {
            this.msgFormDialog.details.characteristicList.splice(index, 1);
          }
        }
      );
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post(url, this.msgFormDialog).then((res) => {
            if (res.data.status == 200) {
              this.$message({
                message: this.dialogTitle + "成功",
                type: "success",
              });
              this.visibleDialog = false;
              this.handleQuery();
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.equipParamTemplate {
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
  .cell a {
    color: #66b1ff;
    text-decoration: none;
  }
}
.el-tooltip__popper {
  max-width: 200px;
}
.itemBox {
  position: relative;
}
.hasIcon.el-input {
  width: 80%;
}
.handleIconBox {
  position: absolute;
  right: 0;
  top: 0;
  color: #409eff;
  cursor: pointer;
  font-size: 20px;
  i.el-icon-remove {
    color: #f56c6c;
    margin-left: 4px;
  }
}
.alertP {
  padding: 8px 16px;
  margin: 0;
  background-color: #f0f9eb;
  color: #67c23a;
  cursor: pointer;
  line-height: 24px;
  border-radius: 4px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upload-demo {
  margin-left: 10px;
  .el-upload-list {
    display: none !important;
  }
}
</style>
