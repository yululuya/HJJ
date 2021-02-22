<template>
  <section class="mapSectionHome">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="menuBox">
        <h4>内容选择</h4>
        <!-- surf 是地面  rada 是雷达  upar是高空 ocen是海洋 -->
        <div class="leftAside">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            background-color="#f1f4f7"
            text-color="#333"
            active-text-color="#fff"
          >
            <el-submenu index="1">
              <template slot="title">
                <span>站点观测</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="1-1"
                  @click="handleSelect('1-1', '地面气象站')"
                >
                  <i class="menuIcon menuIcon0"></i> 地面气象站
                </el-menu-item>
                <el-menu-item
                  index="1-2"
                  @click="handleSelect('1-2', '高空气象站')"
                >
                  <i class="menuIcon menuIcon1"></i> 高空气象站
                </el-menu-item>
                <el-menu-item
                  index="1-3"
                  @click="handleSelect('1-3', '海洋自动站')"
                >
                  <i class="menuIcon menuIcon4"></i> 海洋自动站
                </el-menu-item>
                <el-menu-item
                  index="1-4"
                  @click="handleSelect('1-4', '海洋浮标')"
                >
                  <i class="menuIcon menuIcon5"></i> 海洋浮标
                </el-menu-item>
                <el-menu-item
                  index="1-5"
                  @click="handleSelect('1-5', '陆地水文')"
                >
                  <i class="menuIcon menuIcon7"></i> 陆地水文
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <span>雷达观测</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="2-1"
                  @click="handleSelect('2-1', '天气雷达')"
                >
                  <i class="menuIcon menuIcon2"></i> 天气雷达
                </el-menu-item>
                <el-menu-item
                  index="2-2"
                  @click="handleSelect('2-2', '测风雷达')"
                >
                  <i class="menuIcon menuIcon3"></i> 测风雷达
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3" @click="goSatellite">
              <i class="menuIcon menuIcon0"></i> 卫星观测
            </el-menu-item>
            <!-- <el-menu-item index="4" @click="showCesium">
              <i class="menuIcon menuIcon0"></i> 空间环境观测
            </el-menu-item> -->
            <el-menu-item index="5" @click="handleSelect('5', '城镇预报')">
              <i class="menuIcon menuIcon6"></i> 城镇预报
            </el-menu-item>
          </el-menu>
        </div>

        <h4>区域选择</h4>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="按战区" name="1">
            <p
              v-for="(item, index) in zhanquList"
              :key="index"
              v-bind:class="{ active: clickActive == item.distLabel }"
              @click="areaClick(item.provinceList, item.distLabel)"
            >
              {{ item.distLabel }}
            </p>
          </el-collapse-item>
          <el-collapse-item title="按国家" name="2">
            <el-select
              filterable
              size="mini"
              v-model="countryValue"
              placeholder="请选择"
              @change="choseCountry"
              multiple
            >
              <el-option
                v-for="item in countries"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-collapse-item>
          <el-collapse-item title="按区域" name="3">
            <p
              v-for="(item, index) in areaList"
              :key="index"
              v-bind:class="{ active: areaclickActive == item.distLabel }"
              @click="regionClick(item.distValue, item.distLabel)"
            >
              {{ item.distLabel }}
            </p>
          </el-collapse-item>
        </el-collapse>
        <h4>站点查询</h4>
        <el-input
          size="mini"
          v-model="stationValue"
          placeholder="请输入内容"
          style="width: 90%; margin: auto; display: block"
          @keyup.enter.native="stationSearch"
        ></el-input>
      </div>
    </el-scrollbar>
    <div class="mapBox">
      <el-button-group class="btnBox">
        <el-button
          v-if="mapType == '三维'"
          type="primary"
          size="small"
          @click="setDrraw(1)"
          >框选</el-button
        >
        <el-button
          v-if="mapType == '三维'"
          type="primary"
          size="small"
          @click="setDrraw(2)"
          >画圆</el-button
        >
        <el-button
          v-if="mapType == '三维'"
          type="primary"
          size="small"
          @click="distanceDrraw"
          >测距</el-button
        >

        <el-button
          v-if="
            mapType == '三维' &&
            (selementElement == '地面气象站' ||
              selementElement == '天气雷达' ||
              selementElement == '测风雷达')
          "
          type="primary"
          size="small"
          @click="changeRadiationType"
          >范围</el-button
        >
        <el-button
          v-if="mapType == '三维'"
          type="primary"
          size="small"
          @click="removeDrraw"
          >清空</el-button
        >
        <el-button
          v-if="mapType == '三维'"
          type="primary"
          size="small"
          @click="downloadGeoJson"
          >下载</el-button
        >
        <el-button type="primary" size="small" @click="showCesium">{{
          mapType
        }}</el-button>
      </el-button-group>

      <div class="asideBox" v-show="mapType == '三维'">
        <!-- 导出 -->
        <div class="iconBox">
          <el-tooltip
            class="item"
            effect="dark"
            content="导出"
            placement="left-start"
          >
            <el-button
              icon="el-icon-download"
              circle
              @click="handleExport"
            ></el-button>
          </el-tooltip>
        </div>
        <!-- 显示隐藏表格 -->
        <div class="iconBox">
          <el-tooltip
            class="item"
            effect="dark"
            :content="
              toggleIcon == 'el-icon-caret-top' ? '显示表格' : '隐藏表格'
            "
            placement="left-start"
          >
            <el-button
              :icon="toggleIcon"
              circle
              @click="toggleTable"
            ></el-button>
          </el-tooltip>
        </div>
        <p class="allSattionNum">总站数：{{ tableData.length }}站</p>
        <div
          v-if="toggleIcon == 'el-icon-caret-bottom'"
          style="background: #fff; padding-bottom: 4px"
        >
          <el-table
            :data="
              tableData.slice(
                (queryParams.pageNum - 1) * queryParams.pageSize,
                queryParams.pageNum * queryParams.pageSize
              )
            "
            style="width: 100%"
            height="250"
            @current-change="handleCurrentChange"
          >
            <!-- 站号、站名、经纬度、要素、频次、属性（地方、军队、国际） -->
            <el-table-column
              prop="properties.V01301"
              label="站号"
            ></el-table-column>
            <el-table-column
              prop="properties.STATIONAME"
              label="站名"
              width="200"
            ></el-table-column>
            <el-table-column
              prop="geometry.coordinates[1]"
              label="经度"
            ></el-table-column>
            <el-table-column
              prop="geometry.coordinates[0]"
              label="纬度"
            ></el-table-column>
            <el-table-column
              prop="properties.elems"
              label="要素"
              width="200"
              :show-overflow-tooltip="true"
              v-show="this.selementElement == '地面气象站'"
            ></el-table-column>
            <el-table-column
              prop="properties.elems"
              label="要素统计数量"
              width="200"
              :show-overflow-tooltip="true"
              v-show="this.selementElement == '地面气象站'"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.properties.elems.length }}</span>
              </template>
            </el-table-column>
          </el-table>
          <Pagination
            :total="tableData.length"
            ref="pagination"
            @paginationChange="paginationChange"
          ></Pagination>
        </div>
      </div>
      <div id="map"></div>
      <div class="stationInfoBox" v-if="showDetail">
        <p class="title">
          详情<span
            class="close el-icon-close"
            @click="showDetail = false"
          ></span>
        </p>
        <el-row>
          <el-col :span="8">
            <div><span>站号：</span>{{ detailObj.V01301 }}</div>
          </el-col>
          <el-col
            :span="16"
            v-if="detailObj.STATIONNAME || detailObj.STATIONNE"
          >
            <div v-if="detailObj.STATIONNAME">
              <span>站名：</span>{{ detailObj.STATIONNAME }}
            </div>
            <div v-else><span>站名：</span>{{ detailObj.STATIONNE }}</div>
          </el-col>
          <el-col :span="8">
            <div><span>经度：</span>{{ detailObj.V05001 }}</div>
          </el-col>
          <el-col :span="8">
            <div><span>纬度：</span>{{ detailObj.V06001 }}</div>
          </el-col>
          <el-col :span="8" v-if="detailObj.V07001">
            <div><span>高度：</span>{{ detailObj.V07001 }}</div>
          </el-col>
          <el-col :span="8" v-if="detailObj.STATIONTYPE">
            <div><span>站类型：</span>{{ detailObj.STATIONTYPE }}</div>
          </el-col>
          <el-col :span="8" v-if="detailObj.riverName">
            <div><span>河名：</span>{{ detailObj.riverName }}</div>
          </el-col>
          <el-col :span="8" v-if="detailObj.basin">
            <div><span>水系：</span>{{ detailObj.basin }}</div>
          </el-col>
          <el-col :span="8" v-if="detailObj.watershed">
            <div><span>流域：</span>{{ detailObj.watershed }}</div>
          </el-col>
          <el-col :span="8" v-if="detailObj.waterLevel">
            <div><span>报汛等级：</span>{{ detailObj.waterLevel }}</div>
          </el-col>
          <el-col :span="8" v-if="detailObj.creatTime">
            <div><span>建站年月：</span>{{ detailObj.creatTime }}</div>
          </el-col>
          <el-col :span="8" v-if="detailObj.dept">
            <div><span>管理单位：</span>{{ detailObj.dept }}</div>
          </el-col>
          <el-col :span="8" v-if="detailObj.TYPE">
            <div><span>雷达类型：</span>{{ detailObj.TYPE }}</div>
          </el-col>
          <el-col :span="8" v-if="detailObj.FANWEI">
            <div><span>探测范围：</span>{{ detailObj.FANWEI }}</div>
          </el-col>
          <el-col :span="8" v-if="detailObj.V_REGNAME">
            <div><span>区协名称：</span>{{ detailObj.V_REGNAME }}</div>
          </el-col>
          <el-col :span="8" v-if="detailObj.C_CCCCC">
            <div><span>编报中心：</span>{{ detailObj.C_CCCCC }}</div>
          </el-col>
          <el-col :span="8" v-if="detailObj.FORM">
            <div><span>资料来源：</span>{{ detailObj.FORM }}</div>
          </el-col>
          <el-col
            :span="20"
            v-if="
              detailObj.adress ||
              detailObj.COUNTRY ||
              detailObj.PROVINCE ||
              detailObj.CITY ||
              detailObj.COUNTY
            "
          >
            <div>
              <span>位置：</span>
              <i v-if="detailObj.adress"> {{ detailObj.adress }}</i>
              <i v-if="detailObj.COUNTRY"> {{ detailObj.COUNTRY }}</i>
              <i v-if="detailObj.PROVINCE"> -{{ detailObj.PROVINCE }}</i>
              <i v-if="detailObj.CITY">- {{ detailObj.CITY }}</i>
              <i v-if="detailObj.COUNTY"> -{{ detailObj.COUNTY }}</i>
            </div>
          </el-col>
          <el-col :span="24" v-if="detailObj.elems">
            <div><span>要素统计：</span>{{ detailObj.elems.length }}类</div>
          </el-col>
          <el-col :span="24" v-if="detailObj.elems">
            <div><span>要素：</span>{{ detailObj.elems }}</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <loadExcel
      v-if="false"
      @readWorkbookFromRemoteFile="readWorkbookFromRemoteFile"
      ref="loadExcelInfo"
    />
  </section>
