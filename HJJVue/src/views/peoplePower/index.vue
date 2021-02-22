<template>
  <div class="peoplePowerTem">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部队分布</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="peoplePowerBox">
      <div class="left">
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
              clearable
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
            <td>统计</td>
            <td>{{ this.allNumTotal }}</td>
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
        >
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column
            type="index"
            label="序号"
            width="50"
            :index="table_index"
          ></el-table-column>
          <el-table-column
            prop="properties.area"
            label="战区"
          ></el-table-column>
          <el-table-column
            prop="properties.unitType"
            label="军种"
          ></el-table-column>
          <el-table-column
            prop="properties.corpsType"
            label="部队类型"
          ></el-table-column>
          <el-table-column prop="PROVINCE" label="省市县">
            <template slot-scope="scope">
              <span v-if="scope.row.properties.PROVINCE"
                >{{ scope.row.properties.PROVINCE }}-</span
              >
              <span v-if="scope.row.properties.CITY"
                >{{ scope.row.properties.CITY }}-</span
              >
              <span v-if="scope.row.properties.COUNTY">{{
                scope.row.properties.COUNTY
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="properties.msg"
            label="描述信息"
          ></el-table-column>
          <el-table-column
            width="70"
            prop="properties.num"
            label="数量(人)"
          ></el-table-column>
          <el-table-column prop="" label="操作" width="60">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="viewCell(scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <Pagination
          :total="dataTotal"
          ref="pagination"
          @paginationChange="paginationChange"
        ></Pagination>
      </div>
      <div class="right" id="map"></div>

      <div class="stationInfoBox" v-if="showDetail">
        <p class="title">
          详情<span
            class="close el-icon-close"
            @click="showDetail = false"
          ></span>
        </p>
        <el-row>
          <el-col :span="8">
            <div><span>战区：</span>{{ detailObj.area }}</div>
          </el-col>
          <el-col :span="8">
            <div><span>军种：</span>{{ detailObj.unitType }}</div>
          </el-col>
          <el-col :span="12">
            <div><span>详细类型：</span>{{ detailObj.corpsType }}</div>
          </el-col>
          <el-col :span="20">
            <div>
              <span>位置：</span>{{ detailObj.COUNTRY }}-{{
                detailObj.PROVINCE
              }}-{{ detailObj.CITY }}-{{ detailObj.COUNTY }}
            </div>
          </el-col>
          <el-col :span="4">
            <div><span>数量：</span>{{ detailObj.num }}</div>
          </el-col>
          <el-col :span="24">
            <div><span>描述信息：</span>{{ detailObj.msg }}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
//分页组件
import Pagination from "@/components/Pagination";
export default {
  name: "peoplePowerTem",
  components: { Pagination },
  data() {
    return {
      allNumTotal: 0,
      showDetail: false,
      windowhost: "http://" + document.location.host + "/jsonByExcel/",
      tableData: [],
      dataTotal: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      options: [
        { label: "战区", value: "area" },
        { label: "军种", value: "unitType" },
      ],
      detailObj: {},
      lmap: null,
      mapPointAll: null,
      pointDataAll: null, //存储所有地图站点
      popup: null,
    };
  },
  created() {},
  mounted() {
    this.initMethods();
  },
  methods: {
    viewCell(row) {
      console.log(row);
      this.showDetail = true;
      this.detailObj = row.properties;
      this.lmap.setCenter(row.geometry.coordinates);
    },
    // table自增定义方法
    table_index(index) {
      return (
        (this.queryParams.pageNum - 1) * this.queryParams.pageSize + index + 1
      );
    },
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        keyWords: "",
        KeyLabel: "",
      };
      this.mapPointAll = this.pointDataAll;
      this.tableData = this.pointDataAll.features;
      this.dataTotal = this.tableData.length;
      let oldlayer = this.lmap.getLayer("tuceng1");
      if (oldlayer) {
        this.lmap.remove(oldlayer);
      }
      var icon = new PIE.ClusterPointLayer({
        id: "tuceng1",
        data: this.mapPointAll,
        color: "#238443",
        opacity: 0.7,
      });
      this.lmap.add(icon);
    },
    handleQuery() {
      this.showDetail = false;
      this.queryParams.pageNum = 1;
      let dataList = [];
      this.pointDataAll.features.forEach((element) => {
        if (
          element["properties"][this.queryParams.KeyLabel] ==
          this.queryParams.keyWords
        ) {
          dataList.push(element);
        }
      });
      this.mapPointAll = {
        type: "FeatureCollection",
        features: dataList,
      };
      this.tableData = dataList;
      let oldlayer = this.lmap.getLayer("tuceng1");
      if (oldlayer) {
        this.lmap.remove(oldlayer);
      }
      var icon = new PIE.ClusterPointLayer({
        id: "tuceng1",
        data: this.mapPointAll,
        color: "#238443",
        opacity: 0.7,
      });
      this.lmap.add(icon);
    },
    initMethods() {
      let info = document.getElementById("map");
      info.oncontextmenu = function (e) {
        return false;
      };
      // 地图
      const map = new PIE.Map({
        type: 1,
      });
      var url = window.location.href.substr(
        0,
        window.location.href.indexOf(window.location.hash)
      );
      url = url.substr(0, url.lastIndexOf("/")) + "/map/allweather";
      let view = new PIE.MapView({
        map: map,
        container: "map",
        zoom: 3.5,
        sprite: url,
        //glyphs: "static/fonts/{fontstack}/{range}.pbf",
        center: [109.30226, 37.9788],
      });
      let that = this;
      this.lmap = map;
      this.lmap.map.setMaxBounds([
        [-180, -85.1],
        [180, 85.1],
      ]); //地图范围
      map.on("load", function () {
        const vectorTileLayer1 = new PIE.GridTileLayer({
          url:
            "http://127.0.0.1:8082/service/v1/tile?map=arcgis1&x={x}&y={y}&z={z}",
          id: "baseMapLayer",
        });
        map.add(vectorTileLayer1);
        console.time("请求");

        that.axios.get(that.windowhost + "部队分布.json").then((res) => {
          that.mapPointAll = res.data;
          that.pointDataAll = res.data;
          that.tableData = res.data.features;
          that.dataTotal = that.tableData.length;
          var icon = new PIE.ClusterPointLayer({
            id: "tuceng1",
            data: that.mapPointAll,
            color: "#238443",
            opacity: 0.7,
          });
          map.add(icon);
        });
      });

      const popup1 = new mapboxgl.Popup({
        anchor: "left",
        className: "pupclass",
        closeButton: false,
      });
      that.popup = popup1;
      map.on("mouseenter", "tuceng1", function (e) {
        const clickPoint = e.lngLat;
        let puphtml = "<p>";
        if (e.features[0].properties) {
          puphtml = puphtml + "详情" + "</p><ul>";
          let Obj = e.features[0].properties;
          if (Obj.area) {
            puphtml += "<li><span>战区：</span>" + Obj.area + "</li>";
          }
          if (Obj.unitType) {
            puphtml += "<li><span>军种：</span>" + Obj.unitType + "</li>";
          }

          if (Obj.corpsType) {
            puphtml += "<li><span>详细类型：</span>" + Obj.corpsType + "</li>";
          }
          if (Obj.PROVINCE) {
            puphtml += "<li><span>省：</span>" + Obj.PROVINCE + "</li>";
          }
          if (Obj.CITY) {
            puphtml += "<li><span>市：</span>" + Obj.CITY + "</li>";
          }
          if (Obj.COUNTY) {
            puphtml += "<li><span>县：</span>" + Obj.COUNTY + "</li>";
          }
          puphtml = puphtml + "</ul>";
        }
        that.popup.remove();
        that.popup.setLngLat(clickPoint).setHTML(puphtml).addTo(that.lmap.map);
      });
      map.on("mouseleave", "tuceng1", function (e) {
        that.popup.remove();
      });
      map.on("click", "tuceng1", function (e) {
        console.log(e);
        if (e.features[0].properties) {
          that.showDetail = true;
          that.detailObj = e.features[0].properties;
        }
      });
    },
    // 分页事件
    paginationChange() {
      let paginateObj = this.$refs.pagination.paginateObj;
      this.queryParams = { ...this.queryParams, ...paginateObj };
    },
  },
  watch: {
    tableData: function () {
      this.$nextTick(function () {
        /*现在数据已经渲染完毕*/
        this.tableData.forEach((element) => {
          this.allNumTotal += +element.properties.num;
        });
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.peoplePowerTem {
  padding: 20px;
  .peoplePowerBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .right,
  .left {
    width: 49.5%;
    height: calc(100vh - 170px);
  }

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
</style>
