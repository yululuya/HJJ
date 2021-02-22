/**
 * 在这里暴露了一个重大的问题，就是DOM调用DOM改变某些东西的做法很蠢，会导致在某些地方处理dom的时候发生不可控的结果，但是目前已经积重难返了；就不要想着更改了，不太现实
 */
var timeout1th = 300000; //场景时长
// var timeout1th = 3000;
var maxClickInterval = 900000;//最大点击间隔时间,超过后就自动播放 30分钟

var swiperList = [
    {
        timeLong: timeout1th,  //每个场景显示的时长
        name: ["ForeignSyncSatellite"], //要显示的场景
        isRotating: true, // 地球自转 

        scale: 1 //地球大小
    }, {
        timeLong: timeout1th,
        name: ["ForeignPolarSatellite"], //国外极地卫星
        isRotating: true,
       
        scale: 1
    }, {
        timeLong: timeout1th,
        name: ["NativeSyncSatellite"], //国能静止卫星
        isRotating: true,
       
        scale: 1
    }, {
        timeLong: timeout1th,
        name: ["NativePolarSatellite"], //国内极轨卫星卫星
        isRotating: true,
       
        scale: 1
    }, {
        timeLong: timeout1th,
        name: ["globalGaokong"], //全球高空探测
        isRotating: true,
        targetCooder: [
            
        ],
        scale: 1
    }, {
        timeLong: timeout1th,
        name: ["aircraft"], //全球飞机探测
        isRotating: true,
        targetCooder: [
            
        ],
        scale: 1
    }, {
        timeLong: timeout1th,
        name: ["NationalWelkinStation"], //中国高空站
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 2
    }, {
        timeLong: timeout1th,
        name: ["globalGroundStation"], //全球地面站
        isRotating: true,
        targetCooder: [
            
        ],
        scale: 1.2
    }, {
        timeLong: timeout1th,
        name: ["NationalGroundStation"], //中国国家地面站
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["AreaStation"], //中国区域地面站考核站
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["AreaStation_fkh"], //中国区域地面站全部站
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["WIND_GPS"], //风能观测塔
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["214"], //雷电
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["traffic"], //公路交通
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["NEARSURF_STATION"], //近地面通量塔
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["UPAR_GPS"], //地基GPS/MET水汽
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["globalShip"], //全球船舶
        isRotating: true,
        targetCooder: [
            
        ],
        scale: 1.2
    }, {
        timeLong: timeout1th,
        name: ["globalBuoy"], //全球浮标
        isRotating: true,
        targetCooder: [
            
        ],
        scale: 1.2
    }, {
        timeLong: timeout1th,
        name: ["global_sea"], //全球海洋
        isRotating: true,
        targetCooder: [
            
        ],
        scale: 1.2
    }, {
        timeLong: timeout1th,
        name: ["globalRadiationStation"], //全球辐射
        isRotating: true,
        targetCooder: [
            
        ],
        scale: 1.2
    }, {
        timeLong: timeout1th,
        name: ["NationalRadiationStation"], //国家辐射
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["RADIATION_STATION"], //基准辐射
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["AgrometeorologicalStation"], //农业气象
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["AGME_ASM"], //土壤水分
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["duopuleRadar"], //多普勒雷达
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["GAW_STATION"], //大气成分
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["ANION_BR_STATION"], //大气负离子
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["jiangshui"], //降水
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["turang"], //土壤墒情
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["hedaoshuiqing"], //河道水情
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.7
    }, {
        timeLong: timeout1th,
        name: ["一带一路"], //一带一路
        isRotating: true,
        targetCooder: [
           
        ],
        scale: 1.2
    }, {
        timeLong: timeout1th,
        name: ["CNHotEvent"], //国内年度十大
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.4
    }, {
        timeLong: timeout1th,
        name: ["FRHotEvent"], //国外年度十大
        isRotating: true,
        targetCooder: [
            
        ],
        scale: 1.4
    }, {
        timeLong: timeout1th,
        name: ["shuzhimoshi"], //数值模式
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.5
    }, {
        timeLong: timeout1th,
        name: ["cldas"], //路面同化
        isRotating: false,
        targetCooder: [
            
        ],
        scale: 1.5
    }, {
        timeLong: timeout1th,
        name: ["cmpas"], //多元降水
        isRotating: false,
        targetCooder: [
            34,108
        ],
        scale: 1.5
    }

];


timerClick = null;
timerInt = null;

var lastClickTime = Date.now().valueOf(); // 当前时间
var isShowAll = false;     //第一次进入旋转程序
var isBeginShow = true;     // 是否为恢复后的第一次转动
var currentShowIndex = 0; //当前播放到的顺序
var isStart = true;
var timerType = ['NationalWelkinStation','NationalWelkinStation',"NationalRadiationStation","CNHotEvent","FRHotEvent"]

/**
 * 检查多久没有点击过了
 */
function checkRotate() {
    clearInterval(timerInt);
    clearTimeout(timerClick);
    timerInt = setInterval(function () {
        var nowTime = Date.now().valueOf();
        if (nowTime - lastClickTime > maxClickInterval) {
            console.log('clearInterval')
            clearInterval(timerInt);
            if (isInHotEvent) {
                $('#closeHotEvent').click()
            };
            isInSwiper = true;
            startShowAll();
            // dealSelection();
        }
    }, 1000)
}

/**
 * 开始轮播前的准备
 */
function startShowAll() {
    clearInterval(timerInt);
    if (isInHotEvent) {
        $('#closeHotEvent').click()
    };
    isInSwiper = true;
    // $('.left>div[show!="true"]').attr('trigger', true).click();  //关闭左侧的tree
    if(!!$("#iframeBox iframe").attr("src")){
          $("#iframeBox").hide();
    }
    if(isInGlobalMonitor){
        $("#globalMonitor").click();
    }
    dealSelection();
}


/**
 * 处理轮播
 */
function dealSelection() {
    var len = swiperList.length;

    function loop() {
        $('.leixing.active1').attr("trigger", true).click();
        var timeoutTime = 0;
        clearTimeout(timerClick);
        var curr = currentShowIndex;
        var next = 0;
        currE = $("[type=" + swiperList[curr].name + "]");
        
        currList = swiperList[curr].name;


        currList.forEach(function (item, i) {
            $("[type=" + item + "]").attr("trigger", true).click();
        });

        showTime = swiperList[curr].timeLong;
    
        currentShowIndex++;

        if (currentShowIndex == len) {
            currentShowIndex = 0;
        }

        var intersection = timerType.filter(function(v){ return swiperList[curr].name.indexOf(v) > -1 }) // [2]
        if(intersection.length >0){
            $("div.pre").attr("trigger",true).click();
            setTimeout(function(){$('.goToEnd').attr('trigger',true).click()},361000);
        }

        timerClick = setTimeout(loop, showTime);


    }

    loop()

}


//一旦点击的话，preTime就会更新，那么现在和上一次的差值就会变小，下次启动的事件也就变长了 
setTimeout(function () {
    checkRotate(); //检查是否开始轮播
    $(document).click(function (e) {
        // 停止轮播并进入下一轮检测什么时候开始轮播
        if (!e.originalEvent) {  //jq.click()触发的没有这个东西
            console.log("代码点的，不用管")
           
        } else {
          
                lastClickTime = Date.now().valueOf();
                earthRotate = false;
                isBeginShow = true;
                isStart = true;
                clearInterval(timerInt);
                clearTimeout(timerClick);
                isInSwiper=false;
                checkRotate();
            
        
        }
    })


}, 30000);


