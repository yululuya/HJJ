 var myCharts1 = echarts.init(document.getElementById('echart'));
 option = {
    title: {
        text: '资料数据量',
        textStyle:{
        	color:'#C0F7FF',
        	fontSize:15
        },
        padding:[25,10,20,15]
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            backgroundColor: '#1b1b1b',
            label: {
                backgroundColor: 'rgba(128, 128, 128, 0.5)'
                
            }
        }
    },
    grid: {
        left: '12%',
     
        bottom: '10%',
//      containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            splitLine:{
            	interval:0,
            	lineStyle:{
            		type:'dotted'
            	}
            }
             ,
            data : ['1951','1961','1971','1981','1991','2001','2011','2016'],
            axisLine:{
            	lineStyle:{
            		color:'#96EFFB'
            		
            	}
            },
            
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
            name:'邮件营销',
            tooltip:{
            	backgroundColor:'yellow'
            },
            type:'line',
            stack: '总量',
            areaStyle: {normal: {color:'rgba(32,52,57,0.5)'}},
            data:[301, 320, 315, 350, 400, 420, 460,480],
            itemStyle : {  //折线以及点的颜色
                                normal : {  
                                    color:'#96EFFB',
                                    borderColor:'#96EFFB',
                                    borderType:'solid',
                                    lineStyle:{  
                                        color:'#96EFFB',
                                        
                                    }  
                                }  
                            } 
        }
    ]
};
   myCharts1.setOption(option);



