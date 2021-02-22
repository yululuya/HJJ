<template>
  <section class="mapSection">
    <div class="mapBox">
      <!--   <el-form :model="queryParams" ref="queryForm" :inline="true" class="searchBox">
        <el-form-item label="关键字" prop="key">
          <el-select
            v-model="queryParams.key"
            placeholder="请选择查询关键字"
            clearable
            size="small"
            style="width: 160px"
          >
            <el-option label="地面宽带网" value="0"></el-option>
            <el-option label="CCTV" value="1"></el-option>
            <el-option label="VSAT" value="2"></el-option>
            <el-option label="CMACast" value="3"></el-option>
            <el-option label="中星" value="3"></el-option>
            <el-option label="北斗" value="3"></el-option>
            <el-option label="民方引接" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input size="small" v-model="queryParams.value"></el-input>
        </el-form-item>
      </el-form>-->
      <!--  <div class="switchBox">
        <el-switch
          @change="changeLine"
          v-model="switchValue"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </div>-->

      <div id="map"></div>
    </div>
  </section>
</template>

<script>
import XLSX from "xlsx";
export default {
  name: "index",
  data() {
    return {
      // windowhost: process.env.VUE_APP_EXCEL_API,
      windowhost: "http://" + document.location.host + "/excel/",
      queryParams: {},
      switchValue: true,
      lmap: null, //地图
    };
  },
  mounted() {
    this.initMap();
    this.readWorkbookFromRemoteFile(this.windowhost + "网络链接.xlsx");
  },
  created() {},
  methods: {
    // 初始化地图
    initMap() {
      var map = L.map("map", {
        maxZoom: 11,
        doubleClickZoom: false, //禁止双击放大地图
        logoControl: false,
        attributionControl: false,
        drawPolyline: true,
        zoomSnap: 1,
      }).setView([39.9788, 116.30226], 4);
      L.tileLayer(
        "http://127.0.0.1:8082/service/v1/tile?map=arcgis1&x={x}&y={y}&z={z}"
      ).addTo(map);
      this.lmap = map;
    },
    initCharts(echartsData) {
      var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
      var color = ["#a6c84c", "#46bee9", "#ffa022"];
      var firstLine = [];
      var secondLine = [];
      var thirdLine = [];
      echartsData.forEach((item) => {
        let obj = {
          fromName: item.fromName,
          toName: item.toName,
          coords: [
            [item.fromLon, item.fromLat],
            [item.toLon, item.toLat],
          ],
        };
        if (item.type == 1) {
          firstLine.push(obj);
        } else if (item.type == 2) {
          secondLine.push(obj);
        } else if (item.type == 3) {
          thirdLine.push(obj);
        }
      });
      console.log(firstLine);
      var series = [];
      [
        ["一级带宽", firstLine],
        ["二级带宽", secondLine],
        ["三级带宽", thirdLine],
      ].forEach(function (item, i) {
        series.push(
          {
            name: item[0],
            type: "lines",
            coordinateSystem: "leaflet",
            zlevel: 1,
            effect: {
              show: false,
              period: 6,
              trailLength: 0.7, //特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
              color: "#fff",
              symbolSize: 3,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 0,
                curveness: 0.2,
              },
            },
            data: item[1],
          },
          {
            name: item[0],
            type: "lines",
            coordinateSystem: "leaflet",
            zlevel: 2,
            symbol: ["none", "arrow"],
            symbolSize: 10,
            effect: {
              show: false,
              period: 6,
              trailLength: 0,
              symbol: "arrow",
              symbolSize: 10,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 1,
                opacity: 0.6,
                curveness: 0.2,
              },
            },
            data: item[1],
          },
          {
            name: item[0],
            type: "effectScatter",
            coordinateSystem: "leaflet",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}",
              },
            },
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: color[i],
              },
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem.toName,
                value: dataItem.coords[1],
              };
            }),
          }
          /*   {
            name: "北斗",
            type: "effectScatter",
            coordinateSystem: "leaflet",
            data: [{ name: "蓬莱", value: [120.75, 37.8, 50] }],
            symbolSize: function (val) {
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true,
                color: "#577ceb",
              },
            },
            itemStyle: {
              normal: {
                color: "#577ceb",
                shadowBlur: 10,
                shadowColor: "#577ceb",
              },
            },
            zlevel: 1,
          } */
        );
      });

      var option = {
        title: {
          text: "网络链接",

          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            if (params.seriesType == "effectScatter") {
              return params.name + ":" + params.seriesName;
            } else {
              return (
                params.data.fromName +
                " " +
                params.data.toName +
                ":" +
                params.seriesName
              );
            }
          },
        },
        legend: {
          orient: "vertical",
          top: "top",
          left: "right",
          data: ["一级带宽", "二级带宽", "三级带宽"],
          textStyle: {
            color: "#fff",
          },
          selectedMode: "multiple",
          backgroundColor: "rgba(128, 128, 128, 0.5)",
        },

        series: series,
      };
      L.supermap.echartsLayer(option).addTo(this.lmap);
    },

    // 前端读取excel表格
    readWorkbookFromRemoteFile(url) {
      const that = this;
      var xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function (e) {
        if (xhr.status == 200) {
          var bytes = new Uint8Array(xhr.response);
          var length = bytes.byteLength;
          var binary = "";
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          // 接下来就是xlsx了，具体可看api
          let wb = XLSX.read(binary, {
            type: "binary",
          });
          let outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          // that.pointDataAll = outdata;
          that.initCharts(outdata);
        }
      };
      xhr.send();
    },
  },
};
</script>
<style lang="scss">
.mapSection {
  height: 100%;
  display: flex;
  .searchBox {
    position: absolute;
    position: absolute;
    z-index: 1500;
    left: 50px;
    background: #f1f4f7;
    padding: 12px;
    border-radius: 4px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .mapBox {
    width: 100%;
    position: relative;
    .btnBox {
      position: absolute;
      top: 10px;
      left: 50px;
      z-index: 1500;
    }
    .asideBox {
      position: absolute;
      bottom: 10px;
      right: 0;
      z-index: 1500;
      bottom: 20;
    }
    .switchBox {
      position: absolute;
      right: 0;
      z-index: 1500;
      top: 10px;
    }
    .leaflet-container .leaflet-control-attribution {
      display: none;
    }
    #map {
      width: 100%;
      height: 100%;
    }
  }
  .el-table {
    font-size: 12px;
  }
  .custom-color-icon {
    img {
      width: 100%;
    }
  }
}
</style>