</template>

<script>
//分页组件
import Pagination from "@/components/Pagination";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import axios from "axios";
import * as turf from "@turf/turf";
// 高级搜索
import loadExcel from "@/components/upload";
import { Loading } from "element-ui";
var loading;
export default {
  components: { loadExcel, Pagination },
  name: "index",
  data() {
    return {
      clickActive: "",
      areaclickActive: "",
      activeName: 1,
      detailObj: {},
      showDetail: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      radiationType: false,
      mapType: "三维", //二三维转换
      mapFlag: true,
      pointLayer: null,
      windowhost: "http://" + document.location.host + "/jsonByExcel/",
      // windowhost: process.env.VUE_APP_EXCEL_API,
      activeIndex: "1-1",
      menuList: [
        { name: "地面气象站" },
        { name: "高空气象站" },
        { name: "天气雷达" },
        { name: "测风雷达" },
        { name: "海洋自动站" },
        { name: "海洋浮标" },
        { name: "城镇预报" },
        { name: "陆地水文" },
      ],
      areaList: [
        {
          distValue: 8,
          distLabel: "亚太地区",
        },
        {
          distValue: 1,
          distLabel: "I 区协",
        },
        {
          distValue: 2,
          distLabel: "II 区协",
        },
        {
          distValue: 3,
          distLabel: "III 区协",
        },
        {
          distValue: 4,
          distLabel: "IV 区协",
        },
        {
          distValue: 5,
          distLabel: "V 区协",
        },
        {
          distValue: 6,
          distLabel: "VI 区协",
        },
        {
          distValue: "",
          distLabel: "全球",
        },
        {
          distValue: "",
          distLabel: "大洲",
        },
        {
          distValue: "",
          distLabel: "大洋",
        },
      ],
      zhanquList: [
        {
          distValue: "eastList",
          distLabel: "东部战区",
          provinceList: [
            "江苏省",
            "浙江省",
            "安徽省",
            "福建省",
            "江西省",
            "上海市",
          ],
        },
        {
          distValue: "southList",
          distLabel: "南部战区",
          provinceList: [
            "广东省",
            "广西壮族自治区",
            "海南省",
            "云南省",
            "湖南省",
            "贵州省",
          ],
        },
        {
          distValue: "weatList",
          distLabel: "西部战区",
          provinceList: [
            "四川省",
            "甘肃省",
            "宁夏回族自治区",
            "新疆维吾尔自治区",
            "西藏自治区",
            "青海省",
            "重庆市",
          ],
        },
        {
          distValue: "northList",
          distLabel: "北部战区",
          provinceList: [
            "辽宁省",
            "山东省",
            "吉林省",
            "内蒙古自治区",
            "黑龙江省",
          ],
        },
        {
          distValue: "centerList",
          distLabel: "中部战区",
          provinceList: [
            "北京市",
            "天津市",
            "河北省",
            "河南省",
            "陕西省",
            "山西省",
            "湖北省",
          ],
        },
      ],
      selementElement: "地面气象站",
      chartsOption: null,
      tableData: [],
      pointDataAll: null, //地图所有的点
      toggleIcon: "el-icon-caret-top",
      areaSelect: {},
      // 国家选择列出的国家
      countries: [
        "中国",
        "加拿大",
        "俄罗斯(亚洲部分)",
        "澳大利亚",
        "印度",
        "俄罗斯(欧洲部分)",
        "挪威",
        "美国",
        "西班牙",
        "德国",
        "冰岛",
        "芬兰",
        "瑞士和列支顿士登",
        "奥地利",
        "法国",
        "英国",
        "巴西",
        "意大利",
        "泰国",
        "南非",
        "印度尼西亚",
        "阿尔及利亚",
        "南极洲",
        "墨西哥",
        "瑞典",
        "哥伦比亚",
        "哈萨克斯坦",
        "伊朗",
        "日本",
        "阿根廷",
        "智利",
        "蒙古",
        "土耳其",
        "波兰",
        "荷兰",
        "丹麦和法罗群岛",
        "巴基斯坦",
        "韩国",
        "菲律宾",
        "缅甸",
        "厄瓜多尔",
        "新西兰",
        "伊拉克",
        "津巴布韦",
        "克罗地亚",
        "乌克兰",
        "尼日利亚",
        "阿曼",
        "莫桑比克",
        "孟加拉国",
        "捷克",
        "秘鲁",
        "格陵兰",
        "埃及",
        "玻利维亚",
        "葡萄牙",
        "沙特阿拉伯",
        "越南",
        "匈牙利",
        "白俄罗斯",
        "太平洋赤道以北群岛",
        "罗马尼亚",
        "比利时",
        "苏丹",
        "塞尔维亚和马其顿",
        "突尼斯",
        "肯尼亚",
        "朝鲜",
        "塔吉克斯坦",
        "斯洛伐克",
        "马达加斯加",
        "委内瑞拉",
        "摩洛哥",
        "土库曼斯坦",
        "马来西亚",
        "爱沙尼亚",
        "新喀里多尼亚",
        "保加利亚",
        "加纳",
        "斯里兰卡",
        "希腊",
        "利比亚",
        "乌拉圭",
        "前南马其顿",
        "斯洛文尼亚",
        "老挝",
        "巴拉圭",
        "阿塞拜疆",
        "乌兹别克斯坦",
        "刚果民主共和国",
        "科威特",
        "埃塞俄比亚",
        "博茨瓦纳",
        "坦桑尼亚",
        "摩尔多瓦",
        "斐济",
        "尼泊尔",
        "CONGO/刚果",
        "尼日尔",
        "多米尼加共和国",
        "洪都拉斯",
        "波斯尼亚和黑塞哥维那",
        "科特迪瓦",
        "乍得",
        "马里",
        "以色列",
        "美国(阿拉斯加)",
        "巴布亚新几内亚",
        "塞内加尔",
        "阿富汗",
        "几内亚",
        "萨摩亚和美属萨摩亚",
        "乌干达",
        "冈比亚",
        "岛屿(88:800-998)",
        "加蓬",
        "毛里塔尼亚",
        "约旦",
        "阿尔巴尼亚",
        "布基纳法索",
        "法属玻利尼西亚",
        "叙利亚",
        "瓦努阿图",
        "大洋岛",
        "柬埔寨",
        "格鲁吉亚",
        "阿拉伯联合酋长国",
        "多哥",
        "吉尔吉斯斯坦",
        "立陶宛",
        "斯威士兰",
        "拉脱维亚",
        "圭亚那",
        "卡塔尔",
        "马拉维",
        "库克群岛",
        "所罗门群岛",
        "毛里求斯",
        "门的内哥罗",
        "贝宁",
        "危地马拉",
        "中非共和国",
        "索马里",
        "汤加",
        "马尔代夫",
        "法属圭亚那",
        "巴哈马",
        "喀麦隆",
        "瓜德洛普,圣马丁岛,圣巴泰勒米岛和其它邻近法属岛屿",
        "塞浦路斯",
        "安哥拉",
        "哥斯达黎加",
        "马德拉",
        "卢旺达",
        "图瓦卢",
        "基里巴斯",
        "苏里南",
        "科摩罗",
        "古巴",
        "亚美尼亚",
        "牙买加",
        "诺福克岛",
        "佛得角",
        "几内亚-比绍",
        "分散的岛屿(91:753,754)",
        "黎巴嫩",
        "纽埃岛",
        "荷属安德列斯和阿鲁巴",
        "开曼群岛",
        "多米尼加",
        "赤道几内亚",
        "马提尼克岛",
        "波多黎各和美属加勒比海区域",
        "圣卢西亚岛",
        "法属波利尼西亚",
        "特立尼达和多巴哥",
        "纳米比亚",
        "卢森堡",
        "帕劳",
        "皮特凯恩岛",
        "莱索托",
        "库拉索岛和博内尔岛",
        "文莱达鲁萨兰",
        "百幕大",
        "菲尼克斯群岛",
        "新加坡",
        "伯利兹",
        "布隆迪",
        "西撒哈拉",
        "托克劳(和斯温斯岛)",
        "马耳他",
        "圣基茨和尼维斯",
        "吉布提",
        "群岛(96:995,996)",
        "安圭拉",
        "塞舌尔",
        "直布罗陀",
        "英属印度洋领土",
        "安提瓜和巴布达",
        "利比里亚",
        "格林纳达",
        "巴林",
        "托克劳",
      ],
      // 亚太地区包含的国家
      yataidiqu: [
        "文莱",
        "柬埔寨",
        "印度尼西亚",
        "日本",
        "朝鲜",
        "韩国",
        "老挝",
        "马来西亚",
        "马绍尔群岛",
        "瑙鲁",
        "新西兰",
        "澳大利亚",
        "巴布亚新几内亚",
        "菲律宾",
        "萨摩亚",
        "新加坡",
        "所罗门群岛瓜达尔卡纳尔岛",
        "泰国",
        "汤加",
        "图瓦卢",
        "瓦努阿图",
        "越南",
        "中国",
        "澳门(中国)",
        "台湾台北(中国)",
        "中国香港",
        "蒙古",
      ],
      stationValue: "",
      countryValue: "",
      rectangleMeasure: null,
      resultLayer: null,
      TempLayer: null,
      TempPLayer: null,
      TextLayer: null,
      lmap: null, //地图
      drawType: 0,
      // 画圆
      circleMeasure: null,
      measureDis: null,
      tempCircle: null,
      circleI: null,
      circleR: 0,

      geojsonObject1: null,
      popup: null,
      graphicsLayer: null, //绘制矩形
      //startT: 0
    };
  },
  created() {},
  mounted() {
    this.startLoading();
    this.initMap();
  },
  methods: {
    // 分页事件
    paginationChange() {
      let paginateObj = this.$refs.pagination.paginateObj;
      this.queryParams = { ...this.queryParams, ...paginateObj };
    },
    changeRadiationType() {
      this.radiationType = !this.radiationType;
      if (!this.radiationType) {
        this.showPointStation(this.pointDataAll, 5);
      } else if (this.radiationType) {
        this.lmap.setZoom(this.lmap.getZoom() + 0.1);
      }
    },

    startLoading() {
      //使用Element loading-start 方法
      loading = Loading.service({
        lock: true,
        text: "加载中...",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    endLoading() {
      //使用Element loading-close 方法
      loading.close();
    },
    // 显示隐藏表格
    toggleTable() {
      if (this.toggleIcon == "el-icon-caret-bottom") {
        this.toggleIcon = "el-icon-caret-top";
      } else {
        this.toggleIcon = "el-icon-caret-bottom";
      }
    },
    // 菜单点击事件
    handleSelect(index, item) {
      this.showDetail = false;
      this.activeIndex = index;
      this.selementElement = item;
      this.radiationType = false;
      if (this.selementElement == "地面气象站") {
        this.readWorkbookFromRemoteFile(
          this.windowhost + "全球地面关联中国要素.json"
        );
      } else if (this.selementElement == "高空气象站") {
        this.readWorkbookFromRemoteFile(
          this.windowhost + "全球高空plus_含中国高空.json"
        );
      } else if (this.selementElement == "天气雷达") {
        this.readWorkbookFromRemoteFile(
          this.windowhost + "中国天气雷达plus.json"
        );
      } else if (this.selementElement == "测风雷达") {
        this.readWorkbookFromRemoteFile(
          this.windowhost + "中国测风雷达plus.json"
        );
      } else if (this.selementElement == "海洋自动站") {
        this.readWorkbookFromRemoteFile(
          this.windowhost + "海洋船舶站点信息.json"
        );
      } else if (this.selementElement == "海洋浮标") {
        this.readWorkbookFromRemoteFile(
          this.windowhost + "海洋浮标站点信息.json"
        );
      } else if (this.selementElement == "城镇预报") {
        this.readWorkbookFromRemoteFile(this.windowhost + "城镇预报.json");
      } else if (this.selementElement == "陆地水文") {
        this.readWorkbookFromRemoteFile(this.windowhost + "陆地水文.json");
      }
    },
    // 下载
    handleExport() {
      domtoimage.toBlob(document.getElementById("map")).then(function (blob) {
        window.saveAs(blob, "my-map.png");
      });
    },

    // 初始化地图
    initMap() {
      let info = document.getElementById("map");
      info.oncontextmenu = function (e) {
        return false;
      };
      const map = new PIE.Map({
        type: 1,
      });
      var url = window.location.href.substr(
        0,
        window.location.href.indexOf(window.location.hash)
      );
      let fontUrl =
        url.substr(0, url.lastIndexOf("/")) +
        "/map/fonts/{fontstack}/{range}.pbf";
      url = url.substr(0, url.lastIndexOf("/")) + "/map/allweather";

      let view = new PIE.MapView({
        map: map,
        container: "map",
        zoom: 3.5,
        sprite: url,
        glyphs: fontUrl,
        center: [109.30226, 37.9788],
      });
      let that = this;
      this.lmap = map;
      this.lmap.map.setMaxBounds([
        [-180, -85.1],
        [180, 85.1],
      ]); //地图范围
      this.lmap.map.setMaxZoom(17); //最大缩放层级
      map.on("load", function () {
        const vectorTileLayer1 = new PIE.GridTileLayer({
          url:
            "http://127.0.0.1:8082/service/v1/tile?map=arcgis1&x={x}&y={y}&z={z}",

          id: "baseMapLayer",
        });
        map.add(vectorTileLayer1);
        that.readWorkbookFromRemoteFile(
          that.windowhost + "全球地面关联中国要素.json"
        );
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
          let Obj = e.features[0].properties;
          puphtml = puphtml + "属性信息" + "</p><ul>";
          if (Obj.V01301) {
            puphtml += "<li><span>站号：</span>" + Obj.V01301 + "</li>";
          }
          if (Obj.STATIONNAME || Obj.STATIONNE) {
            if (Obj.STATIONNAME) {
              puphtml += "<li><span>站名：</span>" + Obj.STATIONNAME + "</li>";
            } else {
              puphtml += "<li><span>站名：</span>" + Obj.STATIONNE + "</li>";
            }
          }
          if (Obj.STATIONTYPE) {
            puphtml += "<li><span>站类型：</span>" + Obj.STATIONTYPE + "</li>";
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
          if (Obj.riverName) {
            puphtml += "<li><span>河流：</span>" + Obj.riverName + "</li>";
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
        console.log(e);
        if (e.features[0].properties) {
          let Obj = e.features[0].properties;
          that.detailObj = Obj;
          that.showDetail = true;
        }
      });
      //监听地图缩放

      map.on("zoomend", () => {
        if (that.radiationType) {
          let bounds = map.getBounds();
          /*  const distance =
             turf.distance(turf.point([bounds[0], 0]), turf.point([bounds[2], 0]), {
               units: "kilometers",
             }); //单位 K米 */
          //要用三个点   两个点会计算最近的距离
          var line = turf.lineString([
            [bounds[0], 0],
            [(bounds[0] + bounds[2]) / 2, 0],
            [bounds[2], 0],
          ]);
          var distance = turf.length(line, { units: "kilometers" });

          let Mapwidth = document.getElementById("map").offsetWidth;
          let unitWidth = Mapwidth / distance; // px/km
          if (
            this.selementElement == "天气雷达" ||
            this.selementElement == "测风雷达"
          ) {
            this.showPointStation(this.pointDataAll, unitWidth * 200);
          } else if (this.selementElement == "地面气象站") {
            this.showPointStation(this.pointDataAll, unitWidth * 50);
          }
        }
      });
    },
    // 框选
    setDrraw(drawType) {
      this.drawType = drawType;
      if (drawType == 1) {
        this.rectangleMeasureMethods();
        this.lmap.mapMoveDisable();
        this.lmap.on("mousedown", this.rectangleMeasure.mousedown);
        this.lmap.on("mousemove", this.rectangleMeasure.mousemove);
        this.lmap.on("mouseup", this.rectangleMeasure.mouseup);
      } else if (drawType == 2) {
        this.circleMeasureMethods();
        this.lmap.mapMoveDisable();
        this.lmap.on("mousedown", this.circleMeasure.mousedown);
        this.lmap.on("mouseup", this.circleMeasure.mouseup);
        this.lmap.on("mousemove", this.circleMeasure.mousemove);
      }
    },

    circleMeasureMethods() {
      const that = this;
      var r = 0;
      var i = null;
      var _Fills = null;

      if (!that.lmap.getLayer("tempCircle")) {
        that.tempCircle = new PIE.GraphicsLayer({
          id: "tempCircle",
          graphics: [],
        });
        that.lmap.add(that.tempCircle);
      }

      let circleMeasure = {
        mousedown: function (e) {
          if (that.tempCircle) {
            that.claertempCircle();
          }
          i = e.coordinate;
          that.tableData = that.tableData.slice(20, 240);
        },
        mousemove: function (e) {
          if (i) {
            let geojson = {};
            r =
              turf.distance(turf.point(i), turf.point(e.coordinate), {
                units: "kilometers",
              }) * 1000; //单位 K米

            geojson = turf.circle([i[0], i[1]], r, {
              step: 10,
              units: "meters",
            });
            var dataLine = {
              type: "FeatureCollection",
              features: [],
            };

            dataLine.features.push(geojson);

            if (_Fills) {
              that.tempCircle.graphics.splice(0, 1);
              //that.lmap.remove(_Fills);
            }
            _Fills = new PIE.MetoStyle.FillLayer({
              data: dataLine,
              id: "fill_test1",
              color: "#ff9900",
              opacity: 0.8,
            });
            that.tempCircle.add(_Fills);
          }
        },
        mouseup: function (e) {
          that.lmap.off("mousedown", that.circleMeasure.mousedown);
          that.lmap.off("mouseup", that.circleMeasure.mouseup);
          that.lmap.off("mousemove", that.circleMeasure.mousemove);

          i = null;
          r = 0;
          //that.lmap.dragging.enable();
          that.lmap.mapMoveEnable();
        },
        destory: function () {
          that.lmap.remove(that.tempCircle);
        },
      };
      that.circleMeasure = circleMeasure;
    },
    claertempCircle() {
      let that = this;
      if (that.lmap.getLayer("tempCircle")) {
        that.lmap.remove(that.lmap.getLayer("tempCircle"));
      }
    },

    // 框选事件
    rectangleMeasureMethods() {
      const that = this;
      if (!that.lmap.getLayer("graphicsLayer")) {
        that.graphicsLayer = new PIE.GraphicsLayer({
          id: "graphicsLayer",
          graphics: [],
        });
        that.lmap.add(that.graphicsLayer);
      }

      let rectangleMeasure = {
        startPoint: null,
        endPoint: null,
        rectangle: null,
        tips: null,
        layer: that.graphicsLayer,
        color: "#ff9900",
        markers: "",
        _Fills: null,
        addRectangle: function () {
          let bounds = [];
          if (rectangleMeasure.startPoint && rectangleMeasure.endPoint) {
            bounds.push(
              rectangleMeasure.startPoint,
              [rectangleMeasure.startPoint[0], rectangleMeasure.endPoint[1]],
              rectangleMeasure.endPoint,
              [rectangleMeasure.endPoint[0], rectangleMeasure.startPoint[1]],
              rectangleMeasure.startPoint
            );
          } else {
            return;
          }

          console.log(bounds);
          var dataLine = {
            type: "FeatureCollection",
            features: [],
          };
          var dataLineset = {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [bounds],
            },
          };
          dataLine.features.push(dataLineset);

          if (rectangleMeasure._Fills) {
            rectangleMeasure.layer.graphics.splice(0, 1);
            //that.lmap.remove(rectangleMeasure._Fills);
          }
          rectangleMeasure._Fills = new PIE.MetoStyle.FillLayer({
            data: dataLine,
            id: "fill_test",
            color: rectangleMeasure.color,
            opacity: 0.8,
          });
          rectangleMeasure.layer.add(rectangleMeasure._Fills);
        },
        mousedown: function (e) {
          //that.lmap.on("mousemove", rectangleMeasure.mousemove);
          rectangleMeasure.startPoint = e.coordinate;
          console.log("框选绘制结束");
          that.tableData = that.tableData.slice(20, 240);
        },
        mousemove: function (e) {
          rectangleMeasure.endPoint = e.coordinate;
          rectangleMeasure.addRectangle();

          //that.lmap.on("mouseup", rectangleMeasure.mouseup);
        },
        mouseup: function (e) {
          that.lmap.mapMoveEnable();

          that.lmap.off("mousedown", rectangleMeasure.mousedown);
          that.lmap.off("mousemove", rectangleMeasure.mousemove);
          rectangleMeasure.getRectMarker();
        },
        destory: function () {
          if (rectangleMeasure._Fills) {
            rectangleMeasure.layer.graphics.splice(0, 1);
            that.lmap.remove(rectangleMeasure._Fills);
          }
          that.lmap.remove(rectangleMeasure.layer);
          rectangleMeasure._Fills = null;
        },
        getRectMarker: function () {
          var x1 = rectangleMeasure.startPoint[0];
          var y1 = rectangleMeasure.startPoint[1];
          var x2 = rectangleMeasure.endPoint[0];
          var y2 = rectangleMeasure.endPoint[1];
          var originData = [];

          that.pointDataAll.features.forEach((station, n) => {
            if (
              station.V05001 >= y2 &&
              station.V05001 <= y1 &&
              station.V06001 >= x1 &&
              station.V06001 <= x2
            ) {
              originData.push(station);
            }
          });

          that.areaSelect = {
            type: "coord",
            value: [
              [x1, y1],
              [x2, y2],
            ],
          };

          // that.dealAreaSelectPointDate(originData);
        },
      };
      that.rectangleMeasure = rectangleMeasure;
    },

    // 测距事件

    // 测距

    distanceDrraw() {
      this.measureDistance();
      this.lmap.doubleClickZoomDisable();
      this.lmap.on("mousedown", this.measureDis.mousedown);
      this.lmap.on("dblclick", this.measureDis.dblclick);
    },

    measureDistance() {
      var that = this;
      var _Fills = null;
      var _pointL = null;
      var linePath = [];
      if (that.TempLayer == null) {
        that.TempLayer = new PIE.GraphicsLayer({
          id: "TempLayer",
          graphics: [],
        });
        that.lmap.add(that.TempLayer);
      }

      let measureDis = {
        mousedown: function (e) {
          linePath.push(e.coordinate);

          var dataLine = {
            type: "FeatureCollection",
            features: [],
          };

          var dataLineset = {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: linePath,
            },
          };
          dataLine.features.push(dataLineset);

          _Fills = new PIE.MetoStyle.LineLayer({
            data: dataLine,
            id: "lineString_test",
            color: "#ff9900",
            width: 2,
            opacity: 0.8,
          });
          that.TempLayer.add(_Fills);

          if (linePath.length > 1) {
            let pointData = [];
            linePath.forEach((item, index) => {
              let feature = {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [],
                },
                properties: { textColor: "555" },
              };
              feature.geometry.coordinates = [item[0], item[1]];
              feature.properties.textColor = "#555";

              if (index > 0) {
                let distance = turf.distance(
                  turf.point(item),
                  turf.point(linePath[index - 1]),
                  {
                    units: "kilometers",
                  }
                );
                feature.properties.value = distance.toFixed(1) + "KM";

                pointData.push(feature);
              }
            });

            let pointJson = {
              type: "FeatureCollection",
              features: pointData,
            };
            that.TextLayer = new PIE.MetoStyle.TextLayer({
              id: "disValue",
              data: pointJson,
              text: "value",
              offset: [1, 1],
              size: 13,
            });
            that.lmap.add(that.TextLayer);
          }
        },
        mousemove: function (e) {},
        dblclick: function (e) {
          that.lmap.off("mousedown", measureDis.mousedown);
          setTimeout(() => {
            that.lmap.doubleClickZoomEnable();
          }, 150);
        },
        destory: function () {
          linePath = [];
          let v = that.lmap.getLayer("disValue");
          if (v) {
            that.lmap.remove(v);
          }
          that.lmap.remove(that.TempLayer);

          that.lmap.off("mousedown", measureDis.mousedown);
          setTimeout(() => {
            that.lmap.doubleClickZoomEnable();
          }, 150);
        },
      };

      that.measureDis = measureDis;
    },

    removeDrraw() {
      if (this.rectangleMeasure) {
        this.rectangleMeasure.destory();
      }
      if (this.circleMeasure) {
        this.circleMeasure.destory();
      }

      if (this.measureDis) {
        this.measureDis.destory();
      }
      this.tableData = this.geojsonObject1.features;
    },
    goSatellite() {
      window.open("http://127.0.0.1:8180/web/satellite/index.html");
    },
    // 前端读取geojson
    async readWorkbookFromRemoteFile(url) {
      const that = this;
      let res = await axios.get(url);
      let outdata = res.data;
      that.geojsonObject1 = outdata;
      that.pointDataAll = outdata;
      that.tableData = that.geojsonObject1.features;
      that.showPointStation(outdata);
    },

    // 显示地图
    showPointStation(outdata, size) {
      let map = this.lmap;
      let that = this;
      let radius = size || 5;

      let geojsonObject = outdata;
      that.geojsonObject1 = geojsonObject;
      that.tableData = that.geojsonObject1.features;
      let clayer = map.getLayer("tuceng1");
      if (clayer) {
        map.remove(clayer);
      }

      var icon = new PIE.ClusterPointLayer({
        id: "tuceng1",
        data: that.geojsonObject1,
        color: "#238443",
        opacity: 0.7,
        size: radius,
      });
      map.add(icon);
      if (
        this.areaSelect.type == "stationSearch" &&
        that.geojsonObject1.features.length == 1
      ) {
        this.lmap.setCenter(
          that.geojsonObject1.features[0].geometry.coordinates
        );
      }
      this.endLoading();
    },
    // 区协点击
    regionClick(chose, clicklabel) {
      if (this.areaSelect.value == chose) {
        return;
      }
      this.areaclickActive = clicklabel;
      if (chose == 0) {
        this.areaSelect.type = "global";
        this.areaSelect.value = "";
        this.mapFlag = true;
      } else if (chose == 8) {
        this.areaSelect.type = "country";
        this.areaSelect.value = this.yataidiqu;
      } else {
        this.areaSelect.type = "region";
        this.areaSelect.value = chose;
      }
      this.dealAreaSelectPointDate();
    },
    // 战区选择
    areaClick(val, clicklabel) {
      this.clickActive = clicklabel;
      this.areaSelect.type = "province";
      this.areaSelect.value = val;
      this.dealAreaSelectPointDate();
    },
    // 国家选择
    choseCountry(val) {
      if (val) {
        this.areaSelect.type = "country";
        this.areaSelect.value = val;
      } else {
        this.areaSelect.type = "global";
        this.areaSelect.value = "";
        this.mapFlag = true;
      }
      this.dealAreaSelectPointDate();
    },
    // 表格单击
    handleCurrentChange(row) {
      this.areaSelect.type = "stationSearch";
      this.areaSelect.value = row.V01301;
      this.dealAreaSelectPointDate();
    },
    // 站点查询
    stationSearch(val) {
      if (this.stationValue) {
        this.areaSelect.type = "stationSearch";
        this.areaSelect.value = this.stationValue;
        this.dealAreaSelectPointDate();
      } else {
        this.$message.error("请输入站点");
      }
    },
    // 过滤
    dealAreaSelectPointDate() {
      this.showDetail = false;
      let value = this.areaSelect.value;
      let filtEchartsData = [];
      switch (this.areaSelect.type) {
        case "coord": //拖拽 矩形
          this.toggleIcon = "el-icon-caret-bottom";
          var bounds = L.latLngBounds(value);
          this.pointDataAll.forEach(function (item) {
            if (bounds.contains([item["V05001"], item["V06001"]])) {
              filtEchartsData.push(item);
            }
          });
          break;
        case "global": //全球
          filtEchartsData = this.pointDataAll.features;
          break;
        case "region": //区协
          this.pointDataAll.features.forEach(function (item) {
            if (item["properties"]["V_REGCODE"] == value) {
              filtEchartsData.push(item);
            }
          });
          break;
        case "country": //国家
          this.pointDataAll.features.forEach(function (item) {
            if (
              value.some(function (item1) {
                return item1 == item["properties"]["COUNTRY"];
              })
            ) {
              filtEchartsData.push(item);
            }
          });
          break;
        case "province": //省/战区
          this.pointDataAll.features.forEach(function (item) {
            if (
              value.some(function (item1) {
                return item1 == item["properties"]["PROVINCE"];
              })
            ) {
              filtEchartsData.push(item);
            }
          });
          break;
        case "stationSearch": //站点查询
          this.pointDataAll.features.forEach(function (item) {
            if (item["properties"]["V01301"] == value) {
              filtEchartsData.push(item);
            }
          });
          break;
      }
      let obj = {
        type: "FeatureCollection",
        features: filtEchartsData,
      };
      console.log(obj);
      this.showPointStation(obj);
    },
    //cesium  切换
    showCesium() {
      if (this.mapType == "三维") {
        let oldlayer = this.lmap.getLayer("tuceng1");
        if (oldlayer) {
          this.lmap.remove(oldlayer);
        }
        let oldlayer2 = this.lmap.getLayer("baseMapLayer");
        if (oldlayer2) {
          this.lmap.remove(oldlayer2);
        }
        const vectorTileLayer3 = new PIE.GridTileLayer({
          url:
            "http://127.0.0.1:8082/service/v1/tile?map=googleimage&x={x}&y={y}&z={z}",

          id: "baseMapLayer3",
        });
        this.lmap.add(vectorTileLayer3);
        this.lmap.changeMapType(3);

        let that = this;

        Cesium.GeoJsonDataSource.load(this.geojsonObject1).then(function (
          dataSource
        ) {
          that.lmap.map._cesiumViewer.dataSources.add(dataSource);

          var entities = dataSource.entities.values;

          for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            entity.billboard = undefined;
            entity.point = new Cesium.PointGraphics({
              color: Cesium.Color.GREEN,
              pixelSize: 5,
            });
          }
        });

        this.lmap.map._cesiumViewer.scene.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            109.30226,
            37.9788,
            7000000
          ), //定位坐标点，建议使用谷歌地球坐标位置无偏差
          duration: 1, //定位的时间间隔
        });
        this.lmap.pieCesium.mouseEvent("init", function (e) {
          //debugger;
          console.log(e);
        });
        this.lmap.pieCesium.mouseEvent("pick", function (position, pop) {
          that.showDetail = true;
          that.detailObj = pop;
          //debugger;
          console.log(pop);
        });
        /* var icon = new PIE.ClusterPointLayer({
          id: "tuceng1",
          data: this.geojsonObject1,
          color: "#238443",
          opacity: 0.7
        });
        this.lmap.add(icon); */
        /*  var pointCenter = this.lmap.getCenter();
        this.lmap.remove();
        var opt = {
          imageryProvider: GEOBIM.ImageryLayer.create("Location_Map")
          //先把本地地图配置到geobim.min.js 里面了 后面再配出来
        };
    
        var viewer = new GEOBIM.Viewer("map", opt);
        var webMap = new GEOBIM.WebMapCollection(viewer);
    
        viewer.scene.imageryLayers.addImageryProvider(
          new Cesium.UrlTemplateImageryProvider({
            url:
              "http://127.0.0.1:8082/service/v1/tile?map=googlevect&x={x}&y={y}&z={z}"
          })
        );
    
        Cesium.GeoJsonDataSource.load(this.geojsonObject1).then(function(
          dataSource
        ) {
          viewer._cesiumViewer.dataSources.add(dataSource);
    
          var entities = dataSource.entities.values;
    
          for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            entity.billboard = undefined;
            entity.point = new Cesium.PointGraphics({
              color: Cesium.Color.YELLOW,
              pixelSize: 5
            });
          }
        });
        viewer.scene.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            pointCenter.lng,
            pointCenter.lat,
            7000000
          ), //定位坐标点，建议使用谷歌地球坐标位置无偏差
          duration: 1 //定位的时间间隔
        });
    */
        this.mapType = "二维";
      } else if (this.mapType == "二维") {
        let oldlayer = this.lmap.getLayer("baseMapLayer3");
        if (oldlayer) {
          this.lmap.remove(oldlayer);
        }
        const vectorTileLayer = new PIE.GridTileLayer({
          url:
            "http://127.0.0.1:8082/service/v1/tile?map=arcgis1&x={x}&y={y}&z={z}",
          id: "baseMapLayer",
        });
        this.lmap.add(vectorTileLayer);
        this.lmap.changeMapType(1);
        this.mapType = "三维";
        var icon = new PIE.ClusterPointLayer({
          id: "tuceng1",
          data: this.geojsonObject1,
          color: "#238443",
          opacity: 0.7,
        });
        this.lmap.add(icon);
      }
    },

    downloadGeoJson() {
      var data = JSON.stringify(this.pointDataAll, undefined, 4);
      var blob = new Blob([data], {
        type: "text/json",
      });
      var e = document.createEvent("MouseEvents");
      var a = document.createElement("a");
      a.download = this.selementElement + ".json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },
  },
};
</script>
<style lang="scss">
.mapSectionHome {
  height: 100%;
  display: flex;
  .menuBox {
    width: 200px;
    height: 100%;
    border-right: 1px solid #e6e6e6;
    padding-bottom: 12px;
    .leftAside {
      width: 100%;
      margin-bottom: 12px;
    }
    .el-menu-item,
    .el-submenu__title {
      height: 36px;
      line-height: 36px;
    }
    .mapMenu {
      background: none;
      width: 100%;
    }
    h4 {
      margin: 12px 0 12px 18px;
      font-size: 13px;
      position: relative;
      padding-left: 10px;
    }
    h4::before {
      content: " ";
      width: 2px;
      height: 20px;
      background: #409eff;
      position: absolute;
      left: 0;
    }

    .el-checkbox {
      margin-bottom: 10px;
    }
    .el-button--mini {
      width: 80px;
      text-align: center;
      padding: 7px 0px;
      margin-bottom: 10px;
      margin-left: 10px;
    }
    .el-select {
      display: block;
      width: 90%;
      margin: auto;
    }
    .el-collapse-item__header {
      padding-left: 20px;
      height: 38px;
      line-height: 38px;
    }
    .el-collapse-item__wrap {
      p {
        cursor: pointer;
        border-bottom: 1px solid #ebeef5;
        margin: 0;
        padding: 6px 40px;
        &:first-child {
          border-top: 1px solid #ebeef5;
        }
        &.active {
          background: rgba(64, 158, 255, 0.5);
        }
      }
    }
    .el-collapse-item__header,
    .el-collapse-item__wrap {
      background: none;
    }
  }

  .mapBox {
    width: calc(100% - 200px);
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
      .iconBox {
        margin-bottom: 12px;
        text-align: right;
      }
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
  .input-file {
    display: none;
  }
  .allSattionNum {
    background: #fff;
    margin: 0;
    padding: 12px;
  }
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-tooltip__popper {
  max-width: 300px;
}
</style>
