<template>
  <div class="targetResultTem">
    <div id="map"></div>

    <div class="stationInfoBox" v-if="showDetail">
      <p class="title">
        详情<span
          class="close el-icon-close"
          @click="showDetail = false"
        ></span>
      </p>
      <el-scrollbar>
        <el-row>
          <el-col :span="6">
            <div><span>站号：</span>{{ detailObj.V01301 }}</div>
          </el-col>
          <el-col :span="6">
            <div><span>站名：</span>{{ detailObj.STATIONNAME }}</div>
          </el-col>
          <el-col :span="6">
            <div><span>经度：</span>{{ detailObj.V06001 }}</div>
          </el-col>
          <el-col :span="6">
            <div><span>纬度：</span>{{ detailObj.V05001 }}</div>
          </el-col>
          <el-col :span="24">
            <div><span>简介：</span>{{ detailObj.STATIONTITLE }}</div>
          </el-col>
          <el-col :span="24" style="margin: 10px 0">
            <div><span>各气象要素特点如下：</span></div>
          </el-col>

          <el-table :data="detailObj.ELELIST" style="width: 100%" border>
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="dictLable"
              label="要素"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="distValue"
              label="要素简介"
            ></el-table-column>
          </el-table>
        </el-row>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
//分页组件
export default {
  name: "targetResultTem",
  data() {
    return {
      showDetail: false,
      windowhost: "http://" + document.location.host + "/jsonByExcel/",
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

        that.axios.get(that.windowhost + "目标成果.json").then((res) => {
          that.mapPointAll = res.data;
          that.pointDataAll = res.data;

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

          if (Obj.V01301) {
            puphtml += "<li><span>站号：</span>" + Obj.V01301 + "</li>";
          }
          if (Obj.STATIONNAME) {
            puphtml += "<li><span>站名：</span>" + Obj.STATIONNAME + "</li>";
          }
          if (Obj.V07001) {
            puphtml += "<li><span>高度：</span>" + Obj.V07001 + "</li>";
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
        if (e.features[0].properties) {
          that.showDetail = true;
          e.features[0].properties.ELELIST = JSON.parse(
            e.features[0].properties.ELELIST
          );
          that.detailObj = e.features[0].properties;
          console.log(that.detailObj);
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.targetResultTem {
  height: 100%;
  #map {
    width: 100%;
    height: 100%;
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
  .mapboxgl-popup-content ul span {
    width: 40px;
  }
  .el-scrollbar {
    height: 300px;
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .el-table td:last-child {
    text-align: left;
  }
}
</style>
