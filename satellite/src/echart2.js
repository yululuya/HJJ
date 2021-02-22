var myCharts2 = echarts.init(document.getElementById('echart2'));
 option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '1%',
//      top"5%",
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['1951', '1956', '1961', '1966', '1971', '1976', '1981','1986','1991','1996','2001','2006','2011','2016'],
            axisTick: {
                alignWithLabel: true
            },
            axisLine:{
            	lineStyle:{
            		color:'#96EFFB'
            		
            	}
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLine:{
            	lineStyle:{
            		color:'#96EFFB'
            		
            	}
            }
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[100, 220, 390, 320, 280, 410, 500,500,340,310,420,380,190,110]
        }
    ]
};
        
                // 为echarts对象加载数据 
                myCharts2.setOption(option); 